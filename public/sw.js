const CACHE = "bme-v8";

// Install — skip waiting immediately so new SW takes over fast
self.addEventListener("install", e => {
  e.waitUntil(self.skipWaiting());
});

// Activate — clear ALL old caches and claim clients immediately
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch strategy:
// - Navigation (HTML): NETWORK-ONLY (always fresh, no caching)
// - /assets/ (content-hashed JS/CSS): CACHE-FIRST (safe, these never change)
// - Everything else: NETWORK-FIRST
self.addEventListener("fetch", e => {
  const url = e.request.url;

  // Never intercept API calls
  if (url.includes("/api/") || url.includes("groq") || url.includes("anthropic") || url.includes("fonts.googleapis")) return;

  // Navigation requests — NETWORK-ONLY, never serve cached HTML
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request));
    return;
  }

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

  // Everything else — network first
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});
