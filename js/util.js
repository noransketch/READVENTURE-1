// Small helpers: storage, speech, shuffling, escaping.

const KEY = "readventure-progress-v1";

export const freshWorld = () => ({
  done: {},          // stageId -> true
  plays: { 1: 0, 2: 0, 3: 0 }, // how many times each round was played (picks the story variant)
  best: null,        // best check score (0-10)
  last: null,        // last check result summary
});

export const DEFAULT_PROGRESS = {
  worlds: { 1: freshWorld(), 2: freshWorld(), 3: freshWorld() }, // progress per world
  world: 3,          // the world the learner opened last
  showID: false,     // Indonesian support lines: off until the learner taps ID
  v: 3,              // progress format version
  sound: true,       // read-aloud on
  unlockAll: false,  // teacher demo: open every stage
  bag: {},           // My Word Bag: word -> { m: meaning, img }
};

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT_PROGRESS);
    const p = JSON.parse(raw);
    if (!p.v || p.v < 2) p.showID = false; // v2: Indonesian is shown only on request
    if (!p.worlds) { // v3: progress per world (old progress belongs to World 3)
      p.worlds = { 3: { done: p.done || {}, plays: { 1: 0, 2: 0, 3: 0, ...(p.plays || {}) }, best: p.best ?? null, last: p.last ?? null } };
      delete p.done; delete p.plays; delete p.best; delete p.last;
    }
    p.v = 3;
    const d = structuredClone(DEFAULT_PROGRESS);
    const worlds = { ...d.worlds };
    for (const [k, w] of Object.entries(p.worlds)) worlds[k] = { ...freshWorld(), ...w, plays: { 1: 0, 2: 0, 3: 0, ...(w.plays || {}) } };
    return { ...d, ...p, worlds, bag: { ...(p.bag || {}) } };
  } catch {
    return structuredClone(DEFAULT_PROGRESS);
  }
}

export function saveProgress(p) {
  try { localStorage.setItem(KEY, JSON.stringify(p)); } catch { /* storage blocked: keep working in memory */ }
}

export function clearProgress() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}

export function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

export function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---------- Speech (free, built into the browser) ----------
let voice = null;
function chooseVoice() {
  if (!("speechSynthesis" in window)) return;
  const vs = window.speechSynthesis.getVoices();
  voice =
    vs.find((v) => /en[-_]US/i.test(v.lang) && /female|samantha|google us/i.test(v.name)) ||
    vs.find((v) => /en[-_](US|GB|AU)/i.test(v.lang)) ||
    vs.find((v) => /^en/i.test(v.lang)) ||
    null;
}
if ("speechSynthesis" in window) {
  chooseVoice();
  window.speechSynthesis.onvoiceschanged = chooseVoice;
}

export const canSpeak = () => "speechSynthesis" in window;

export function stopSpeech() {
  if (canSpeak()) window.speechSynthesis.cancel();
}

// Speak one text, or a list of texts one after another (onIndex tells which one is playing).
export function speak(texts, { onIndex, onEnd, rate = 0.85 } = {}) {
  if (!canSpeak()) { onEnd && onEnd(); return; }
  const list = Array.isArray(texts) ? texts : [texts];
  window.speechSynthesis.cancel();
  list.forEach((text, i) => {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = voice ? voice.lang : "en-US";
    if (voice) u.voice = voice;
    u.rate = rate;
    u.pitch = 1.05;
    u.onstart = () => onIndex && onIndex(i);
    if (i === list.length - 1) u.onend = () => onEnd && onEnd();
    window.speechSynthesis.speak(u);
  });
}

// "Sari **gets up** at five." -> HTML with <b class="hl">
export function boldMarks(s) {
  return esc(s).replace(/\*\*(.+?)\*\*/g, '<b class="hl">$1</b>');
}

// Remove [word|meaning] markup -> plain text.
export function plainStory(s) {
  return s.replace(/\[([^|\]]+)\|[^\]]+\]/g, "$1");
}

export function tokens(s) {
  return s.split(" ");
}
