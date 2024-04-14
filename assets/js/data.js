// 1. Charger le JSON
fetch("assets/data/data.json")
  .then((response) => response.json())
  .then((data) => {
    // 2. Associer un événement de clic à chaque marqueur
    pointData.eachLayer(function (layer) {
      layer.on("click", function (e) {
        // Récupérer l'ID du marqueur
        var markerId = e.target.feature.properties.id;
        // Récupérer les données correspondantes du JSON
        var markerData = data[markerId - 1]; // Soustraire 1 car les indices commencent à partir de 0
        // Afficher les données dans la barre latérale
        updateSidebar(markerData);
      });
    });
  });

// 3. Afficher les données dans la barre latérale
function updateSidebar(data) {
  // Mettre à jour le contenu de la barre latérale avec les données du JSON
  $(".surname").text(data.surname);
  $(".name").text(data.name);
  // Vous pouvez ajouter d'autres champs ici en fonction de votre JSON
}
