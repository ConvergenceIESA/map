var previousPosition = null;
var L;
var $hello = $('#hello');

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
localforage.setItem('coordinates', coordinates, function(err, value) {
    console.log(value);
});

var map = {
    map     : null,
    watchId : null,
    overlay : null,
    points  : [],
    position : null,

    init : function() {
        map.setMap();
        map.setOverlay();
        map.setWatchId();

        map.map.addListener('dragend', function() {
            map.updateCoordinate();
        });
    },

    setOverlay : function() {
        map.overlay      = new google.maps.OverlayView();
        map.overlay.draw = function() {};
        map.overlay.setMap(map.map);
    },

    setMap : function() {
        map.map = new google.maps.Map(document.getElementById("map_canvas"), {
            zoom: 19,
            //center: new google.maps.LatLng(48.8098683, 2.2983893000000535),
            //mapTypeId: google.maps.LatLng(48.8098683, 2.2983893000000535)
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

        if(position) {
            map.map.panTo(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
        }

        if (!previousPosition) {
            map.updateCoordinate();
        }
    },

    updateCoordinate : function() {
        map.points = [];
        map.setOverlay();

        coordinates.forEach(function(coordinate) {
            var newLine = new google.maps.LatLng(coordinate.lat, coordinate.long);
            map.points.push(newLine);
        });

        map.points.forEach(function(_point, k) {
            var point = map.overlay.getProjection().fromLatLngToDivPixel(_point);
            map.points[k] = point;
        })

        console.log(map.points);
        fog.draw(map.points);
    }
}

$(function() {
    map.init();
});
