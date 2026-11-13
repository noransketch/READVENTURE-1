import * as C from "./content.js";
import * as W1 from "./worlds/w1.js";
import * as W2 from "./worlds/w2.js";
import {
  loadProgress, saveProgress, clearProgress, DEFAULT_PROGRESS, freshWorld,
  esc, shuffle, pick, speak, stopSpeech, canSpeak, boldMarks, plainStory, tokens,
} from "./util.js";

// ==================================================================
// READVENTURE · Read. Learn. Level Up.
// ==================================================================
const app = document.getElementById("app");
const S = {
  p: loadProgress(),
  screen: "home",   // home | worlds | world | stage | done | result | bag
  stage: null,
  run: null,
  sheet: null,      // null | "settings" | "rules" | "world:N"
  tip: null,
  resetArm: false,
  doneInfo: null,
};
// ---------- Worlds: content per world ----------
const WORLD_DATA = {
  1: W1,
  2: W2,
  3: {
    WORDS: C.WORDS, STORY: { ...C.STORY, img: "vocab/get_up.webp" }, PAIRS: C.PAIRS, PRACTICE: C.PRACTICE, ROUNDS: C.ROUNDS, CHECK: C.CHECK,
    META: {
      bg: "world/bg_world3_myday.webp",
      groups: ["s", "have", "do"],
      wordsDone: { en: "You know 8 daily-routine words now. They are in your Word Bag!", id: "Sekarang kamu tahu 8 kata kegiatan sehari-hari. Semuanya ada di kantong katamu!" },
      verbPrompt: { en: "Now tap the <b class='c-verb'>verb</b>: what does the subject <b>do</b>?", id: "Sekarang ketuk <b>kata kerja</b>: apa yang dilakukan?" },
      practiceGuide: { en: "First find the subject. Then choose the verb.", id: "Cari subjeknya dulu. Lalu pilih kata kerjanya." },
    },
  },
};
S.world = WORLD_DATA[S.p.world] ? S.p.world : 3;
const D = () => WORLD_DATA[S.world];
const PW = () => S.p.worlds[S.world] || (S.p.worlds[S.world] = freshWorld());
const stageImg = (st) => (D().META.stageImg && D().META.stageImg[st.id]) || st.img;
const worldDoneCount = (n) => { const w = S.p.worlds[n]; return w ? C.STAGES.filter((s) => s.id !== "result" && w.done[s.id]).length : 0; };

let lastKey = "";
let lastItemKey = "";

const A = (p) => `assets/${p}`;
const save = () => saveProgress(S.p);
const stageById = (id) => C.STAGES.find((s) => s.id === id);

// ---------- Inline icons (sharp at any size, no extra downloads) ----------
const ICONS = {
  next: '<path d="M9 5l7 7-7 7" />',
  back: '<path d="M15 5l-7 7 7 7" />',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5" />',
  star: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9z" fill="currentColor" stroke-width="1.5"/>',
  sound: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke-width="1.5"/><path d="M15.5 9a4 4 0 010 6M18 6.5a7.5 7.5 0 010 11"/>',
  bulb: '<path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.6 10.8c.7.5 1.1 1.3 1.1 2.2h5c0-.9.4-1.7 1.1-2.2A6 6 0 0012 3z"/>',
  lock: '<rect x="5" y="11" width="14" height="9" rx="2" fill="currentColor" stroke-width="1.5"/><path d="M8 11V8a4 4 0 018 0v3"/>',
  bag: '<path d="M6 8h12l-1 12H7z" fill="currentColor" stroke-width="1.5"/><path d="M9 8V6a3 3 0 016 0v2"/>',
  gear: '<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.3"/><circle cx="9" cy="17" r="2.3"/>',
  map: '<path d="M9 4L3 6.5v13.5L9 17.5l6 2.5 6-2.5V4l-6 2.5z"/><path d="M9 4v13.5M15 6.5V20"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  book: '<path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1V19c-3-1-6-1-9 1-3-2-6-2-9-1z"/><path d="M12 6.5V20"/>',
  play: '<path d="M8 5l11 7-11 7z" fill="currentColor"/>',
  stop: '<rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>',
};
const ic = (n, cls = "") => `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n]}</svg>`;

// Bilingual text. en / id must already be HTML-safe.
function T(en, id, cls = "") {
  const showId = S.p.showID && id;
  return `<span class="t ${cls}"><span class="en">${en}</span>${showId ? `<span class="id">${id}</span>` : ""}</span>`;
}
const Te = (o, cls) => T(esc(o.en), esc(o.id), cls);

function isOpen(id) {
  if (S.p.unlockAll) return true;
  if (id === "result") return !!PW().done.check;
  const i = C.STAGES.findIndex((s) => s.id === id);
  return i === 0 || !!PW().done[C.STAGES[i - 1].id];
}
function currentStageId() {
  const s = C.STAGES.find((st) => st.id !== "result" && !PW().done[st.id]);
  return s ? s.id : "result";
}
function addToBag(word, meaning, img) {
  if (!S.p.bag[word]) { S.p.bag[word] = { m: meaning, img: img || null }; save(); }
}

// ------------------------------------------------------------------
// Rendering
// ------------------------------------------------------------------
function render() {
  const r = S.run || {};
  const key = [S.screen, S.stage, r.phase, r.round].join(":");
  const itemKey = key + ":" + (r.i ?? "");
  const html = view();
  const enter = key !== lastKey;
  const fresh = itemKey !== lastItemKey;
  app.innerHTML =
    `<div class="screen ${enter ? "enter" : ""} ${fresh ? "fresh" : ""}">${html}</div>` +
    (S.tip ? viewTip() : "") +
    (S.sheet ? viewSheet() : "");
  if (enter) window.scrollTo(0, 0);
  if (enter && S.screen === "worlds") {
    const el = app.querySelector(".walker");
    if (el) requestAnimationFrame(() => { const r = el.getBoundingClientRect(); window.scrollTo(0, Math.max(0, r.top + window.scrollY - innerHeight * 0.42)); });
  }
  lastKey = key;
  lastItemKey = itemKey;
}

function view() {
  switch (S.screen) {
    case "home": return viewHome();
    case "worlds": return viewWorlds();
    case "world": return viewWorld();
    case "bag": return viewBag();
    case "done": return viewDone();
    case "result": return viewResult();
    case "stage": return viewStage();
  }
  return viewHome();
}

// Character guide with speech bubble.
const POSES = {
  sari: { idle: "idle", think: "thinking", ok: "thumbsup", no: "encourage", happy: "cheer" },
  rudi: { idle: "idle", think: "thinking", ok: "thumbsup", no: "encourage", happy: "cheer" },
  aisyah: { idle: "idle", think: "idle", ok: "cheer", no: "idle", happy: "cheer" },
  dimas: { idle: "idle", think: "pointing", ok: "cheer", no: "idle", happy: "cheer" },
};
function guide(mood, en, id, who) {
  who = who || (S.stage && stageById(S.stage) ? stageById(S.stage).guide : "sari");
  const pose = POSES[who][mood] || "idle";
  return `<div class="guide mood-${mood}">
    <img class="guide-img" src="${A(`characters/${who}_${pose}.webp`)}" alt="">
    <div class="bubble"><span class="who-name">${who[0].toUpperCase() + who.slice(1)}</span>${T(en, id)}</div>
  </div>`;
}

function stageHead(st, done, total) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return `<header class="stage-head">
    <div class="stage-head-bg" style="background-image:url('${A(D().META.bg)}')"></div>
    <button class="round-btn" data-act="toWorlds" aria-label="Back to the map">${ic("back")}</button>
    <div class="stage-title">
      <div class="stage-num">World ${S.world} · Lesson ${st.n}</div>
      <div class="stage-name">${esc(st.name.en)}</div>
    </div>
    <button class="pill ${S.p.showID ? "on" : ""}" data-act="toggleID" aria-pressed="${S.p.showID}">ID</button>
  </header>
  ${total ? `<div class="pbar" role="progressbar" aria-valuenow="${done}" aria-valuemax="${total}"><i style="width:${pct}%"></i></div>` : ""}`;
}

function speakerBtn(text, label = "Listen") {
  if (!canSpeak() || !S.p.sound) return "";
  return `<button class="spk" data-act="say" data-text="${esc(text)}" aria-label="${label}">${ic("sound")}</button>`;
}
const nextIc = () => ic("next", "ic-btn");

// ------------------------------------------------------------------
// Home (title screen)
// ------------------------------------------------------------------
function viewHome() {
  const started = Object.values(S.p.worlds).some((w) => Object.keys(w.done).length > 0);
  return `<div class="home">
    <div class="home-bg" style="background-image:url('${A("world/title_background.webp")}')"></div>
    <div class="home-top">
      <img class="logo-img pop" src="${A("brand/logo.webp")}" alt="READVENTURE · Read. Learn. Level Up.">
      <div class="badge">${T("An English reading adventure for Grade 6", "Petualangan membaca bahasa Inggris untuk kelas 6")}</div>
    </div>
    <div class="home-bottom">
      <div class="cast">
        <img class="bob" src="${A("characters/rudi_idle.webp")}" alt="Rudi">
        <img class="bob d2" src="${A("characters/aisyah_idle.webp")}" alt="Aisyah">
        <img class="bob d3" src="${A("characters/dimas_idle.webp")}" alt="Dimas">
        <img class="bob d4" src="${A("characters/sari_idle.webp")}" alt="Sari">
      </div>
      <button class="btn btn-big btn-sun" data-act="start">${started ? "Continue" : "Start the adventure"} ${nextIc()}</button>
      <p class="privacy">${T("No names. No accounts. Your progress stays on this device.", "Tanpa nama. Tanpa akun. Progresmu hanya tersimpan di perangkat ini.")}</p>
    </div>
  </div>`;
}

// ------------------------------------------------------------------
// World map (6 worlds)
// ------------------------------------------------------------------
function topBar(title, sub, backAct, backLabel) {
  return `<header class="top">
    <button class="round-btn light" data-act="${backAct}" aria-label="${backLabel}">${ic("back")}</button>
    <div class="top-title"><div class="top-k">${sub}</div><div class="top-n">${title}</div></div>
    <button class="round-btn light" data-act="openSheet" data-sheet="settings" aria-label="Settings">${ic("gear")}</button>
  </header>`;
}

function viewWorlds() {
  const cur = currentStageId();
  const lessonIds = C.STAGES.filter((s) => s.id !== "result").map((s) => s.id);
  const stonesOf = (n) => C.MAP_STONES.filter((s) => s.w === n);
  const mine = stonesOf(S.world);
  const lessonMode = (n) => n === S.world && stonesOf(n).length >= lessonIds.length;
  const progStone = (n) => Math.round((worldDoneCount(n) / lessonIds.length) * stonesOf(n).length);
  let walkerAt = lessonMode(S.world) ? mine[Math.max(0, lessonIds.indexOf(cur))] || mine[mine.length - 1]
    : mine[Math.min(mine.length - 1, progStone(S.world))];
  const firstOf = {};
  C.MAP_STONES.forEach((s, i) => { if (firstOf[s.w] == null) firstOf[s.w] = i; });

  const count = {};
  const stones = C.MAP_STONES.map((s) => {
    const style = `left:${s.x}%;top:${s.y}%;--s:${s.s}`;
    const k = (count[s.w] = (count[s.w] ?? -1) + 1);
    const wd = C.WORLDS[s.w - 1];
    if (!wd.open || !WORLD_DATA[s.w]) return `<button class="stone future" style="${style}" data-act="worldInfo" data-n="${s.w}" aria-label="World ${s.w} (coming soon)">${ic("lock")}</button>`;
    if (lessonMode(s.w)) {
      const id = lessonIds[k];
      if (!id) return "";
      const st = stageById(id);
      const done = !!PW().done[id];
      const open = isOpen(id);
      const state = done ? "done" : id === cur ? "current" : open ? "open" : "locked";
      return `<button class="stone lesson ${state}" style="${style}" data-act="${open ? "openStage" : "locked"}" data-id="${id}" aria-label="Lesson ${st.n}: ${esc(st.name.en)}">
        <span>${done ? ic("check") : st.n}</span></button>`;
    }
    const filled = k < progStone(s.w);
    return `<button class="stone lesson ${filled ? "done" : "open"}" style="${style}" data-act="openWorld" data-n="${s.w}" aria-label="World ${s.w}: ${esc(wd.name)}">
      <span>${filled ? ic("check") : ""}</span></button>`;
  }).join("");

  const flags = C.WORLDS.map((w) => {
    const s = C.MAP_STONES[firstOf[w.n]];
    const side = s.x < 50 ? "l" : "r";
    return `<button class="wflag ${w.open ? "open" : "soon"} side-${side}" style="left:${s.x}%;top:${s.y}%" data-act="${w.open ? "openWorld" : "worldInfo"}" data-n="${w.n}" aria-label="World ${w.n}: ${esc(w.name)}${w.open ? "" : " (coming soon)"}">
      <b>${w.n}</b>${w.open ? `<span>${esc(w.short)}</span>` : ""}</button>`;
  }).join("");

  const curSt = stageById(cur);
  const allDone = cur === "result";
  const bagN = Object.keys(S.p.bag).length;
  return `<div class="mapscreen">
    <div class="mcanvas">
      <img class="mimg" src="${A("world/world_map.webp")}" alt="Adventure map: from the school at the bottom to the ancient ruins at the top">
      <div class="mshine"></div>
      ${stones}
      ${flags}
      <img class="walker" src="${A(allDone ? "characters/sari_cheer.webp" : "characters/sari_idle.webp")}" alt="" style="left:${walkerAt.x}%;top:${walkerAt.y}%">
    </div>
    <header class="hud hud-top">
      <button class="round-btn" data-act="toHome" aria-label="Home">${ic("back")}</button>
      <div class="hud-title"><span>READVENTURE</span><b>Adventure Map</b></div>
      <button class="round-btn" data-act="openSheet" data-sheet="settings" aria-label="Settings">${ic("gear")}</button>
    </header>
    <div class="hud hud-side">
      <button class="round-btn" data-act="openBag" aria-label="My Word Bag">${ic("bag")}${bagN ? `<i class="count">${bagN}</i>` : ""}</button>
      <button class="round-btn" data-act="openSheet" data-sheet="rules" aria-label="Pattern card">${ic("bulb")}</button>
      <button class="round-btn" data-act="openSheet" data-sheet="worlds" aria-label="All worlds">${ic("map")}</button>
    </div>
    <section class="hud hud-card">
      <img class="hc-img" src="${A(stageImg(curSt))}" alt="">
      <div class="hc-body">
        <div class="hc-k">World ${S.world} · ${esc(C.WORLDS[S.world - 1].short)} · ${allDone ? "All lessons done" : `Lesson ${curSt.n} of 6`}</div>
        <div class="hc-n">${allDone ? T("Great job, explorer!", "Hebat, penjelajah!") : Te(curSt.name)}</div>
        <div class="hc-row">
          <button class="btn small ${allDone ? "btn-sun" : ""}" data-act="openStage" data-id="${cur}">${allDone ? "My results" : PW().done[lessonIds[0]] ? "Continue" : "Start"} ${ic("next", "ic-btn")}</button>
          <button class="btn small ghost" data-act="openWorld" data-n="${S.world}">${T("Lessons", "Pelajaran")}</button>
        </div>
      </div>
    </section>
  </div>`;
}

// ------------------------------------------------------------------
// World 3 lesson path
// ------------------------------------------------------------------
function viewWorld() {
  const cur = currentStageId();
  const w = C.WORLDS[S.world - 1];
  const nodes = C.STAGES.map((st, k) => {
    const done = st.id === "result" ? !!PW().last : !!PW().done[st.id];
    const open = isOpen(st.id);
    const state = done ? "done" : open ? "open" : "locked";
    const isCur = st.id === cur;
    return `<div class="lnode ${state} ${isCur ? "current" : ""} ${k % 2 ? "right" : "left"}">
      <button class="lbtn" data-act="${open ? "openStage" : "locked"}" data-id="${st.id}" aria-label="Lesson ${st.n}: ${esc(st.name.en)}${open ? "" : " (locked)"}">
        <img src="${A(stageImg(st))}" alt="">
        <span class="lbadge">${done ? ic("check") : open ? st.n : ic("lock")}</span>
      </button>
      <div class="ltext">
        <div class="lk">${isCur ? "▶ Next" : `Lesson ${st.n}`}</div>
        <div class="ln">${esc(st.name.en)}</div>
        ${S.p.showID ? `<div class="lid">${esc(st.name.id)}</div>` : ""}
        ${isCur ? `<button class="btn small" data-act="openStage" data-id="${st.id}">${st.id === "result" ? "Open" : "Start"} ${ic("next", "ic-btn")}</button>` : ""}
      </div>
    </div>`;
  }).join("");
  const doneCount = C.STAGES.filter((s) => s.id !== "result" && PW().done[s.id]).length;
  return `<div class="world">
    <header class="world-head">
      <div class="world-head-bg" style="background-image:url('${A(D().META.bg)}')"></div>
      <div class="world-head-row">
        <button class="round-btn" data-act="toWorlds" aria-label="Adventure map">${ic("map")}</button>
        <span class="ribbon">World ${w.n}</span>
        <button class="round-btn" data-act="openSheet" data-sheet="settings" aria-label="Settings">${ic("gear")}</button>
      </div>
      <h1 class="world-title">${esc(w.name)}</h1>
      <p class="world-sub">${T(esc(w.topic.en), esc(w.topic.id))}</p>
      <div class="world-prog"><i style="width:${(doneCount / 6) * 100}%"></i></div>
      <div class="world-prog-t">${doneCount}/6 ${T("lessons done", "pelajaran selesai")}${PW().best != null ? ` · ${T(`Best check ${PW().best}/10`, "Skor cek terbaik")}` : ""}</div>
    </header>
    <div class="lpath">${pathSvg(C.STAGES.length)}${nodes}</div>
    <div class="map-tools">
      <button class="chip" data-act="openBag">${ic("bag")} ${T(`My Word Bag (${Object.keys(S.p.bag).length})`, "Kantong kataku")}</button>
      <button class="chip" data-act="openSheet" data-sheet="rules">${ic("bulb")} ${T("Pattern card", "Kartu pola")}</button>
      ${PW().done.rounds || S.p.unlockAll ? `<button class="chip" data-act="openStage" data-id="rounds">${ic("star")} ${T("Play the rounds again", "Main ronde lagi")}</button>` : ""}
    </div>
  </div>`;
}

// Dotted trail behind the lesson nodes (x in %, y in px; nodes are 128px tall).
function pathSvg(n) {
  const H = 128, X = [19, 81];
  let d = `M ${X[0]} ${H / 2}`;
  for (let k = 1; k < n; k++) {
    const x0 = X[(k - 1) % 2], x1 = X[k % 2], y0 = H / 2 + (k - 1) * H, y1 = H / 2 + k * H;
    d += ` C ${x0} ${y0 + H * 0.55}, ${x1} ${y1 - H * 0.55}, ${x1} ${y1}`;
  }
  return `<svg class="ltrail" viewBox="0 0 100 ${n * H}" preserveAspectRatio="none" style="height:${n * H}px" aria-hidden="true">
    <path d="${d}" fill="none" stroke="#e8c98a" stroke-width="12" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
    <path d="${d}" fill="none" stroke="#fff6df" stroke-width="4" stroke-dasharray="2 14" stroke-linecap="round" vector-effect="non-scaling-stroke"/>
  </svg>`;
}

// ------------------------------------------------------------------
// My Word Bag
// ------------------------------------------------------------------
function viewBag() {
  const entries = Object.entries(S.p.bag);
  const list = entries.length ? entries.map(([w, v]) => `
    <li class="bag-item">
      ${v.img ? `<img src="${A(v.img)}" alt="">` : `<span class="bag-dot">${esc(w[0].toUpperCase())}</span>`}
      <span class="bag-t"><b>${esc(w)}</b><small>${esc(v.m)}</small></span>
      ${speakerBtn(w)}
    </li>`).join("")
    : `<li class="bag-empty">${T("Your bag is empty. Words you read and tap will appear here.", "Kantongmu masih kosong. Kata yang kamu baca dan ketuk akan muncul di sini.")}</li>`;
  return `<div class="bag">
    ${topBar("My Word Bag", `${entries.length} words`, "bagBack", "Back")}
    <main class="body">
      <div class="bag-hero"><img class="bob" src="${A("brand/glowing_book.webp")}" alt="">
        <p>${T("Every word you meet while reading goes into your bag. Tap the speaker to hear it again.", "Setiap kata yang kamu temui saat membaca masuk ke kantong ini. Ketuk speaker untuk mendengarnya lagi.")}</p></div>
      <ul class="bag-list">${list}</ul>
    </main>
  </div>`;
}

// ------------------------------------------------------------------
// Sheets: settings, pattern card, world info
// ------------------------------------------------------------------
function viewSheet() {
  if (S.sheet === "rules") {
    return `<div class="sheet-back" data-act="closeSheet"></div>
    <div class="sheet" role="dialog" aria-label="Pattern card">
      <div class="sheet-h">${T("Pattern card", "Kartu pola")}<button class="x" data-act="closeSheet" aria-label="Close">${ic("close")}</button></div>
      ${patternCard()}
    </div>`;
  }
  if (S.sheet === "worlds") {
    const cards = C.WORLDS.map((w) => `
      <button class="wcard ${w.open ? "open" : "soon"}" data-act="${w.open ? "openWorld" : "worldInfo"}" data-n="${w.n}">
        <span class="wc-n">${w.n}</span>
        <span class="wc-body"><b>${esc(w.name)}</b><small>${esc(S.p.showID ? w.id : w.topic.en)}</small></span>
        <span class="wc-state">${w.open ? "Open" : "Soon"}</span>
      </button>`).join("");
    return `<div class="sheet-back" data-act="closeSheet"></div>
    <div class="sheet" role="dialog" aria-label="All worlds">
      <div class="sheet-h">${T("Six worlds, one reading path", "Enam dunia, satu jalur membaca")}<button class="x" data-act="closeSheet" aria-label="Close">${ic("close")}</button></div>
      <p class="fine">${T("Texts grow step by step: from one word to short stories about the past. New levels open as they are built.", "Teks bertambah sedikit demi sedikit: dari satu kata sampai cerita pendek tentang masa lalu. Level baru dibuka bertahap.")}</p>
      <div class="wcards">${cards}</div>
    </div>`;
  }
  if (S.sheet && S.sheet.startsWith("world:")) {
    const w = C.WORLDS[+S.sheet.split(":")[1] - 1];
    return `<div class="sheet-back" data-act="closeSheet"></div>
    <div class="sheet" role="dialog" aria-label="World ${w.n}">
      <div class="sheet-h"><span>World ${w.n} · ${esc(w.name)}</span><button class="x" data-act="closeSheet" aria-label="Close">${ic("close")}</button></div>
      <div class="soon-box">
        <img src="${A("brand/compass.webp")}" alt="">
        <div>
          <p><b>${T(esc(w.topic.en), esc(w.topic.id))}</b></p>
          <p>${T(`Reading: ${esc(w.reading.en)}`, esc(w.reading.id))}</p>
          <p class="soon-tag">${T("Coming soon", "Segera hadir")}</p>
        </div>
      </div>
      <button class="btn" data-act="openWorld" data-n="3">${T("Go to World 3: My Day", "Ke Dunia 3")} ${nextIc()}</button>
    </div>`;
  }
  const row = (act, on, en, id) =>
    `<button class="set-row" data-act="${act}" aria-pressed="${on}"><span>${T(en, id)}</span><i class="sw ${on ? "on" : ""}"></i></button>`;
  return `<div class="sheet-back" data-act="closeSheet"></div>
  <div class="sheet" role="dialog" aria-label="Settings">
    <div class="sheet-h">${T("Settings", "Pengaturan")}<button class="x" data-act="closeSheet" aria-label="Close">${ic("close")}</button></div>
    ${row("toggleID", S.p.showID, "Indonesian help lines", "Baris bantuan bahasa Indonesia")}
    ${canSpeak() ? row("toggleSound", S.p.sound, "Read aloud", "Bacakan dengan suara") : ""}
    ${row("toggleUnlock", S.p.unlockAll, "Open all lessons (teacher demo)", "Buka semua pelajaran (demo guru)")}
    <button class="set-row danger" data-act="reset"><span>${S.resetArm ? T("Tap again to delete all progress", "Ketuk lagi untuk menghapus semua progres") : T("Reset progress", "Hapus progres")}</span></button>
    <p class="fine">${T("Nothing is sent anywhere. Progress is saved only in this browser.", "Tidak ada data yang dikirim. Progres hanya disimpan di browser ini.")}</p>
  </div>`;
}

function patternCard() { return S.world === 1 ? patternCardBe() : S.world === 2 ? patternCardThere() : patternCardS(); }
function patternCardThere() {
  return `<div class="pattern">
    <div class="pcol">
      <div class="phead">one thing<small>${S.p.showID ? "satu benda" : "a board, a library"}</small></div>
      <div class="pv">There i<b>s</b></div>
      <div class="pv">There isn't</div>
      <div class="pv">I<b>s</b> there …?</div>
    </div>
    <div class="pcol alt">
      <div class="phead">many things<small>${S.p.showID ? "banyak benda" : "two desks, four windows"}</small></div>
      <div class="pv">There a<b>re</b></div>
      <div class="pv">There aren't</div>
      <div class="pv">A<b>re</b> there …?</div>
    </div>
  </div>
  <div class="pattern-note">${T("<i>There <b>is</b> a big board. · There <b>are</b> twenty desks.</i><br>Look at the thing after is / are: one or many?", "Lihat benda setelah is / are: satu atau banyak?")}</div>`;
}
function patternCardBe() {
  return `<div class="pattern three">
    <div class="pcol">
      <div class="phead">I<small>${S.p.showID ? "aku" : "me"}</small></div>
      <div class="pv">a<b>m</b></div>
      <div class="pv">am not</div>
    </div>
    <div class="pcol alt">
      <div class="phead">he · she · it<small>${S.p.showID ? "satu orang / benda" : "one person or thing"}</small></div>
      <div class="pv">i<b>s</b></div>
      <div class="pv">isn't</div>
    </div>
    <div class="pcol">
      <div class="phead">you · we · they<small>${S.p.showID ? "kamu, kami, mereka" : "two or more"}</small></div>
      <div class="pv">a<b>re</b></div>
      <div class="pv">aren't</div>
    </div>
  </div>
  <div class="pattern-note">${T("<i>I <b>am</b> Sari. · Rudi <b>is</b> twelve. · Rudi and I <b>are</b> friends.</i><br>Questions: <b>Is</b> he …? · <b>Are</b> you …?", "Pertanyaan: am / is / are pindah ke depan.")}</div>`;
}
function patternCardS() {
  return `<div class="pattern">
    <div class="pcol">
      <div class="phead">I · you · we · they<small>${S.p.showID ? "dan 2 orang atau lebih" : "and two or more"}</small></div>
      <div class="pv">get · read · play</div>
      <div class="pv">go · watch · brush</div>
      <div class="pv">have</div>
      <div class="pv">do · don't</div>
    </div>
    <div class="pcol alt">
      <div class="phead">he · she · it<small>${S.p.showID ? "Rudi, Ibu, kucing (satu)" : "Rudi, Mother, the cat"}</small></div>
      <div class="pv">get<b>s</b> · read<b>s</b> · play<b>s</b></div>
      <div class="pv">go<b>es</b> · watch<b>es</b> · brush<b>es</b></div>
      <div class="pv">ha<b>s</b></div>
      <div class="pv">doe<b>s</b> · doe<b>s</b>n't</div>
    </div>
  </div>
  <div class="pattern-note">${T("<b>+es</b> after o, ch, sh, s, x: go<b>es</b>, watch<b>es</b>, brush<b>es</b>.<br>After <b>do / does / don't / doesn't</b> → no <span class='nw'>-s/-es</span>: <i>Does Rudi <b>like</b> milk?</i>", "+es setelah huruf o, ch, sh, s, x. Setelah do / does / don't / doesn't → kata kerja tanpa -s/-es.")}</div>`;
}

function viewTip() {
  return `<div class="tip" role="status">
    <div class="tip-w">${esc(S.tip.w)} ${speakerBtn(S.tip.w)}</div>
    <div class="tip-m">${esc(S.tip.m)}</div>
    <div class="tip-bag">${ic("bag")} ${T("Added to My Word Bag", "Masuk ke kantong kata")}</div>
    <button class="x" data-act="closeTip" aria-label="Close">${ic("close")}</button>
  </div>`;
}

// ------------------------------------------------------------------
// Stage router
// ------------------------------------------------------------------
function viewStage() {
  switch (S.stage) {
    case "words": return viewWords();
    case "read": return viewRead();
    case "pairs": return viewPairs();
    case "practice": return viewPractice();
    case "rounds": return viewRounds();
    case "check": return viewCheck();
  }
  return "";
}

function openStage(id) {
  stopSpeech();
  S.tip = null; S.sheet = null;
  if (id === "result") { S.screen = "result"; S.stage = null; S.run = null; render(); return; }
  const prevRound = S.stage === "rounds" && S.run ? S.run.round : null;
  S.screen = "stage";
  S.stage = id;
  S.run = initRun(id, prevRound);
  render();
}

function initRun(id, prevRound) {
  switch (id) {
    case "words": return { phase: "learn", i: 0 };
    case "read": return { phase: "read", playing: false };
    case "pairs": return { phase: "play", i: 0, step: "subj", bad: null };
    case "practice": return newQuiz(D().PRACTICE, { phase: "play" });
    case "rounds": return { phase: "intro", round: prevRound || 1 };
    case "check": return { phase: "intro" };
  }
  return {};
}

function newQuiz(items, extra = {}) {
  return {
    items: items.map((it) => ({ ...it, o: shuffle(it.o) })),
    i: 0, state: null, wrong: [], missed: false, hint: false,
    step: "find", msgWrongTap: false, badTap: null, first: [], ...extra,
  };
}

function finishStage(id, en, id2) {
  PW().done[id] = true; save();
  S.screen = "done";
  S.doneInfo = { id, en, id2 };
  stopSpeech();
  render();
  burst(16);
}

function viewDone() {
  const st = stageById(S.doneInfo.id);
  const nextId = currentStageId();
  const next = stageById(nextId);
  return `<div class="done-screen">
    <div class="done-bg" style="background-image:url('${A(D().META.bg)}')"></div>
    <div class="done-card">
      <img class="done-book" src="${A("brand/glowing_book.webp")}" alt="">
      <div class="done-cast">
        <img class="pop" src="${A("characters/sari_cheer.webp")}" alt="">
        <img class="pop d2" src="${A("characters/rudi_cheer.webp")}" alt="">
      </div>
      <div class="done-k">Lesson ${st.n} complete!</div>
      <h2>${Te(st.name)}</h2>
      <p>${T(esc(S.doneInfo.en), esc(S.doneInfo.id2))}</p>
      <div class="row">
        <button class="btn ghost" data-act="toWorlds">${ic("map", "ic-btn")} ${T("Map", "Peta")}</button>
        ${nextId !== "result"
          ? `<button class="btn" data-act="openStage" data-id="${nextId}">${esc(next.name.en)} ${nextIc()}</button>`
          : `<button class="btn btn-sun" data-act="openStage" data-id="result">${T("My results", "Hasilku")} ${nextIc()}</button>`}
      </div>
    </div>
  </div>`;
}

// ------------------------------------------------------------------
// Lesson 1: Words
// ------------------------------------------------------------------
function viewWords() {
  const st = stageById("words");
  const r = S.run;
  if (r.phase === "learn") {
    const w = D().WORDS[r.i];
    return `${stageHead(st, r.i + 1, D().WORDS.length * 2)}
    <main class="body">
      ${guide("idle", "Look, listen, and say the words.", "Lihat, dengarkan, dan ucapkan.")}
      <div class="word-card item">
        <div class="wc-count">${r.i + 1} / ${D().WORDS.length}</div>
        <img class="wc-img" src="${A(w.img)}" alt="${esc(w.phrase)}">
        <div class="wc-phrase">${esc(w.phrase)} ${speakerBtn(w.phrase)}</div>
        ${S.p.showID ? `<div class="wc-mean">${esc(w.meaning)}</div>` : `<button class="link" data-act="toggleID">Show meaning</button>`}
        <div class="wc-ex">${boldMarks(w.ex)} ${speakerBtn(w.ex.replace(/\*\*/g, ""), "Listen to the sentence")}</div>
      </div>
      <div class="nav">
        <button class="btn ghost" data-act="wordsPrev" ${r.i === 0 ? "disabled" : ""}>${ic("back", "ic-btn")} Back</button>
        <button class="btn" data-act="wordsNext">${r.i === D().WORDS.length - 1 ? "Play Picture Match" : "Next"} ${nextIc()}</button>
      </div>
    </main>`;
  }
  const w = D().WORDS.find((x) => x.key === r.order[r.i]);
  const opts = r.opts.map((k) => {
    const ww = D().WORDS.find((x) => x.key === k);
    const cls = r.state === "right" && k === w.key ? "right" : r.wrong.includes(k) ? "wrong" : "";
    return `<button class="opt ${cls}" data-act="wordPick" data-k="${k}" ${r.state === "right" || r.wrong.includes(k) ? "disabled" : ""}>${esc(ww.phrase)}</button>`;
  }).join("");
  const p = pick(C.PRAISE);
  const g = r.state === "right" ? guide("ok", esc(p.en), esc(p.id))
    : r.state === "wrong" ? guide("no", "Not that one. Look at the picture again.", "Bukan itu. Lihat gambarnya lagi.")
    : guide("think", "Which words match the picture?", "Kata mana yang cocok dengan gambar?");
  return `${stageHead(st, D().WORDS.length + r.i + (r.state === "right" ? 1 : 0), D().WORDS.length * 2)}
  <main class="body">
    ${g}
    <div class="match item">
      <div class="wc-count">Picture Match · ${r.i + 1} / ${r.order.length}</div>
      <img class="match-img ${r.state === "right" ? "pop" : r.state === "wrong" ? "shake" : ""}" src="${A(w.img)}" alt="What is this?">
    </div>
    <div class="opts">${opts}</div>
    ${r.state === "right" ? `<div class="nav"><button class="btn" data-act="wordNext">${r.i === r.order.length - 1 ? "Finish" : "Next"} ${nextIc()}</button></div>` : ""}
  </main>`;
}
function startWordGame() {
  const order = shuffle(D().WORDS.map((w) => w.key));
  S.run = { phase: "game", order, i: 0, state: null, wrong: [], opts: makeWordOpts(order[0]) };
}
function makeWordOpts(key) {
  const others = shuffle(D().WORDS.map((w) => w.key).filter((k) => k !== key)).slice(0, 2);
  return shuffle([key, ...others]);
}

// ------------------------------------------------------------------
// Lesson 2: Read
// ------------------------------------------------------------------
function storyHTML(sent, i) {
  const html = esc(sent).replace(/\[([^|\]]+)\|([^\]]+)\]/g, (m, w, mean) =>
    `<button class="gloss" data-act="gloss" data-w="${w}" data-m="${mean}">${w}</button>`);
  return `<span class="sent" data-i="${i}">${html}</span>`;
}
function viewRead() {
  const st = stageById("read");
  const r = S.run;
  if (r.phase === "read") {
    return `${stageHead(st, 0, 0)}
    <main class="body">
      ${guide("idle", "Read the story. Tap a <u>dotted word</u> for help.", "Baca ceritanya. Ketuk kata bergaris titik untuk bantuan.")}
      <article class="story book item">
        <div class="story-top">
          <h3>${ic("book")} ${esc(D().STORY.title)}</h3>
          ${canSpeak() && S.p.sound ? `<button class="btn small ${r.playing ? "ghost" : ""}" data-act="readAloud">${ic(r.playing ? "stop" : "play", "ic-btn")} ${r.playing ? "Stop" : "Listen"}</button>` : ""}
        </div>
        <img class="story-img" src="${A(D().STORY.img)}" alt="">
        <p>${D().STORY.sentences.map(storyHTML).join(" ")}</p>
      </article>
      <div class="nav"><button class="btn" data-act="readDone">${T("I have read it", "Aku sudah membaca")} ${nextIc()}</button></div>
    </main>`;
  }
  const q = D().STORY.questions[r.i];
  const who = (k, name) => {
    const cls = r.state === "right" && k === q.a ? "right" : r.wrong.includes(k) ? "wrong" : "";
    return `<button class="who ${cls}" data-act="whoPick" data-k="${k}" ${r.state === "right" || r.wrong.includes(k) ? "disabled" : ""}>
      <img src="${A(`characters/${k}_idle.webp`)}" alt=""><span>${name}</span></button>`;
  };
  const p = pick(C.PRAISE);
  const g = r.state === "right" ? guide("ok", esc(p.en), esc(p.id))
    : r.state === "wrong" ? guide("no", "Look at the story again.", "Lihat ceritanya lagi.")
    : guide("think", "Who is it? Use the story.", "Siapa? Gunakan ceritanya.");
  return `${stageHead(st, r.i + (r.state === "right" ? 1 : 0), D().STORY.questions.length)}
  <main class="body">
    ${g}
    <div class="q item"><div class="q-t">${esc(q.q)} ${speakerBtn(q.q)}</div>${S.p.showID ? `<div class="q-id">${esc(q.qid)}</div>` : ""}</div>
    <div class="whos">${(D().STORY.who || ["sari", "rudi"]).map((k) => who(k, k[0].toUpperCase() + k.slice(1))).join("")}</div>
    <details class="peek"><summary>${T("Look at the story", "Lihat cerita")}</summary><p>${D().STORY.sentences.map((s) => esc(plainStory(s))).join(" ")}</p></details>
    ${r.state === "right" ? `<div class="nav"><button class="btn" data-act="whoNext">${r.i === D().STORY.questions.length - 1 ? "Finish" : "Next"} ${nextIc()}</button></div>` : ""}
  </main>`;
}

// ------------------------------------------------------------------
// Lesson 3: Find the pairs
// ------------------------------------------------------------------
function viewPairs() {
  const st = stageById("pairs");
  const r = S.run;
  if (r.phase === "card") {
    return `${stageHead(st, D().PAIRS.length, D().PAIRS.length)}
    <main class="body">
      ${guide("happy", "You found the pattern! Read the card.", "Kamu menemukan polanya! Baca kartunya.")}
      <div class="card item">${patternCard()}</div>
      <div class="nav"><button class="btn" data-act="pairsFinish">${T("Got it!", "Paham!")}</button></div>
    </main>`;
  }
  const p = D().PAIRS[r.i];
  const tk = tokens(p.t);
  const doneStep = r.step === "done";
  const toks = tk.map((w, k) => {
    let cls = "";
    if ((r.step === "verb" || doneStep) && p.subj.includes(k)) cls = "is-subj";
    if (doneStep && p.verb.includes(k)) cls = "is-verb";
    if (r.bad === k) cls += " bad shake";
    return `<button class="tok ${cls}" data-act="pairTap" data-k="${k}" ${doneStep ? "disabled" : ""}>${esc(w)}</button>`;
  }).join(" ");
  const M = D().META;
  const mt = (k, en, id) => M[k] || { en, id };
  const bad = r.step === "subj" ? mt("badSubj", "That is not the subject. <b>Who</b> does it?", "Itu bukan subjek. <b>Siapa</b> yang melakukan?")
    : mt("badVerb", "That is not the verb. What does the subject <b>do</b>?", "Itu bukan kata kerja. Apa yang <b>dilakukan</b>?");
  const sp = mt("subjPrompt", "Tap the <b class='c-subj'>subject</b>: <b>who</b>?", "Ketuk <b>subjek</b>: <b>siapa</b>?");
  const g = doneStep ? guide("ok", `<b>${esc(p.note.en)}</b>`, esc(p.note.id))
    : r.bad != null ? guide("no", bad.en, bad.id)
    : r.step === "subj" ? guide("think", sp.en, sp.id)
    : guide("think", M.verbPrompt.en, M.verbPrompt.id);
  const join = (idx) => esc(tk.filter((_, k) => idx.includes(k)).join(" ").replace(/[.,!?]+$/, ""));
  return `${stageHead(st, r.i + (doneStep ? 1 : 0), D().PAIRS.length)}
  <main class="body">
    ${g}
    <div class="sentence-card item">
      <div class="wc-count">${r.i + 1} / ${D().PAIRS.length}</div>
      <div class="toks">${toks}</div>
      ${doneStep ? `<div class="pair-chip pop"><span class="c-subj">${join(p.subj)}</span> → <span class="c-verb">${join(p.verb)}</span> ${speakerBtn(p.t)}</div>` : ""}
    </div>
    <div class="legend"><span class="c-subj">■ ${esc((D().META.legend || ["subject"])[0])}</span><span class="c-verb">■ ${esc((D().META.legend || [, "verb"])[1])}</span></div>
    ${doneStep ? `<div class="nav"><button class="btn" data-act="pairsNext">Next ${nextIc()}</button></div>` : ""}
  </main>`;
}

// ------------------------------------------------------------------
// Shared: choose / fix items
// ------------------------------------------------------------------
function sentenceChoose(it, { filled = null, cls = "" } = {}) {
  const [a, b] = it.t.split("___");
  const blank = filled != null ? `<span class="blank filled ${cls}">${esc(filled)}</span>` : `<span class="blank">&nbsp;?&nbsp;</span>`;
  return `${esc(a)}${blank}${esc(b ?? "")}`;
}
function fixedSentence(it) { return tokens(it.t).map((w, k) => (k === it.w ? it.a : w)).join(" "); }
function solvedText(it) { return it.kind === "fix" || it.w != null ? fixedSentence(it) : it.t.replace("___", it.a); }

function optionsHTML(r, it, act = "pick") {
  return `<div class="opts">${it.o.map((v) => {
    const isRight = r.state === "right" && v === it.a;
    const isWrong = r.wrong.includes(v);
    return `<button class="opt ${isRight ? "right" : ""} ${isWrong ? "wrong" : ""}" data-act="${act}" data-v="${esc(v)}" ${r.state === "right" || isWrong ? "disabled" : ""}>${esc(v)}</button>`;
  }).join("")}</div>`;
}
// Item hint: names the subject, then the short rule ("Rudi = he → verb + s/es").
function subjHint(it) {
  const s = C.SHORT[it.r];
  if (!s) return { en: "", id: "" };
  const w = it.who ? `<b>${esc(it.who)}</b> → ` : "";
  return { en: w + esc(s.en), id: w + esc(s.id) };
}
function feedbackGuide(r, it) {
  const rule = C.RULES[it.r];
  if (r.state === "right") { const p = pick(C.PRAISE); return guide("ok", `<b>${esc(p.en)}</b> ${esc(rule.en)}`, `${esc(p.id)} ${esc(rule.id)}`); }
  if (r.state === "wrong") { const p = pick(C.TRY_AGAIN), h = subjHint(it); return guide("no", `<b>${esc(p.en)}</b><br>${h.en}`, `${esc(p.id)}`); }
  return null;
}

// ------------------------------------------------------------------
// Lesson 4: Practice (with hints)
// ------------------------------------------------------------------
function viewPractice() {
  const st = stageById("practice");
  const r = S.run;
  const it = r.items[r.i];
  const group = C.GROUP_OF[it.r];
  const g = feedbackGuide(r, it) || guide("think", D().META.practiceGuide.en, D().META.practiceGuide.id);
  const h = subjHint(it);
  return `${stageHead(st, r.i + (r.state === "right" ? 1 : 0), r.items.length)}
  <main class="body">
    ${g}
    <div class="sentence-card item">
      <div class="wc-count">${r.i + 1} / ${r.items.length}</div>
      <div class="sent-big">${sentenceChoose(it, r.state === "right" ? { filled: it.a, cls: "ok" } : {})}</div>
      ${r.state === "right" ? speakerBtn(solvedText(it)) : ""}
    </div>
    ${optionsHTML(r, it)}
    ${r.state !== "right" ? `<button class="hint-btn ${r.hint ? "open" : ""}" data-act="hint"><span class="hint-ic">${ic("bulb")}</span> ${r.hint ? `<span>${h.en}</span>` : T("Need a hint?", "Butuh petunjuk?")}</button>` : ""}
    ${r.state === "right" ? `<div class="nav"><button class="btn" data-act="quizNext">${r.i === r.items.length - 1 ? "Finish" : "Next"} ${nextIc()}</button></div>` : ""}
  </main>`;
}

// ------------------------------------------------------------------
// Lesson 5: Game rounds
// ------------------------------------------------------------------
const roundDef = (n) => D().ROUNDS[n - 1];
function startRound(n) {
  const def = roundDef(n);
  const v = def.variants[(PW().plays[n] || 0) % def.variants.length];
  S.run = newQuiz(v.items.map((x) => ({ ...x, kind: def.kind })), { phase: "play", round: n, title: v.title, results: [] });
}
function viewRounds() {
  const st = stageById("rounds");
  const r = S.run;
  const def = roundDef(r.round);
  const dots = `<div class="round-dots">${D().ROUNDS.map((d) => `<span class="${d.n < r.round ? "past" : d.n === r.round ? "cur" : ""}">${d.n}</span>`).join("")}</div>`;
  if (r.phase === "intro") {
    return `${stageHead(st, 0, 0)}
    <main class="body center">
      ${dots}
      <div class="round-intro item">
        <div class="ri-k">Round ${r.round} of 3</div>
        <h2>${Te(def.name)}</h2>
        <p>${Te(def.task)}</p>
        <img class="ri-img bob" src="${A(r.round === 3 ? "characters/rudi_thinking.webp" : r.round === 2 ? "characters/dimas_pointing.webp" : "characters/rudi_idle.webp")}" alt="">
        <p class="fine">${T("6 sentences · a short story · try again as many times as you need", "6 kalimat · cerita pendek · boleh mencoba lagi")}</p>
        <button class="btn btn-big" data-act="roundStart">${T("Start round", "Mulai ronde")}</button>
      </div>
    </main>`;
  }
  if (r.phase === "summary") {
    const score = r.results.filter((x) => x.ok).length;
    const misses = {};
    r.results.filter((x) => !x.ok).forEach((x) => { const g = C.GROUP_OF[x.r]; misses[g] = (misses[g] || 0) + 1; });
    const top = Object.entries(misses).sort((a, b) => b[1] - a[1])[0];
    const stars = Array.from({ length: 6 }, (_, k) => `<span class="${k < score ? "on" : ""}">${ic("star")}</span>`).join("");
    return `${stageHead(st, r.round, 3)}
    <main class="body center">
      ${dots}
      <div class="round-sum item">
        <img class="sum-char pop" src="${A(score >= 5 ? "characters/rudi_cheer.webp" : "characters/rudi_thumbsup.webp")}" alt="">
        <div class="ri-k">Round ${r.round} · ${esc(r.title)}</div>
        <div class="stars">${stars}</div>
        <div class="big-score">${score}<small>/6</small></div>
        <p>${T("correct on the first try", "benar pada percobaan pertama")}</p>
        ${top ? `<div class="focus">${T(`Practise more: <b>${esc(C.GROUPS[top[0]].en)}</b>`, `Latih lagi: ${esc(C.GROUPS[top[0]].id)}`)}</div>` : `<div class="focus good">${T("Perfect round!", "Ronde sempurna!")}</div>`}
        <div class="row">
          <button class="btn ghost" data-act="roundAgain">${T("Play again", "Main lagi")}</button>
          <button class="btn" data-act="roundNext">${r.round < 3 ? T(`Round ${r.round + 1}`, "Ronde berikutnya") : T("Finish", "Selesai")} ${nextIc()}</button>
        </div>
      </div>
    </main>`;
  }
  const it = r.items[r.i];
  const story = r.items.map((x, j) => {
    if (j < r.i) return `<span class="ss solved">${esc(solvedText(x))}</span>`;
    if (j > r.i) return laterLine(x);
    return `<span class="ss now">${currentLine(r, it)}</span>`;
  }).join(" ");
  let g = feedbackGuide(r, it);
  if (!g && it.kind === "fix") {
    g = r.step === "find"
      ? (r.msgWrongTap ? guide("no", "That word is OK. Find the <b>verb</b> that is wrong.", "Kata itu benar. Cari <b>kata kerja</b> yang salah.")
        : guide("think", "One verb is wrong. <b>Tap it.</b>", "Ada satu kata kerja yang salah. <b>Ketuk.</b>"))
      : guide("think", "Good! Now choose the right form.", "Bagus! Sekarang pilih bentuk yang benar.");
  }
  if (!g) g = guide("think", esc(def.task.en), esc(def.task.id));
  const showOpts = it.kind !== "fix" || r.step === "fix" || r.state === "right";
  return `${stageHead(st, r.i + (r.state === "right" ? 1 : 0), r.items.length)}
  <main class="body">
    ${g}
    <article class="story mini item">
      <div class="story-top"><h3>${esc(r.title)}</h3><span class="tag-r">Round ${r.round}</span></div>
      <p>${story}</p>
    </article>
    ${showOpts ? optionsHTML(r, it) : `<p class="fine center">${T("Tap a word in the yellow sentence.", "Ketuk satu kata di kalimat kuning.")}</p>`}
    ${r.state === "right" ? `<div class="nav"><button class="btn" data-act="quizNext">${r.i === r.items.length - 1 ? "See my round" : "Next"} ${nextIc()}</button></div>` : ""}
  </main>`;
}
function currentLine(r, it) {
  if (it.kind !== "fix") return sentenceChoose(it, r.state === "right" ? { filled: it.a, cls: "ok" } : {});
  return tokens(it.t).map((w, k) => {
    if (r.state === "right" && k === it.w) return `<span class="blank filled ok">${esc(it.a)}</span>`;
    if (r.step === "fix" && k === it.w) return `<span class="tok-in found">${esc(w)}</span>`;
    const bad = r.badTap === k ? "bad shake" : "";
    return r.step === "find" && r.state !== "right"
      ? `<button class="tok-in ${bad}" data-act="fixTap" data-k="${k}">${esc(w)}</button>`
      : `<span>${esc(w)}</span>`;
  }).join(" ");
}

// ------------------------------------------------------------------
// Lesson 6: Check (no hints, no feedback until the end)
// ------------------------------------------------------------------
function viewCheck() {
  const st = stageById("check");
  const r = S.run;
  if (r.phase === "intro") {
    return `${stageHead(st, 0, 0)}
    <main class="body center">
      <div class="round-intro item">
        <div class="ri-k">${esc(D().CHECK.title)}</div>
        <h2>${T("My check", "Cek mandiri")}</h2>
        <ul class="rules-list">
          <li>${T("10 sentences from a new story.", "10 kalimat dari cerita baru.")}</li>
          <li>${T("No hints this time. Take your time.", "Kali ini tanpa petunjuk. Santai saja.")}</li>
          <li>${T("You will see your answers at the end.", "Jawabanmu akan terlihat di akhir.")}</li>
        </ul>
        <img class="ri-img bob" src="${A("characters/sari_thumbsup.webp")}" alt="">
        <button class="btn btn-big btn-sun" data-act="checkStart">${T("I'm ready", "Aku siap")}</button>
      </div>
    </main>`;
  }
  const it = r.items[r.i];
  const ans = r.answers[r.i] || {};
  const story = r.items.map((x, j) => {
    if (j < r.i) return `<span class="ss neutral">${answeredLine(x, r.answers[j])}</span>`;
    if (j > r.i) return laterLine(x);
    return `<span class="ss now">${checkLine(it, ans)}</span>`;
  }).join(" ");
  const needTap = it.kind === "fix" && ans.tapped == null;
  const opts = needTap ? `<p class="fine center">${T("One verb is wrong. Tap it in the yellow sentence.", "Ada satu kata kerja yang salah. Ketuk di kalimat kuning.")}</p>`
    : `<div class="opts">${it.o.map((v) => `<button class="opt ${ans.picked === v ? "sel" : ""}" data-act="checkPick" data-v="${esc(v)}">${esc(v)}</button>`).join("")}</div>`;
  return `${stageHead(st, r.i, r.items.length)}
  <main class="body">
    <div class="check-k">${T(`Sentence ${r.i + 1} of ${r.items.length}`, "Kalimat")}</div>
    <article class="story mini item">
      <div class="story-top"><h3>${esc(D().CHECK.title)}</h3><span class="tag-r">No hints</span></div>
      <p>${story}</p>
    </article>
    ${opts}
    <div class="nav"><button class="btn" data-act="checkNext" ${ans.picked == null ? "disabled" : ""}>${r.i === r.items.length - 1 ? T("Finish", "Selesai") : T("Next", "Lanjut")} ${nextIc()}</button></div>
  </main>`;
}
// Sentences still to come are shown as soft placeholders, so learners never read a wrong sentence before it is their task.
function laterLine(x) {
  return `<span class="ss later"><i class="ghost" style="width:${Math.min(96, 2 + x.t.length * 0.62)}%"></i></span>`;
}
// In the check, an answered sentence shows the learner's own choice in a chip (feedback comes at the end).
function answeredLine(it, ans = {}) {
  const chip = `<span class="your">${esc(ans.picked ?? "?")}</span>`;
  if (it.kind !== "fix") { const [a, b] = it.t.split("___"); return `${esc(a)}${chip}${esc(b ?? "")}`; }
  return tokens(it.t).map((w, k) => (k === ans.tapped ? chip : esc(w))).join(" ");
}
function checkLine(it, ans) {
  if (it.kind !== "fix") return sentenceChoose(it, ans.picked != null ? { filled: ans.picked, cls: "sel" } : {});
  return tokens(it.t).map((w, k) => {
    const isTapped = ans.tapped === k;
    const shown = isTapped && ans.picked != null ? ans.picked : w;
    return `<button class="tok-in ${isTapped ? "found" : ""}" data-act="checkTap" data-k="${k}">${esc(shown)}</button>`;
  }).join(" ");
}
function learnerText(it, ans = {}) {
  if (it.kind !== "fix") return it.t.replace("___", ans.picked ?? "___");
  return tokens(it.t).map((w, k) => (k === ans.tapped && ans.picked != null ? ans.picked : w)).join(" ");
}
function scoreCheck(r) {
  const groups = Object.fromEntries(D().META.groups.map((g) => [g, [0, 0]]));
  const missed = [];
  let score = 0;
  r.items.forEach((it, j) => {
    const ans = r.answers[j] || {};
    const ok = it.kind === "fix" ? ans.tapped === it.w && ans.picked === it.a : ans.picked === it.a;
    const g = C.GROUP_OF[it.r];
    groups[g][1]++;
    if (ok) { score++; groups[g][0]++; } else missed.push({ yours: learnerText(it, ans), correct: solvedText(it), r: it.r });
  });
  return { score, groups, missed, at: Date.now() };
}

// ------------------------------------------------------------------
// Result
// ------------------------------------------------------------------
function viewResult() {
  const L = PW().last;
  if (!L) return `<div class="body center"><p>${T("Finish the check first.", "Selesaikan cek dulu.")}</p><button class="btn" data-act="toWorld">World ${S.world}</button></div>`;
  const label = L.score >= 8 ? { k: "ready", en: "Ready!", id: "Siap!", m: "You can match verbs with their subjects. Great job!", mid: "Kamu bisa mencocokkan kata kerja dengan subjeknya. Hebat!", img: "sari_cheer" }
    : L.score >= 6 ? { k: "almost", en: "Almost there!", id: "Hampir!", m: "Play the rounds once more, then try the check again.", mid: "Main ronde sekali lagi, lalu coba cek lagi.", img: "sari_thumbsup" }
    : { k: "notyet", en: "Not yet", id: "Belum", m: "That's OK! Practise the rounds and use the pattern card.", mid: "Tidak apa-apa! Latihan ronde dan pakai kartu pola.", img: "sari_encourage" };
  const circ = 2 * Math.PI * 52;
  const bars = Object.entries(L.groups).map(([g, [ok, tot]]) => `
    <div class="gbar"><span class="gname">${esc(C.GROUPS[g].en)}</span>
      <span class="gtrack"><i style="width:${tot ? (ok / tot) * 100 : 0}%"></i></span>
      <span class="gnum">${ok}/${tot}</span></div>`).join("");
  const review = L.missed.length ? L.missed.map((m) => `
    <li><div class="yours">✗ ${esc(m.yours)}</div><div class="right-s">✓ ${esc(m.correct)}</div><div class="why">${T(esc(C.RULES[m.r].en), esc(C.RULES[m.r].id))}</div></li>`).join("")
    : `<li class="none">${T("No mistakes. Amazing!", "Tidak ada kesalahan. Luar biasa!")}</li>`;
  return `<div class="result">
    ${topBar(esc(D().CHECK.title), "My results", "toWorlds", "Map")}
    <main class="body">
      <div class="res-card ${label.k} item">
        <div class="res-ring">
          <svg class="ring" viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="52" class="ring-bg"/>
            <circle cx="60" cy="60" r="52" class="ring-fg" style="stroke-dasharray:${circ};stroke-dashoffset:${circ * (1 - L.score / 10)}"/>
          </svg>
          <div class="res-score">${L.score}<small>/10</small></div>
        </div>
        <img class="res-char pop" src="${A(`characters/${label.img}.webp`)}" alt="">
        <div class="res-label">${T(label.en, label.id)}</div>
        <p>${T(label.m, label.mid)}</p>
        <div class="fine">${T(`Best score: ${PW().best}/10 · Target: 8/10`, "Skor terbaik · Target 8/10")}</div>
      </div>
      <div class="card"><h4>${T("By pattern", "Per pola")}</h4>${bars}</div>
      <div class="card"><h4>${T("Look again", "Lihat lagi")}</h4><ul class="review">${review}</ul></div>
      <div class="row wrap">
        <button class="btn ghost" data-act="openStage" data-id="rounds">${T("Practise rounds", "Latihan ronde")}</button>
        <button class="btn ghost" data-act="openStage" data-id="check">${T("Try the check again", "Coba cek lagi")}</button>
        <button class="btn" data-act="toWorlds">${T("Back to the map", "Kembali ke peta")}</button>
      </div>
      <p class="fine center">${T("Show this screen to your teacher if they ask for your score.", "Tunjukkan layar ini ke gurumu jika diminta.")}</p>
    </main>
  </div>`;
}

// ------------------------------------------------------------------
// Effects
// ------------------------------------------------------------------
function burst(n = 8) {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const wrap = document.createElement("div");
  wrap.className = "burst";
  for (let k = 0; k < n; k++) {
    const el = document.createElement("span");
    el.innerHTML = ic("star");
    const ang = (Math.PI * 2 * k) / n + Math.random() * 0.4;
    const dist = 90 + Math.random() * 100;
    el.style.setProperty("--dx", `${Math.cos(ang) * dist}px`);
    el.style.setProperty("--dy", `${Math.sin(ang) * dist - 40}px`);
    el.style.setProperty("--rot", `${Math.random() * 360}deg`);
    el.style.color = ["#FFC247", "#E24B4B", "#6CC071", "#5BB7D9"][k % 4];
    el.style.animationDelay = `${Math.random() * 80}ms`;
    wrap.appendChild(el);
  }
  document.body.appendChild(wrap);
  setTimeout(() => wrap.remove(), 1300);
}
const sayIfOn = (text) => { if (S.p.sound) speak(text); };

// ------------------------------------------------------------------
// Actions
// ------------------------------------------------------------------
let bagReturn = "worlds";
const act = {
  start() { S.screen = "worlds"; render(); },
  toHome() { stopSpeech(); S.screen = "home"; render(); },
  toWorlds() { stopSpeech(); S.screen = "worlds"; S.stage = null; S.run = null; render(); },
  toWorld() { stopSpeech(); S.screen = "worlds"; S.stage = null; S.run = null; S.tip = null; render(); },
  openWorld(d) { S.sheet = null; if (d && d.n && WORLD_DATA[+d.n]) { S.world = +d.n; S.p.world = S.world; save(); } S.screen = "world"; render(); },
  worldInfo(d) { S.sheet = `world:${d.n}`; render(); },
  openBag() { bagReturn = S.screen; S.screen = "bag"; render(); },
  bagBack() { S.screen = bagReturn === "bag" ? "worlds" : bagReturn; render(); },
  openStage(d) { openStage(d.id); },
  locked() { toast("Finish the lesson before it first.", "Selesaikan pelajaran sebelumnya dulu."); },
  openSheet(d) { S.sheet = d.sheet; S.resetArm = false; render(); },
  closeSheet() { S.sheet = null; S.resetArm = false; render(); },
  toggleID() { S.p.showID = !S.p.showID; save(); render(); },
  toggleSound() { S.p.sound = !S.p.sound; if (!S.p.sound) stopSpeech(); save(); render(); },
  toggleUnlock() { S.p.unlockAll = !S.p.unlockAll; save(); render(); },
  reset() {
    if (!S.resetArm) { S.resetArm = true; render(); return; }
    clearProgress(); S.p = structuredClone(DEFAULT_PROGRESS); S.resetArm = false; S.sheet = null; S.screen = "home"; render();
  },
  say(d) { speak(d.text); },
  gloss(d) { addToBag(d.w, d.m); S.tip = { w: d.w, m: d.m }; render(); sayIfOn(d.w); },
  closeTip() { S.tip = null; render(); },

  // Words
  wordsPrev() { S.run.i = Math.max(0, S.run.i - 1); render(); },
  wordsNext() {
    const w = D().WORDS[S.run.i]; addToBag(w.phrase, w.meaning, w.img);
    if (S.run.i < D().WORDS.length - 1) { S.run.i++; render(); sayIfOn(D().WORDS[S.run.i].phrase); } else { startWordGame(); render(); }
  },
  wordPick(d) {
    const r = S.run; const key = r.order[r.i];
    if (d.k === key) { r.state = "right"; render(); burst(8); sayIfOn(D().WORDS.find((w) => w.key === key).phrase); }
    else { r.wrong.push(d.k); r.state = "wrong"; render(); }
  },
  wordNext() {
    const r = S.run;
    if (r.i >= r.order.length - 1) { finishStage("words", D().META.wordsDone.en, D().META.wordsDone.id); return; }
    r.i++; r.state = null; r.wrong = []; r.opts = makeWordOpts(r.order[r.i]); render();
  },

  // Read
  readAloud() {
    const r = S.run;
    if (r.playing) { stopSpeech(); r.playing = false; render(); return; }
    r.playing = true; render();
    speak(D().STORY.sentences.map(plainStory), {
      onIndex: (i) => document.querySelectorAll(".sent").forEach((el) => el.classList.toggle("reading", +el.dataset.i === i)),
      onEnd: () => { if (S.run && S.stage === "read") { S.run.playing = false; render(); } },
    });
  },
  readDone() { stopSpeech(); S.tip = null; S.run = { phase: "quiz", i: 0, state: null, wrong: [] }; render(); },
  whoPick(d) {
    const r = S.run; const q = D().STORY.questions[r.i];
    if (d.k === q.a) { r.state = "right"; render(); burst(8); } else { r.wrong.push(d.k); r.state = "wrong"; render(); }
  },
  whoNext() {
    const r = S.run;
    if (r.i >= D().STORY.questions.length - 1) { finishStage("read", "You read the whole story and found who does what.", "Kamu membaca seluruh cerita dan menemukan siapa melakukan apa."); return; }
    r.i++; r.state = null; r.wrong = []; render();
  },

  // Pairs
  pairTap(d) {
    const r = S.run; const p = D().PAIRS[r.i]; const k = +d.k;
    if (r.step === "subj") { if (p.subj.includes(k)) { r.step = "verb"; r.bad = null; } else r.bad = k; }
    else if (r.step === "verb") {
      if (p.verb.includes(k)) { r.step = "done"; r.bad = null; render(); burst(6); sayIfOn(p.t); return; }
      r.bad = k;
    }
    render();
  },
  pairsNext() {
    const r = S.run;
    if (r.i >= D().PAIRS.length - 1) { r.phase = "card"; render(); return; }
    r.i++; r.step = "subj"; r.bad = null; render();
  },
  pairsFinish() { finishStage("pairs", "You can find the subject and its verb.", "Kamu bisa menemukan subjek dan kata kerjanya."); },

  // Shared quiz (practice + rounds)
  hint() { S.run.hint = !S.run.hint; render(); },
  pick(d) {
    const r = S.run; const it = r.items[r.i];
    if (d.v === it.a) {
      r.state = "right";
      if (r.results) r.results.push({ ok: !r.missed, r: it.r });
      r.first.push(!r.missed);
      render(); burst(8); sayIfOn(solvedText(it));
    } else { r.wrong.push(d.v); r.state = "wrong"; r.missed = true; render(); }
  },
  fixTap(d) {
    const r = S.run; const it = r.items[r.i]; const k = +d.k;
    if (k === it.w) { r.step = "fix"; r.msgWrongTap = false; r.badTap = null; r.state = null; }
    else { r.msgWrongTap = true; r.badTap = k; r.missed = true; }
    render();
  },
  quizNext() {
    const r = S.run;
    if (r.i >= r.items.length - 1) {
      if (S.stage === "practice") { finishStage("practice", "You chose the right verbs. Next: the game rounds!", "Kamu memilih kata kerja yang benar. Berikutnya: ronde permainan!"); return; }
      if (S.stage === "rounds") { PW().plays[r.round] = (PW().plays[r.round] || 0) + 1; save(); r.phase = "summary"; render(); if (r.results.every((x) => x.ok)) burst(16); return; }
    }
    Object.assign(r, { i: r.i + 1, state: null, wrong: [], missed: false, hint: false, step: "find", msgWrongTap: false, badTap: null });
    render();
  },

  // Rounds
  roundStart() { startRound(S.run.round); render(); },
  roundAgain() { startRound(S.run.round); render(); },
  roundNext() {
    const n = S.run.round;
    if (n >= 3) { finishStage("rounds", "You played all three rounds. Now try your check!", "Kamu sudah main tiga ronde. Sekarang coba cek mandiri!"); return; }
    S.run = { phase: "intro", round: n + 1 }; render();
  },

  // Check
  checkStart() { S.run = { phase: "play", items: D().CHECK.items.map((x) => ({ ...x, o: shuffle(x.o) })), i: 0, answers: [] }; render(); },
  checkTap(d) { const r = S.run; const k = +d.k; const a = r.answers[r.i] || {}; r.answers[r.i] = { tapped: k, picked: a.tapped === k ? a.picked : null }; render(); },
  checkPick(d) { const r = S.run; r.answers[r.i] = { ...(r.answers[r.i] || {}), picked: d.v }; render(); },
  checkNext() {
    const r = S.run;
    if (r.i < r.items.length - 1) { r.i++; render(); return; }
    const res = scoreCheck(r);
    PW().last = res;
    PW().best = PW().best == null ? res.score : Math.max(PW().best, res.score);
    PW().done.check = true; save();
    S.screen = "result"; S.stage = null; S.run = null; render();
    if (res.score >= 8) burst(20);
  },
};

let toastTimer = null;
function toast(en, id) {
  let el = document.querySelector(".toast");
  if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
  el.innerHTML = T(esc(en), esc(id));
  el.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
}

document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-act]");
  if (!el || el.disabled) return;
  const fn = act[el.dataset.act];
  if (fn) { e.preventDefault(); fn(el.dataset, el); }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && (S.sheet || S.tip)) { S.sheet = null; S.tip = null; render(); }
});

render();

if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
