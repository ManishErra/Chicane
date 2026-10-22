const CACHE = "chicane-shell-v26";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./data/calendar.json];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  // Live provider data always goes to the network. The app shell and curated
  // calendar are network-first so refresh/reopen sees updates, with offline fallback.
  const live = url.pathname === "/api/race-mx" || url.pathname.endsWith("/api/race-mx");
  const refreshOnOpen = live || url.pathname.endsWith("/index.html") ||
    url.pathname.endsWith("/data/calendar.json") || url.pathname.endsWith("/");
  if (refreshOnOpen) {
    event.respondWith(fetch(event.request, { cache: "no-store" }).then(response => {
      if (response.ok && !live) {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(event.request, copy));
      }
      return response;
    }).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      throw new Error("Network unavailable and no cached response exists");
    }));
    return;
  }

  event.respondWith(caches.match(event.request).then(cached => {
    if (cached) return cached;
    return fetch(event.request).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request, response.clone()));
      return response;
    });
  }));
});
