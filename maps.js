var previousPosition = null;

var coordinates = [
    {
      "lat": "48.856807",
      "long": "2.373173"
    },
    {
      "lat": "48.856461",
      "long": "2.373463"
    },
    {
      "lat": "48.858705",
      "long": "2.378644"
    },
    {
      "lat": "48.857871",
      "long": "2.380043"
    },
    {
      "lat": "48.848733",
      "long": "2.395296"
    }
]

var map = {
    map : null,
    watchId : null,

    init : function() {
        map.setMap();
        map.setWatchId();
    },

    setMap : function() {
        map.map = new google.maps.Map(document.getElementById("map_canvas"), {
            zoom: 19,
            center: new google.maps.LatLng(48.8098683, 2.2983893000000535),
            mapTypeId: google.maps.LatLng(48.8098683, 2.2983893000000535)
        });
    },

    setWatchId : function() {
        if (navigator.geolocation) {
            map.watchId = navigator.geolocation.watchPosition(map.updatePosition, null, {enableHighAccuracy : true});
        }
        else {
            alert("Votre navigateur ne prend pas en compte la géolocalisation HTML5");
        }
    },

    updatePosition : function(position) {

        map.map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));

        if (!previousPosition) {

            var newLineCoordinates = [];
            coordinates.forEach(function(coordinate) {
                var newLine = new google.maps.LatLng(coordinate.lat, coordinate.long);
                newLineCoordinates.push(newLine);
            });

            var newLine = new google.maps.Polyline({
                path: newLineCoordinates,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 10
            });

            newLine.setMap(map.map);
            console.log(newLine.getPoints());
        }

        previousPosition = position;
    }
};

$(function() {
    map.init();
});
