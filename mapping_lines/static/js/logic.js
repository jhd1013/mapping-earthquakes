// Line from LAX to SFO
let line = [
  [37.6213, -122.3790], // SFO
  [30.1899,  -97.6686], // AUS
  [41.8846,  -91.7108], // CID
  [40.6397,  -73.7789]  // JFK
];

// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map", {
    center: [37.6213, -122.3790],
    zoom: 5
});

// Add a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/satellite-streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Draw the LAX to SFO line on the map
L.polyline(line, {
  color: "DeepSkyBlue",
  dashArray: "20 10"  // 20 => length of dash, 10 => length of space
}).addTo(myMap);
