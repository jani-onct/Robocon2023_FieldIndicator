// キャッシュファイルの指定
var CACHE_NAME = 'Robocon2023_FieldIndicator';
var urlsToCache = [
    // '/jani-onct.github.io/',
    // '/FieldIndicator_3_5.css/',
    // '/FieldIndicator_3_5.js/',
    '/Robocon2023_FieldIndicator/index.html',
    '/Robocon2023_FieldIndicator/FieldIndicator_3_5.css',
    '/Robocon2023_FieldIndicator/FieldIndicator_3_5.js'
];

// インストール処理
self.addEventListener('install', function(event) {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches
            .match(event.request)
            .then(function(response) {
                return response ? response : fetch(event.request);
            })
    );
});
