const CACHE_NAME = 'my-cache-v1';
const URLs_TO_CACHE = [
  '/ExplodingKittens/',                         // Root of your app
  '/ExplodingKittens/index.html',               // Corrected path for index.html
  '/ExplodingKittens/static/js/main.984c3d98.js',        // Corrected path for JS
  '/ExplodingKittens/static/css/main.f6cfc5e0.css',      // Corrected path for CSS
  '/ExplodingKittens/explodingKittensIcon.png', // Corrected path for app icon
  '/ExplodingKittens/explodingKittensIcon.ico'  // Corrected path for favicon
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(URLs_TO_CACHE);
      })
      .catch((err) => {
        console.error('Failed to cache:', err);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // Return the cached file if found
      }

      // Handle navigation to client-side routes (e.g., /game)
      if (event.request.mode === 'navigate') {
        return caches.match('/ExplodingKittens/index.html');
      }

      // Fetch the request if not found in cache
      return fetch(event.request).catch(() => 
        caches.match('/ExplodingKittens/index.html')
      );
    })
  );
});
