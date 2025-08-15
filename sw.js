// キャッシュするファイルの名前とバージョンを定義
const CACHE_NAME = 'robocon2023-field-indicator-v1';
// キャッシュするファイルのリスト
const urlsToCache = [
  '/',
  'index.html',
  'FieldIndicator_3_5.css',
  'FieldIndicator_3_5.js',
  'images/allFruits.png',
  'images/grape.png',
  'images/blueberry.png',
  'images/logo.png',
  'images/allFruits_192.png',
  'images/allFruits_512.png',
  'images/Robocon2023_logo.png'
];

// サービスワーカーのインストールイベント
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// サービスワーカーのフェッチイベント
// リクエストがあった際に、キャッシュがあればキャッシュから返し、なければネットワークから取得する
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response; // キャッシュにヒットした場合
        }
        return fetch(event.request); // キャッシュになかった場合
      })
  );
});