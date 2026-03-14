const CACHE_NAME = "cgvyapam-v1";
const ASSETS = [
  "/study-app/",
  "/study-app/index.html",
  "/study-app/manifest.json",
  "/study-app/icon-192.png",
  "/study-app/icon-512.png"
];

// Install — cache all files
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate — delete old caches
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — cache first, then network
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
