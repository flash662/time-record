const cacheName = 'time-record-20171219';
const filesToCache = [
  '/',
  '/index.html',
  '/static/images/48x48.png',
  '/static/images/64x64.png',
  '/static/images/logo.png',
  '/static/images/256x256.png'
];

self.addEventListener('install', (e) => {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    }));
});

self.addEventListener('activate', (e) => {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(keyList => Promise.all(keyList.map((key) => {
      if (key !== cacheName) {
        console.log('[ServiceWorker] Removing old cache', key);
        return caches.delete(key);
      }
      return null;
    }))));

  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    }));
});

