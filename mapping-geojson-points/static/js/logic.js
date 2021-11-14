
// Define a street map tile layer
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-streets-v11",
  accessToken: API_KEY
});

// Define a dark map tile layer
let dark = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/dark-v10",
  accessToken: API_KEY
});

let baseMaps = {
  Street:  streets,
  Dark: dark
}

// Create our initial map object
// Set the longitude, latitude, starting zoom level, and map layer (streets)
var myMap = L.map("map", {
  center: [30, 30],
  zoom: 2,
  layers: [streets]
});

// Add the control that allows switching between dark and streets
L.control.layers(baseMaps).addTo(myMap);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/jhd1013/mapping-earthquakes/main/majorAirports.json";

// Define the marker for an airport
function createMarker(feature, latlng){
  // console.log(feature);
  marker = L.marker(latlng);
  // The popup binding could also be done here with L.marker(latlng).bindPopup(<popup text>)
  return marker;
}

// Add a popup to the airport marker
function addPopup(feature, layer){
  popUp = "<h3> Airport code: " + feature.properties.icao + "<hr>" + 
          "Airport name: " + feature.properties.name + "</h3>";
  layer.bindPopup(popUp);
}

// Add a GeoJSON layer with a marker and popup for each
// Feature (airport) in the data.
d3.json(airportData).then((data) => {
  L.geoJSON(data,
    { pointToLayer : createMarker,
      onEachFeature: addPopup }).addTo(myMap)
  });
