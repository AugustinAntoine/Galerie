console.log("test s'il est interprété OK!");

self.addEventListener('message',event=>
{
    this.clients.matchAll()
    .then(clients=>
    {
        clients.forEach(
            client=>client.postMessage('Enchanté, je suis le service worker')
        );
    });
});

// Ecoute de tous les évènements fetch et récupération de chaque URL
//self.addEventListener("fetch", event => {console.log(event.request.url);});

// Ecoute de tous les évènements fetch et récupération de l’URL permettant l’obtention de images.jsonpuis reformatage de images.json
self.addEventListener("fetch", (event) => 
{
	console.log("On a trouvé un fetch");
	const url = event.request.url;
	console.log("L'url c'est ça : " + url);
	if (url.indexOf("https://5fb641ef0cc1ea0007f36d49--trusting-swirles-3a325e.netlify.app/tableau.json") ===0) 
	{
		console.log("Le fetch est sur une requête vers notre tableau.json");
		event.respondWith(fetch(event.request)
		.then((response) => 
		{
			if (response.statusText !== "OK") 
			{
				console.error("Service Worker","Error when fetching",event.request.url);
				return response;
			}
			console.info("Formatting data");
			return response.json()
			.then((json) => 
			{
				const formattedResponse = json.map((j) => (
				{
					name: j.name,description: j.description || "",updated_at: j.updated_at,
				})
				);
				return new Response(JSON.stringify(formattedResponse));
			});
		}));
	}
});

// Si on reconnait un fetch, on écrit "PWA!!!!"
// self.addEventListener('fetch',event=>
// {    
    // console.log(newResponse('PWA!!!!'));
// });
