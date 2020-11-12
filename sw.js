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

// Si on reconnait un fetch, on écrit "PWA!!!!"
self.addEventListener('fetch',event=>
{    
    event.RespondWith(newResponse('PWA!!!!'));
});