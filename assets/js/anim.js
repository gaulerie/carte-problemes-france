// Pour les couches polygonales
polygonData.on("click", function (e) {
  $("#sidebar").addClass("displayed");
  $(".leaflet-control-zoom").addClass("swiped");
});

// Pour les points
pointData.on("click", function (e) {
  $("#sidebar").addClass("displayed");
  $(".leaflet-control-zoom").addClass("swiped");
});

// Écouteur d'événement pour la fermeture de la popup
map.on("popupclose", function (e) {
  $("#sidebar").removeClass("displayed");
  $(".leaflet-control-zoom").removeClass("swiped");
});

// Gestionnaire d'événement pour le bouton croix de la popup
$("#popup-close-btn").click(function () {
  map.closePopup();
  $("#sidebar").removeClass("displayed");
  $(".leaflet-control-zoom").removeClass("swiped");
});

// Gestionnaire d'événement pour le bouton croix de la sidebar
$("#sidebar-close-btn").click(function () {
  $("#sidebar").removeClass("displayed");
  $(".leaflet-control-zoom").removeClass("swiped");
});
