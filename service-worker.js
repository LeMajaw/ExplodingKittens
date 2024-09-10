const CACHE_NAME = 'my-cache-v1';
const URLs_TO_CACHE = [
  '/ExplodingKittens/',                        // Root of your app
  '/ExplodingKittens/index.html',              // Corrected path for index.html
  '/ExplodingKittens/static/js/main.js',       // Corrected path for main.js
  '/ExplodingKittens/static/css/main.css',     // Corrected path for main.css
  '/ExplodingKittens/explodingKittensIcon.png',// Corrected path for app icon
  '/ExplodingKittens/explodingKittensIcon.ico' // Corrected path for favicon
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLs_TO_CACHE))
      .catch((err) => console.log('Failed to cache:', err))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // return cached file
      }

      // If the request is for a navigation route (e.g., /game)
      if (event.request.mode === 'navigate') {
        return caches.match('/ExplodingKittens/index.html');
      }

      return fetch(event.request).catch(() =>
        caches.match('/ExplodingKittens/index.html')
      );
    })
  );
});
