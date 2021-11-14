
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

let earthquakes = new L.layerGroup();

let baseMaps = {
  "Satellite": satelliteStreets,
  "Streets": streets
}

let overlays = {
  "Earthquakes" : earthquakes
}

// Create our initial map object
// Set the longitude, latitude, starting zoom level, and map layer (streets)
var myMap = L.map("map", {
  center: [39.5, -98.5],
  zoom: 3,
  layers: [streets]
});

// Add the control that allows switching between dark and streets
L.control.layers(baseMaps, overlays).addTo(myMap);

// Get the past week's earthquake data from USGS
let earthquakesThisWeek = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

function epicenterMarker(feature, latlng){
  marker = L.circleMarker(latlng);
  return marker;
}

// Add a popup to the airport marker
function epicenterPopup(feature, layer){
  popUp = "<h3>Magnitude: " + feature.properties.mag + 
          "<br>Location: " + feature.properties.place + "</h3>";
  layer.bindPopup(popUp);
}

function getRadius(magnitude){
  if (magnitude === 0){
    return 1;
  }
  return magnitude * 4;
}

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
  if (magnitude > 5) {
    return "#ea2c2c";
  }
  if (magnitude > 4) {
    return "#ea822c";
  }
  if (magnitude > 3) {
    return "#ee9c00";
  }
  if (magnitude > 2) {
    return "#eecc00";
  }
  if (magnitude > 1) {
    return "#d4ee00";
  }
  return "#98ee00";
}

function epicenterStyle(feature){
  return {
    opacity: 1,
    fillOpacity: 1,
    fillColor: getColor(feature.properties.mag),
    color: "black",
    radius: getRadius(feature.properties.mag),
    stroke: true,
    weight: 0.5
  };
}

// Add a GeoJSON layer with the earthquake locations.
d3.json(earthquakesThisWeek).then((data) => {
  L.geoJSON(data, {
    pointToLayer : epicenterMarker,
    onEachFeature : epicenterPopup,
    style : epicenterStyle
  }).addTo(earthquakes);
});

// Create a legend control object.
let legend = L.control({
  position: "bottomright"
});

// Then add all the details for the legend.
legend.onAdd = function() {
  // Create a new div in the HTML for the legend
  let div = L.DomUtil.create("div", "info legend");
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = [
    "#98ee00",
    "#d4ee00",
    "#eecc00",
    "#ee9c00",
    "#ea822c",
    "#ea2c2c"
  ];
  for (var i = 0; i < magnitudes.length; i++) {
    console.log(colors[i]);
    div.innerHTML +=
      "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
  }
  return div;
};

legend.addTo(myMap);

// Turn on earthquakes layer by default
earthquakes.addTo(myMap);
