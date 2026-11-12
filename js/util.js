// Small helpers: storage, speech, shuffling, escaping.

const KEY = "readventure-progress-v1";

export const DEFAULT_PROGRESS = {
  done: {},          // stageId -> true
  plays: { 1: 0, 2: 0, 3: 0 }, // how many times each round was played (picks the story variant)
  best: null,        // best check score (0-10)
  last: null,        // last check result summary
  showID: true,      // show Indonesian support lines
  sound: true,       // read-aloud on
  unlockAll: false,  // teacher demo: open every stage
  bag: {},           // My Word Bag: word -> { m: meaning, img }
};

export function loadProgress() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return structuredClone(DEFAULT_PROGRESS);
    const p = JSON.parse(raw);
    return { ...structuredClone(DEFAULT_PROGRESS), ...p, plays: { ...DEFAULT_PROGRESS.plays, ...(p.plays || {}) }, bag: { ...(p.bag || {}) } };
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
