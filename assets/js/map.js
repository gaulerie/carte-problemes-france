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

// Mettre ci-dessous la map qu'on veut par défaut
googleStreets.addTo(map);

// var wms = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
//   layers: "geoapp:admin",
//   format: "image/png",
//   transparent: true,
//   attribution: "wms test",
// });

// GeoJSON

var pointData = L.geoJSON(pointJson, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(`<b>Name: </b>` + feature.properties.name);
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
  Zones: polygonData,
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
