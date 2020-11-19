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
self.addEventListener("fetch", event => {console.log(event.request.url);});

// Ecoute de tous les évènements fetch et récupération de l’URLpermettant l’obtention de images.jsonpuis reformatage de images.json
self.addEventListener("fetch", (event) => 
{
	const url = event.request.url;
	if (url.indexOf("https://trusting-swirles-3a325e.netlify.app/GalerieRepos/tableau.json") ===0) 
	{
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
