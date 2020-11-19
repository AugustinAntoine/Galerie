// Test
// console.log("test s'il est interprété OK!");
// Fin Test

// Test si le service worker reconnait les messages (type d'événement = 'message') envoyés
// self.addEventListener('message',event=>
// {
    // this.clients.matchAll()
    // .then(clients=>
    // {
        // clients.forEach(
            // client=>client.postMessage('Enchanté, je suis le service worker')
        // );
    // });
// });

// Ecoute de tous les évènements fetch et récupération de chaque URL
//self.addEventListener("fetch", event => {console.log(event.request.url);});

// Ecoute de tous les évènements fetch et récupération de l’URL permettant l’obtention de images.jsonpuis reformatage de images.json
self.addEventListener("fetch", (event) => 
{
	// Test
	console.log("On a trouvé un fetch");
	console.log("L'url.indexOf c'est ça : " + url.indexOf("https://trusting-swirles-3a325e.netlify.app/GalerieRepos/tableau.json"));
	// Fin Test
	
	const url = event.request.url;
	
	// Test
	console.log("L'url c'est ça : " + url);
	// Fin Test
	
	if (url.indexOf("https://trusting-swirles-3a325e.netlify.app/GalerieRepos/tableau.json") ===0) 
	{
		console.log("Le fetch est sur une requête vers notre tableau.json");
		event.respondWith(fetch(event.request)
		.then((response) => 
		{
			console.log(response.status);
			if (response.status === 200) 
			{
				console.info("Formatting data");
				return response.json().then((json) => 
				{
					const formattedResponse = json.map((j) => (
					{
						name: j.name,
						description: j.description || "",
						updated_at: j.updated_at,
						created_at: j.created_at,
						image: j.image
					}));
					return new Response(JSON.stringify(formattedResponse));
				});
				
			}else{
				console.error(
					"Service Worker",
					"Error when fetching",
					event.request.url
				);
				return response;
			}
		}));
	}
});

// Si on reconnait un fetch, on écrit "PWA!!!!"
// self.addEventListener('fetch',event=>
// {    
    // console.log(newResponse('PWA!!!!'));
// });
