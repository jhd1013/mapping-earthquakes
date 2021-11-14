
// Define a satellite streets map tile layer
let satelliteStreets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  id: "mapbox/satellite-streets-v11",
  accessToken: API_KEY
});

// Define a streets map tile layer
let streets = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  maxZoom: 18,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});

let baseMaps = {
  "Satellite": satelliteStreets,
  "Streets": streets
}

// Create our initial map object
// Set the longitude, latitude, starting zoom level, and map layer (streets)
var myMap = L.map("map", {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Add the control that allows switching between dark and streets
L.control.layers(baseMaps).addTo(myMap);

// Get the past week's earthquake data from USGS
let earthquakesThisWeek = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Add a GeoJSON layer with the earthquake locations.
d3.json(earthquakesThisWeek).then((data) => {
  L.geoJSON(data).addTo(myMap)
});
