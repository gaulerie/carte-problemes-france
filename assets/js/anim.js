// Pour les couches polygonales
polygonData.on("click", function (e) {
  $("#sidebar").addClass("displayed");
});

// Pour les points
pointData.on("click", function (e) {
  $("#sidebar").addClass("displayed");
});

// Écouteur d'événement pour la fermeture de la popup
map.on("popupclose", function (e) {
  $("#sidebar").removeClass("displayed");
});

// Gestionnaire d'événement pour le bouton croix de la popup
$("#popup-close-btn").click(function () {
  map.closePopup();
  $("#sidebar").removeClass("displayed");
});

// Gestionnaire d'événement pour le bouton croix de la sidebar
$("#sidebar-close-btn").click(function () {
  $("#sidebar").removeClass("displayed");
});
