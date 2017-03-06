var cacheName = 'mobx.react.demo-v10'
var filesToCache = [
  'index.html',
  'static/js/*.js',
  'static/css/*.css',
  'images/icons/*.png'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  console.log('caches: %s', JSON.stringify(caches))
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response)
        console.log('using cache for: %s', e.request)
      else console.log('NOT using cache for: %s response: %s', e.request, response)
      return response || fetch(e.request);
    })
  );
});
