var serviceWorkerOption = {
  "assets": [
    "/main.bab9aea6c7f53208c31e.js",
    "/index.html",
    "/manifest.webmanifest",
    "/images.json",
    "/images/icons/icon-192x192.png",
    "/images/icons/icon-152x152.png",
    "/images/icons/icon-384x384.png",
    "/images/icons/icon-144x144.png",
    "/images/icons/icon-128x128.png",
    "/images/icons/icon-72x72.png",
    "/images/icons/icon-512x512.png",
    "/images/icons/icon-96x96.png"
  ]
};
        
        !function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t){const n=["/","/script.js","https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.css","https://bulma.io/images/placeholders/1280x960.png","https://bulma.io/images/placeholders/96x96.png","https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js"];self.addEventListener("install",e=>{caches.open("galerie").then(e=>{e.addAll(n)})}),self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then((function(e){return Promise.all(e.map((function(e){if("galerie"!==e)return caches.delete(e)})))})))}),self.addEventListener("fetch",e=>{console.log(e.request.url)}),self.addEventListener("fetch",e=>{0===e.request.url.indexOf("https://nostalgic-lamarr-5a666c.netlify.app/images.json")?e.respondWith(fetch(e.request).then(t=>200===t.status?(console.info("Formatting data"),t.json().then(e=>{const t=e.map(e=>({name:e.name,description:e.description||"",updated_at:e.updated_at}));return new Response(JSON.stringify(t))})):(console.error("Service Worker","Error when fetching",e.request.url),t))):e.respondWith(caches.open("galerie").then(t=>t.match(e.request)).then(t=>t||fetch(e.request)))})}]);