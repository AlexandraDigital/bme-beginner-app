const CACHE = "bme-v6";
const BASE = "/bme-beginner-app";

// Install — DO NOT pre-cache index.html (it has content-hashed JS refs that change every build)
self.addEventListener("install", e => {
  e.waitUntil(self.skipWaiting());
});

// Activate — clear old caches
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - Navigation (HTML): NETWORK-FIRST, cache the response as offline fallback
// - /assets/ (content-hashed JS/CSS): CACHE-FIRST (safe, these never change)
// - Everything else: NETWORK-FIRST
self.addEventListener("fetch", e => {
  const url = e.request.url;

  // Never intercept API calls
  if (url.includes("/api/") || url.includes("groq") || url.includes("anthropic")) return;

  // Content-hashed assets — safe to cache-first
  if (url.includes("/assets/")) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request).then(res => {
          if (res.status === 200) {
            const clone = res.clone();
            caches.open(CACHE).then(cache => cache.put(e.request, clone));
          }
          return res;
        });
      })
    );
    return;
  }

  // Navigation requests and everything else — NETWORK-FIRST
  e.respondWith(
    fetch(e.request).then(res => {
      // Cache successful navigation responses as offline fallback
      if (e.request.mode === "navigate" && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
      }
      return res;
    }).catch(() => {
      // Offline fallback — return last cached version of the page
      if (e.request.mode === "navigate") {
        return caches.match(e.request) || caches.match(BASE + "/") || caches.match(BASE + "/index.html");
      }
    })
  );
});
