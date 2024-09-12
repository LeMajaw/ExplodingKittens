import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';

// Precache and route for all files that Webpack generates
precacheAndRoute(self.__WB_MANIFEST);

// Handle navigation requests (e.g., SPA routes)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  createHandlerBoundToURL('/ExplodingKittens/index.html') // Ensure the path matches
);

// Cache static resources like JS and CSS files
registerRoute(
  ({ request }) => request.destination === 'script' || request.destination === 'style',
  new CacheFirst({
    cacheName: 'static-resources',
    expiration: {
      maxEntries: 50,
      maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 Days
    },
  })
);

// Listen for the 'install' event and force the waiting service worker to activate
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Immediately activate the new service worker
});

// Activate the new service worker and clear old caches if necessary
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== 'static-resources' && cacheName !== self.CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Immediately control all clients without reloading
});

// Optional: Notify users about updates
self.addEventListener('controllerchange', () => {
  window.location.reload(); // Automatically reloads the page
});