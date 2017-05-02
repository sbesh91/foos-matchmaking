self.addEventListener('install', e => {
  e.waitUntil(
      caches.open('foos')
      .then(function(cache) {
        return cache.addAll([
          "/"
        ]);
      })      
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});