'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "main.dart.js": "75d8dae85701fa539daf2c83ce037278",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"assets/NOTICES": "6cd8265357c161270a6a5faf88cf8ecf",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/assets/images/slide3.jpg": "a7552f816f85d3a2dfea7762a31c954b",
"assets/assets/images/galery5.jpg": "1e81269fbd4151809e66afe57692e673",
"assets/assets/images/pasir6.webp": "cf36589e956f1b4a67bcf191913e11be",
"assets/assets/images/product1.jpg": "2f2408cfddc28b0d4fcfa4fe89ae3f77",
"assets/assets/images/sertifikat4.jpg": "da788d6b1aefcf6070b9a5ff5c979137",
"assets/assets/images/galery4.JPG": "392e53e1daeb35a00ce1d94278b18d05",
"assets/assets/images/slide1.jpg": "457e0e047944c46208e2e8dedbfbc373",
"assets/assets/images/bg_sertifikat.jpg": "26a056e283166166fb5b2caff6dd8ea1",
"assets/assets/images/galery6.jpg": "31c2a4ae4a189958345fef39f5d468c5",
"assets/assets/images/ig.png": "a476e99ffdc58917eb118495555c5b0f",
"assets/assets/images/slide2.webp": "be590f65d0a5b8b8e2eb5cbac56e6a6c",
"assets/assets/images/kabupaten_logo.png": "966f305feb16efbb4626f3b0a7366ad2",
"assets/assets/images/pasir5.webp": "4b270d0e7da60434658a7aaa3cd01854",
"assets/assets/images/galery2.JPG": "b43cb76473c6659f4f41dbc0530eed50",
"assets/assets/images/sertifikat1.jpg": "d27525f2a589b40bf0ee5aa03d06eb33",
"assets/assets/images/pasir2.webp": "420ad4b956cbb94d771f9b3626907ed6",
"assets/assets/images/galery7.jpeg": "e5cf561f0d4b99404c183ed727d0a178",
"assets/assets/images/pasir3.jpg": "fc5cd3da3a5ab7e4a480f2e5c23818f2",
"assets/assets/images/galery3.jpg": "96fcf1480772ea8566022299ebddba90",
"assets/assets/images/email.png": "964b840e884a60f9e2c898b43eb551ad",
"assets/assets/images/pasir1.jpg": "041b9313a7815e2009a59ac5160d5a97",
"assets/assets/images/wa.png": "2ef16b5b97e2f3532834737de015f0d3",
"assets/assets/images/visi_misi.jpg": "2d6922e0c4a5aa8e4556f7e8a52e94f4",
"assets/assets/images/galery1.jpg": "efe99ee765840d28c1820c4108be05ba",
"assets/assets/images/pasir4.jpg": "0c7b6df691197f439817d2488ec5285e",
"assets/assets/images/fb.png": "465faff2d70a72c2363cee2388910829",
"assets/assets/images/sertifikat3.jpg": "3c542cc0ad97634baebdbf0fd6c327f2",
"assets/assets/images/product_list.jpg": "ba93785626391fe94858feab21a77775",
"assets/assets/images/slide4.jpg": "07fec73341eff6fb45178dfb8ef717c2",
"assets/assets/images/logo.png": "b5a9850fd41992c9007d4d351c30dc95",
"assets/assets/images/sertifikat2.jpg": "9b8c22d4b728e4ae1762607a7bdb4511",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.json": "2ade6443268c481dc35899fcfb030da9",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"index.html": "dad465caabe6c889c645ea7adcb2a8cf",
"/": "dad465caabe6c889c645ea7adcb2a8cf",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"version.json": "e76cdb9754cbfa0a58a9fcd1aa93d491",
"manifest.json": "c2091dff86659d565feb7bb93583f03f"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
