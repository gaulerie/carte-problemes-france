// Map initialization
// var map = L.map("map").setView([28.3949, 84.124], 8);
var map = L.map("map").setView([47, 5], 6);

/*==============================================
               TILE LAYER and WMS
   ================================================*/
//osm layer
// var osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// });
// osm.addTo(map);
// map.addLayer(osm)

// dark map
var dark = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  subdomains: "abcd",
  maxZoom: 20,
});
// dark.addTo(map)

// google street
googleStreets = L.tileLayer("http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});
googleStreets.addTo(map);

//google satellite
googleSat = L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
  maxZoom: 20,
  subdomains: ["mt0", "mt1", "mt2", "mt3"],
});
// googleSat.addTo(map)

var wms = L.tileLayer.wms("http://localhost:8080/geoserver/wms", {
  layers: "geoapp:admin",
  format: "image/png",
  transparent: true,
  attribution: "wms test",
});

/*==============================================
                       MARKER
   ================================================*/
var myIcon = L.icon({
  iconUrl: "img/red_marker.png",
  iconSize: [40, 40],
});
var singleMarker = L.marker([45.764, 4.8357], { icon: myIcon, draggable: true });

var popup = singleMarker.bindPopup("This is EVROPA babe. " + singleMarker.getLatLng()).openPopup();
popup.addTo(map);

var secondMarker = L.marker([48.8566, 2.3522], { icon: myIcon, draggable: true });

var popup2 = secondMarker.bindPopup("This is EVROPA babe 2. " + singleMarker.getLatLng()).openPopup();
popup2.addTo(map);

console.log(singleMarker.toGeoJSON());

/*==============================================
               GEOJSON
   ================================================*/
var pointData = L.geoJSON(pointJson).addTo(map);
var polygonData = L.geoJSON(polygonJson, {
  onEachFeature: function (feature, layer) {
    layer.bindPopup(`<b>Name: </b>` + feature.properties.name);
  },
  style: {
    fillColor: "#ffffff80",
    fillOpacity: 1,
    color: "#fff",
  },
}).addTo(map);

/*==============================================
                   LAYER CONTROL
   ================================================*/
var baseMaps = {
  // OSM: osm,
  "Google Street": googleStreets,
  Dark: dark,
  "Google Satellite": googleSat,
};

var overlayMaps = {
  "First Marker": singleMarker,
  "Second Marker": secondMarker,
  "Point Data": pointData,
  "Polygon Data": polygonData,
  wms: wms,
};
// map.removeLayer(singleMarker)

L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);

/*==============================================
                   LEAFLET EVENTS
   ================================================*/
map.on("mouseover", function () {
  console.log("your mouse is over the map");
});

map.on("mousemove", function (e) {
  document.getElementsByClassName("coordinate")[0].innerHTML = "lat: " + e.latlng.lat + "lng: " + e.latlng.lng;
  console.log("lat: " + e.latlng.lat, "lng: " + e.latlng.lng);
});

/*==============================================
                   STYLE CUSTOMIZATION
   ================================================*/
