import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { registerRoute } from 'workbox-routing';

// Precache and route for all files that Webpack generates
precacheAndRoute(self.__WB_MANIFEST);

// Handle navigation requests (e.g., SPA routes)
registerRoute(
  ({ request }) => request.mode === 'navigate',
  createHandlerBoundToURL('/index.html')
);

// Cache static resources
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