var map = L.map("map", {
  center: [47, 5],
  zoom: 6,
  zoomAnimation: true,
  fadeAnimation: true,
  markerZoomAnimation: true,
  zoomAnimationThreshold: true,
  animate: true,
  // renderer: L.canvas(),
});

// Fonction pour créer une info-bulle pour les marqueurs
function createMarkerTooltip(marker, title) {
  if (map.getZoom() > 7) {
    var tooltip = L.tooltip({
      direction: "right",
      permanent: true,
      className: "marker-tooltip",
    }).setContent(title);

    marker.bindTooltip(tooltip).openTooltip();
  }
}

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
  features: [],
};

// Marker Cluster Group

var markers = L.markerClusterGroup({
  disableClusteringAtZoom: 8,
  iconCreateFunction: function (cluster) {
    var count = cluster.getChildCount();
    var size = count < 100 ? "small" : count < 1000 ? "medium" : "large";
    var color = count < 10 ? "green" : count < 100 ? "yellow" : count < 1000 ? "orange" : "red";
    return L.divIcon({
      html: "<div numberColor=" + color + ' class="circle-marker">' + count + "</div>",
      className: "cluster-icon-" + size,
      iconSize: [30, 30],
    });
  },
  showCoverageOnHover: false,
});

var globalData;

fetch("https://script.google.com/macros/s/AKfycbwxZW1jhoQzz4iKDaPloHcdsF3sXRWDHKizeCq_uQiCFi2-1FUEr_hPqCBY8Ub3atlO/exec")
  .then((response) => {
    if (!response.ok) {
      throw new Error("La requête a échoué avec le statut " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    globalData = data; // Stocker les données globalement

    // Ajouter des marqueurs à la Marker Cluster Group
    data.forEach((line, index) => {
      var latitude = parseFloat(line["Latitude"]);
      var longitude = parseFloat(line["Longitude"]);
      // var title = line["Title"]; // Récupérer le titre du marqueur
      if (!isNaN(latitude) && !isNaN(longitude)) {
        var iconUrl = "";
        var type = line["Type"]; // Récupérer le type depuis la colonne "Type"
        if (type === "Antifasciste") {
          iconUrl = "assets/img/togo.png";
        } else if (type === "OQTF") {
          iconUrl = "assets/img/hearth.png";
        } else if (type === "Islamiste") {
          iconUrl = "assets/img/star.png";
        } else if (type === "Violeur") {
          iconUrl = "assets/img/danger.png";
        } else {
          iconUrl = "assets/img/danger.png";
        }
        var customIcon = L.icon({
          iconUrl: iconUrl,
          iconSize: [20, 20], // Taille de l'icône
          iconAnchor: [10, 10], // Point d'ancrage de l'icône
        });
        var marker = L.marker([latitude, longitude], { id: index, icon: customIcon }); // Utiliser l'icône personnalisée
        // marker.bindTooltip(title, { permanent: false, direction: "right", offset: [20, 0] }); // Ajouter l'infobulle avec le titre du marqueur
        markers.addLayer(marker);
      }
    });

    map.addLayer(markers);
    updateMarkerText(); // Initialiser l'affichage du texte
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des données :", error);
  });

map.on("zoomend", function () {
  updateMarkerText();
});

function updateMarkerText() {
  if (map.getZoom() > 11) {
    markers.eachLayer(function (layer) {
      var title = globalData[layer.options.id]["Title"]; // Récupérer le titre du marqueur
      if (!layer.getTooltip()) {
        layer.bindTooltip(title, { permanent: true, direction: "right", offset: [20, 0] });
      }
      layer.openTooltip();
    });
  } else {
    markers.eachLayer(function (layer) {
      layer.unbindTooltip();
    });
  }
}

markers.on("click", function (event) {
  var layer = event.layer;
  var id = layer.options.id; // Récupérer l'ID unique du marqueur
  var properties = findPropertiesByIndex(id, globalData); // Trouver les propriétés associées à l'index
  updateSidebar(properties, id); // Passez l'index en tant que deuxième argument
  $("#sidebar").addClass("displayed");
  // $(".leaflet-control-zoom").addClass("swiped");
});

function findPropertiesByIndex(index, data) {
  return data[index] ? data[index] : null;
}

function updateSidebar(data, index) {
  if (data && index >= 0 && index < globalData.length) {
    $(".surname").text(data["Nom"]);
    $(".name").text(data["Prénom"]);
    $(".birthdate").text(data["Date de Naissance"]);
    $(".countryEntranceDate").text(data["Date d'entrée en France"]);
    $(".nationalities").text(data["Nationalités"]);
    $(".ethnicities").text(data["Ethnicités"]);

    for (let i = 0; i < 3; i++) {
      $(".actDate")
        .eq(i)
        .text(data["Acte " + (i + 1) + " - Date"]);
      $(".actTitle")
        .eq(i)
        .text(data["Acte " + (i + 1) + " - Titre"]);
      $(".actDescription")
        .eq(i)
        .text(data["Acte " + (i + 1) + " - Description"]);
    }

    $(".street").text(data["Rue"]);
    $(".latitude").text(data["Latitude"]);
    $(".longitude").text(data["Longitude"]);
    $(".personType").text(data["Type"]);
    // $(".region").text(data["Région"]);
    $(".city").text(data["Ville"]);
    // $(".sidebarimg").css((background = "url(" + data[index]["Image"] + ");");
    $(".sidebarimg").css("background-image", "url(" + data["Image"] + ")");
  } else {
    console.error("Index spécifié invalide. Index:", index);
  }
}

// Controls

var baseMaps = {
  // OSM: osm,
  "Google Street": googleStreets,
  Dark: dark,
  "Google Satellite": googleSat,
};

var overlayMaps = {
  Markers: markers,
  // Points: pointData,
  // Zones: polygonData,
  // wms: wms,
};

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

// Events

// map.on("mouseover", function () {
//   console.log("your mouse is over the map");
// });

// map.on("mousemove", function (e) {
//   document.getElementsByClassName("coordinate")[0].innerHTML = "lat: " + e.latlng.lat + "lng: " + e.latlng.lng;
// console.log("lat: " + e.latlng.lat, "lng: " + e.latlng.lng);
// });

// Événement de carte pour mettre à jour les marqueurs visibles
map.on("moveend", function () {
  markers.refreshClusters();
});
