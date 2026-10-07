const VERSION = "sohc-v1";
const PRECACHE = ["/", "/schedule", "/competition-guide", "/offline", "/images/logo-horizontal.png", "/images/logo.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;
  const isPage = req.mode === "navigate";
  e.respondWith(
    fetch(req)
      .then((res) => {
        const copy = res.clone();
        if (res.ok && (isPage || /\/_next\/static\/|\/images\//.test(req.url))) caches.open(VERSION).then((c) => c.put(req, copy));
        return res;
      })
      .catch(async () => {
        const cached = await caches.match(req, { ignoreSearch: true });
        if (cached) return cached;
        if (isPage) return caches.match("/offline");
        return Response.error();
      }),
  );
});
