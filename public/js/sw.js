/* eslint-disable no-restricted-globals, consistent-return */

const CACHE_NAME = 'react-covid-v1.2';

const immutableRequests = [
    'https://unpkg.com/carbon-components/css/carbon-components.min.css',
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap',
    'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
    'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmWUlfBBc4AMP6lQ.woff2',
    'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc4AMP6lQ.woff2',
    'https://fonts.gstatic.com/s/ibmplexsanscondensed/v6/Gg8lN4UfRSqiPg7Jn2ZI12V4DCEwkj1E4LVeHYapyK7Bh4sN.woff2',
    'https://fonts.gstatic.com/s/ibmplexsans/v6/zYX9KVElMYYaJe8bpLHnCwDKjQ76AIFsdP3pBms.woff2',
];

const mutableRequests = ['./index.html', './index_bundle.js'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            const newImmutableRequests = [];
            return Promise.all(
                immutableRequests.map((url) =>
                    caches.match(url).then((response) => {
                        if (response) {
                            return cache.put(url, response);
                        }
                        newImmutableRequests.push(url);
                        return Promise.resolve();
                    }),
                ),
            ).then(() =>
                cache.addAll(newImmutableRequests.concat(mutableRequests)),
            );
        }),
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.forEach((cacheName) => {
                    if (
                        CACHE_NAME !== cacheName &&
                        cacheName.startsWith('react-covid')
                    ) {
                        return caches.delete(cacheName);
                    }
                }),
            ),
        ),
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request).catch(() =>
            caches.match(event.request).then((response) => {
                if (response) {
                    return response;
                }
                if (event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('./index.html');
                }
            }),
        ),
    );
});
