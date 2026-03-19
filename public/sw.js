const CACHE = "bme-v3";
const BASE = "/bme-beginner-app";

// Install — cache the shell
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache =>
      cache.addAll([BASE + "/", BASE + "/index.html"])
    ).then(() => self.skipWaiting())
  );
});

// Activate — clear old caches
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — cache-first for assets, network-first for API calls
self.addEventListener("fetch", e => {
  // Never intercept API calls
  if (e.request.url.includes("/api/") || e.request.url.includes("groq") || e.request.url.includes("anthropic")) return;

  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        // Cache successful GET responses (assets, fonts, etc.)
        if (e.request.method === "GET" && res.status === 200) {
          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(e.request, clone));
        }
        return res;
      }).catch(() => {
        // Offline fallback — return cached shell for navigation
        if (e.request.mode === "navigate") {
          return caches.match(BASE + "/index.html") || caches.match(BASE + "/");
        }
      });
    })
  );
});
