---
---
let version = '{{ site.time | date_to_xmlschema  }}';
let precachePaths = ['/'];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(version).then(function (cache) {
            return cache.addAll(precachePaths);
        })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== version) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(version)
            .then((cache) => cache.match(event.request))
            .then(function (response) {
                if (response !== undefined) {
                    return response;
                } else {
                    return fetch(event.request).then(function (response) {
                        let responseClone = response.clone();

                        caches.open(version).then(function (cache) {
                            cache.put(event.request, responseClone);
                        });
                        return response;
                    });
                }
            }));
});
