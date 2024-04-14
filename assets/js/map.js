var map = L.map("map").setView([47, 5], 6);

// Layers

//osm layer
// var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// });
// map.addLayer(osm)

var dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 20,
});

googleStreets = L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});

googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});

googleStreets.addTo(map);

// var wms = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
//   layers: "geoapp:admin",
//   format: "image/png",
//   transparent: true,
//   attribution: "wms test",
// });

// GeoJSON

var pointJson = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", properties: { id: 1 }, geometry: { type: "Point", coordinates: [4.8357, 45.764] } },
    { type: "Feature", properties: { id: 2 }, geometry: { type: "Point", coordinates: [2.3522, 48.8566] } },
  ],
};

var pointData; // Variable pour stocker les données GeoJSON

// Envoyer une requête GET à votre Web App
fetch("https://script.google.com/macros/s/AKfycbyBCceivdsdI5utTYqA1gYBEiP78OBkjGs9ZTDNL6G7yGQIWsx1HqGQ6yi8uoa79RA1/exec")
  .then((response) => response.json()) // Convertir la réponse en JSON
  .then((data) => {
    pointData = data;
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des données :", error);
  });

function updateSidebar(data, index) {
  // Vérifier si l'index spécifié est valide
  if (index >= 0 && index < data.length) {
    $(".surname").text(data[index]["Nom"]);
    $(".name").text(data[index]["Prénom"]);
    $(".birthdate").text(data[index]["Date de Naissance"]);
    $(".countryEntranceDate").text(data[index]["Date d'entrée en France"]);
    $(".nationalities").text(data[index]["Nationalités"]);
    $(".ethnicities").text(data[index]["Ethnicités"]);

    for (let i = 0; i < 3; i++) {
      $(".actDate")
        .eq(i)
        .text(data[index]["Acte " + (i + 1) + " - Date"]);
      $(".actTitle")
        .eq(i)
        .text(data[index]["Acte " + (i + 1) + " - Titre"]);
      $(".actDescription")
        .eq(i)
        .text(data[index]["Acte " + (i + 1) + " - Description"]);
    }

    $(".street").text(data[index]["Rue"]);
    $(".region").text(data[index]["Région"]);
    $(".city").text(data[index]["Ville"]);
  } else {
    console.error("Index spécifié invalide.");
  }
}

var pointData = L.geoJSON(pointJson, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(`<b>Name: </b>` + feature.properties.name);
    layer.on("click", function () {
      console.log("Index du point:", feature.properties.id);
      updateSidebar(pointData, feature.properties.id - 1);
    });
  },
  style: {
    fillColor: "#fff",
    fillOpacity: 0.8,
    color: "#fff",
  },
}).addTo(map);

var polygonData = L.geoJSON(polygonJson, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(`<b>Name: </b>` + feature.properties.name);
    layer.on("click", function () {
      console.log("Index du point:", feature.properties.id);
      updateSidebar(pointData, feature.properties.id - 1);
    });
  },
  style: {
    fillColor: "#fff",
    fillOpacity: 0.8,
    color: "#fff",
  },
}).addTo(map);

// Controls

var baseMaps = {
  // OSM: osm,
  "Google Street": googleStreets,
  Dark: dark,
  "Google Satellite": googleSat,
};

var overlayMaps = {
  Points: pointData,
  // Zones: polygonData,
  // wms: wms,
};

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// Marker Style
var greenIcon = L.icon({
  iconUrl: "leaf-green.png",
  shadowUrl: "leaf-shadow.png",

  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

// Events

// map.on("mouseover", function () {
//   console.log("your mouse is over the map");
// });

// map.on("mousemove", function (e) {
//   document.getElementsByClassName("coordinate")[0].innerHTML = "lat: " + e.latlng.lat + "lng: " + e.latlng.lng;
// console.log("lat: " + e.latlng.lat, "lng: " + e.latlng.lng);
// });
