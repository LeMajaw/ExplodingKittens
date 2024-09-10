// public/service-worker.js

const CACHE_NAME = 'exploding-kittens-cache-v1';
const URLs_TO_CACHE = [
  '/Exploding-Kittens/',
  '/Exploding-Kittens/index.html',
  '/Exploding-Kittens/static/js/bundle.js',
  '/Exploding-Kittens/static/css/main.css',
  '/Exploding-Kittens/icon-512x512.png',
  // Add other static files that should be cached here
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLs_TO_CACHE);
    })
  );
});

// Fetch event - serve cached files when available, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response; // return cached file
      }

      // If the request is for a navigation to a client-side route (e.g., /game)
      if (event.request.mode === 'navigate') {
        return caches.match('/Exploding-Kittens/index.html');
      }

      return fetch(event.request).catch(() =>
        caches.match('/Exploding-Kittens/index.html')
      );
    })
  );
});
