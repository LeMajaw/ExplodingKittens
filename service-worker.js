const CACHE_NAME = 'my-cache-v1';
const URLs_TO_CACHE = [
  '/',                        // Root of your app
  '/ExplodingKittens/index.html',              // Corrected path for index.html
  '/ExplodingKittens/static/js/main.js', // Hashed JS file
  '/ExplodingKittens/static/css/main.css', // Hashed CSS file
  '/ExplodingKittens/explodingKittensIcon.png',  // App icon
  '/ExplodingKittens/explodingKittensIcon.ico',  // App icon
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(URLs_TO_CACHE))
      .catch((err) => console.log('Failed to cache:', err))
  );
});

// Fetch event - serve cached files when available, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // return cached file
      }

      // If the request is for navigation to a client-side route (e.g., /game)
      if (event.request.mode === 'navigate') {
        return caches.match('/ExplodingKittens/index.html');
      }

      return fetch(event.request).catch(() =>
        caches.match('/ExplodingKittens/index.html')
      );
    })
  );
});