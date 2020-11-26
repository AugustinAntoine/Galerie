// Script.js récupéré de la correction car ni moi ni le prof n'arrivait à faire marcher ma solution au dernier cours

function reduireArray(array, size) {
  if (array.length <= size) {
    return [array];
  }
  return [array.slice(0, size), ...reduireArray(array.slice(size), size)];
}

const dateTimeFormat = Intl.DateTimeFormat("fr");

function afficher(json){
	const selections = reduireArray(json, 3);

  let html = "";

  selections.forEach(selection => {
    html += '<div class="columns">';

    selection.forEach((repo) => {
      html += `
            <div class="column">
            <div class="card">
              <div class="card-image">
                <figure class="image is-4by3">
                  <img
                    src="https://bulma.io/images/placeholders/1280x960.png"
                    alt="Placeholder image"
                  />
                </figure>
              </div>
              <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-48x48">
                      <img
                        src="https://bulma.io/images/placeholders/96x96.png"
                        alt="Placeholder image"
                      />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">${repo.name}</p>
                    <p class="subtitle is-6">@Parcourir</p>
                  </div>
                </div>
  
                <div class="content">
                   ${repo.description}
                  <br />
                  Dernière mise à jour: <time datetime="${
                    repo.updated_at
                  }">${dateTimeFormat.format(new Date(repo.updated_at))}</time>
                </div>
              </div>
            </div>
          </div>`;
    });
    html += "</div>";
  });

  document.querySelector(".container").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
  if (navigator.onLine) {
    document.querySelector(".notification").setAttribute("hidden", "");
  }

  window.addEventListener("online", () => {
    document.querySelector(".notification").setAttribute("hidden", "");
  });
  window.addEventListener("offline", () => {
    document.querySelector(".notification").removeAttribute("hidden");
  });
// Modification par rapport au script.js de la correction : changer l'url à fetch
  let fetchData;
  if (navigator.onLine) {
    fetchData = fetch("https://trusting-swirles-3a325e.netlify.app/GalerieRepos/tableau.json")
      .then((response) => response.json())
      .then((data) => localforage.setItem("data", data));
  } 
  else {
    fetchData = localforage.getItem("data");
  }

  fetchData.then((json) => afficher(json));
});

// Ancien Script.js

// function reduireArray(array, size) {
	// if (array.length <= size) {
		// return [array];
	// }
	// return [array.slice(0, size),
	// ...reduireArray(array.slice(size), size)];
// }

// const dateTimeFormat = Intl.DateTimeFormat("fr");

// function afficher(json){
	// const selections = reduireArray(json, 3);
	// let html = "";
	// selections.forEach(selection => {
		// html += '<div class="columns">';
		// selection.forEach(repo => {
			// html += `
			// <div class="column">
				// <div class="card">
					// <div class="card-image">
						// <figure class="image is-4by3">
							// <img src="${repo.image}" alt="Placeholder image"/>
						// </figure>
					// </div>
					// <div class="card-content">
						// <div class="media">
							// <div class="media-left">
								// <figure class="image is-48x48">
									// <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
								// </figure>
							// </div>
							// <div class="media-content">
								// <p class="title is4">${repo.name}</p>
								// <p class="subtitle is6">@Parcourir</p>
							// </div>
						// </div>

						// <div class="content">
							// ${repo.description}
							// <br />
							// Dernière mise à jour: <time datetime="${repo.updated_at}"> ${dateTimeFormat.format(new Date(repo.updated_at))}</time>
						// </div>
					// </div>
				// </div>
			// </div>`;
		// });
		// html += "</div>";
	// });
	// document.querySelector(".container").innerHTML =
	// html;
// }

// document.addEventListener("DOMContentLoaded", function() {
	// fetch("/GalerieRepos/tableau.json")
		// .then(response => response.json())
		// .then(json => afficher(json));
// });
