const cacheName = 'time-record-20171221';
const filesToCache = [
  '/',
  '/index.html',
  '/static/images/48x48.png',
  '/static/images/64x64.png',
  '/static/images/logo.png',
  '/static/images/256x256.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      return cache.addAll(filesToCache);
    }));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map((key) => {
      if (key !== cacheName) {
        return caches.delete(key);
      }
      return null;
    }))));

  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    }));
});

