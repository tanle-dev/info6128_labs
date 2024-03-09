// Author: Tan Le
// Last modified: 2024/02/02

const cacheName = 'Cache Data V1.0';
/**
 * On Install Event.
 * Triggered when the service worker is installed.
 */
self.addEventListener('install', function(event) {
    // Activate itself when it enters the waiting phase.
    self.skipWaiting();

    // Add a call to skipWaiting here
    event.waitUntil(
        caches.open(cacheName)
            .then(function(cache) {
                cache.addAll([
                    '/',
                    '/index.html',
                    '/main.css',
                    '/js/main.js',
                    '/manifest.json',
                    '/service-worker.js',
                    '/assets/icons/android-chrome-144x144.png',
                    '/assets/imgs/logo__192x192.png'
                ])
            })
            .catch((error) => {})
    )
});

/**
 * On Activate Event.
 * Triggered when the service worker is activated.
 */
self.addEventListener('activate', function(event) {
    // Immediately get control over the open pages.
    event.waitUntil(self.clients.claim());

    // Remove old caches
    event.waitUntil(
        caches.keys()
            .then((cacheNames)=> {
                return Promise.all(
                    cacheNames.filter(item => item != cacheName)
                        .map(item => caches.delete(item))
                )
            })
        )
});


/**
 * On Fetch Event.
 * Triggered when the service worker is fetching.
 */
self.addEventListener('fetch', function(event) {
    // Stale While Revalidate
    if(event.request.method == "GET"){
        event.respondWith(
            caches.open(cacheName)
                .then((cache)=>{
                    return cache.match(event.request)
                                .then((cachedRespond) => {
                                    const fetchedRespond = fetch(event.request)
                                        .then((networkRespond) => {
                                            cache.put(event.request, networkRespond.clone())
                                            return networkRespond
                                        })
                                        .catch(() => {
                                                return cache.match("/index.html")
                                            }
                                        )
                                    return cachedRespond || fetchedRespond
                                })
                })
        )
    }
});