// Correction récupérée car ni moi ni le prof n'avons su faire marcher mon service worker au dernier cours
const cacheName = "galerie";

const files = [
  "/",
  "/Script.js",
  "https://cdn.jsdelivr.net/npm/bulma@0.8.0/css/bulma.css",
  "https://bulma.io/images/placeholders/1280x960.png",
  "https://bulma.io/images/placeholders/96x96.png",
  "https://cdnjs.cloudflare.com/ajax/libs/localforage/1.7.3/localforage.min.js"
];

self.addEventListener("install", e => {
  caches.open(cacheName).then(cache => {
    cache.addAll(files);
  });
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", e => {console.log(e.request.url);});

self.addEventListener("fetch", event => {
  const url = event.request.url;

  if (url.indexOf("https://nostalgic-lamarr-5a666c.netlify.app/images.json") === 0) {
    event.respondWith(
      fetch(event.request).then(response => {
        if (response.status === 200) {
			console.info("Formatting data");
			return response.json().then(json => {
			const formattedResponse = json.map(j => ({
			name: j.name,
			description: j.description || "",
			updated_at: j.updated_at
			}));

			return new Response(JSON.stringify(formattedResponse));
			});
        }
		else{
			console.error(
			"Service Worker",
			"Error when fetching",			
			event.request.url
			);

			return response;
		}
        
      })
    );
  } 
  else {
    event.respondWith(
      caches
        .open(cacheName)
        .then(cache => cache.match(event.request))
        .then(response => response || fetch(event.request))
    );
  }
});


// // Test
// // console.log("test s'il est interprété OK!");
// // Fin Test

// // Test si le service worker reconnait les messages (type d'événement = 'message') envoyés
// // self.addEventListener('message',event=>
// // {
    // // this.clients.matchAll()
    // // .then(clients=>
    // // {
        // // clients.forEach(
            // // client=>client.postMessage('Enchanté, je suis le service worker')
        // // );
    // // });
// // });

// // Ecoute de tous les évènements fetch et récupération de chaque URL
// //self.addEventListener("fetch", event => {console.log(event.request.url);});

// // Ecoute de tous les évènements fetch et récupération de l’URL permettant l’obtention de images.jsonpuis reformatage de images.json
// self.addEventListener("fetch", (event) => 
// {
	// // Test
	// console.log("On a trouvé un fetch");
	// console.log("L'url.indexOf c'est ça : " + url.indexOf("https://trusting-swirles-3a325e.netlify.app/GalerieRepos/tableau.json"));
	// // Fin Test
	
	// const url = event.request.url;
	
	// // Test
	// console.log("L'url c'est ça : " + url);
	// // Fin Test
	
	// if (url.indexOf("https://trusting-swirles-3a325e.netlify.app/GalerieRepos/tableau.json") ===0) 
	// {
		// console.log("Le fetch est sur une requête vers notre tableau.json");
		// event.respondWith(fetch(event.request)
		// .then((response) => 
		// {
			// console.log(response.status);
			// if (response.status === 200) 
			// {
				// console.info("Formatting data");
				// return response.json().then((json) => 
				// {
					// const formattedResponse = json.map((j) => (
					// {
						// name: j.name,
						// description: j.description || "",
						// updated_at: j.updated_at,
						// created_at: j.created_at,
						// image: j.image
					// }));
					// return new Response(JSON.stringify(formattedResponse));
				// });
				
			// }else{
				// console.error(
					// "Service Worker",
					// "Error when fetching",
					// event.request.url
				// );
				// return response;
			// }
		// }));
	// }
// });

// // Si on reconnait un fetch, on écrit "PWA!!!!"
// // self.addEventListener('fetch',event=>
// // {    
    // // console.log(newResponse('PWA!!!!'));
// // });
