
// Define a street map tile layer
let satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-streets-v11",
  accessToken: API_KEY
});

// Define a dark map tile layer
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

let baseMaps = {
  "Satellite Streets": satelliteStreets,
  "Streets": streets
}

// Create our initial map object
// Set the longitude, latitude, starting zoom level, and map layer (streets)
var myMap = L.map("map", {
  center: [43.7, -79.3],
  zoom: 11,
  layers: [satelliteStreets]
});

// Add the control that allows switching between dark and streets
L.control.layers(baseMaps).addTo(myMap);

// Get the Toronto neighborhood data
let torontoHoods = "https://raw.githubusercontent.com/jhd1013/mapping-earthquakes/main/torontoNeighborhoods.json";

// Add a popup to the neighborhood polygon
function addHoodPopup(feature, layer){
  popUp = "<h3> Neighborhood: " + feature.properties.AREA_NAME + "</h3>";
  layer.bindPopup(popUp);
}

let lineStyle = {
  color : "blue",
  weight: 1
};

// Add a GeoJSON layer with the Toronto routes.
d3.json(torontoHoods).then((data) => {
  L.geoJSON(data,
    { 
      onEachFeature : addHoodPopup,
      style: lineStyle
    }).addTo(myMap)
  });
