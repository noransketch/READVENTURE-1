// Offline support: cache the whole app on first visit, then serve from cache.
// Change VERSION whenever you deploy new content so phones get the update.
const VERSION = "readventure-v5-world2-pics";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "css/style.css",
  "js/app.js",
  "js/content.js",
  "js/util.js",
  "js/worlds/w1.js",
  "js/worlds/w2.js",
  "assets/vocab/do_homework.webp",
  "assets/vocab/get_up.webp",
  "assets/vocab/go_to_school.webp",
  "assets/vocab/have_breakfast.webp",
  "assets/vocab/help_mother.webp",
  "assets/vocab/play_with_friends.webp",
  "assets/vocab/read_book.webp",
  "assets/vocab/sleep.webp",
  "assets/vocab/family.webp",
  "assets/vocab/mother.webp",
  "assets/vocab/father.webp",
  "assets/vocab/brother.webp",
  "assets/vocab/sister.webp",
  "assets/vocab/grandmother.webp",
  "assets/vocab/grandfather.webp",
  "assets/vocab/friend.webp",
  "assets/world/bg_world1_family.webp",
  "assets/vocab/board.webp",
  "assets/vocab/desk.webp",
  "assets/vocab/notebook.webp",
  "assets/vocab/eraser.webp",
  "assets/vocab/ruler.webp",
  "assets/vocab/chair.webp",
  "assets/vocab/pencil_case.webp",
  "assets/vocab/library.webp",
  "assets/world/bg_world2_class.webp",
  "assets/brand/compass.webp",
  "assets/brand/glowing_book.webp",
  "assets/brand/logo.webp",
  "assets/characters/aisyah_cheer.webp",
  "assets/characters/aisyah_idle.webp",
  "assets/characters/aisyah_reading.webp",
  "assets/characters/dimas_cheer.webp",
  "assets/characters/dimas_idle.webp",
  "assets/characters/dimas_pointing.webp",
  "assets/characters/rudi_cheer.webp",
  "assets/characters/rudi_encourage.webp",
  "assets/characters/rudi_idle.webp",
  "assets/characters/rudi_thinking.webp",
  "assets/characters/rudi_thumbsup.webp",
  "assets/characters/sari_cheer.webp",
  "assets/characters/sari_encourage.webp",
  "assets/characters/sari_idle.webp",
  "assets/characters/sari_thinking.webp",
  "assets/characters/sari_thumbsup.webp",
  "assets/world/bg_world3_myday.webp",
  "assets/world/title_background.webp",
  "assets/world/world_map.webp",
  "assets/icons/apple-touch-icon.png",
  "assets/icons/favicon-64.png",
  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",
  "assets/icons/icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Google Fonts: cache after the first load so text looks the same offline.
  if (url.hostname.endsWith("fonts.googleapis.com") || url.hostname.endsWith("fonts.gstatic.com")) {
    e.respondWith(
      caches.open(VERSION + "-fonts").then(async (c) => {
        const hit = await c.match(req);
        if (hit) return hit;
        try { const res = await fetch(req); c.put(req, res.clone()); return res; } catch { return hit || Response.error(); }
      })
    );
    return;
  }
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(VERSION).then((c) => c.put(req, copy));
      return res;
    }).catch(() => caches.match("index.html")))
  );
});
