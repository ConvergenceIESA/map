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

var map = {
    map     : null,
    watchId : null,
    overlay : null,
    points  : [],

    init : function() {
        map.setMap();
        map.setOverlay();
        map.setWatchId();
    },

    setOverlay : function() {
        map.overlay      = new google.maps.OverlayView();
        map.overlay.draw = function() {};
        map.overlay.setMap(map.map);
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
                map.points.push(newLine);
            });

            var newLine = new google.maps.Polyline({
                path: newLineCoordinates,
                strokeColor: "#FF0000",
                strokeOpacity: 0.6,
                strokeWeight: 10
            });

            newLine.setMap(map.map);

            map.points.forEach(function(_point, k) {
                var point = map.overlay.getProjection().fromLatLngToDivPixel(_point);
                map.points[k] = point;
            })

            console.log(map.points);
            var t = map.overlay.getProjection().fromLatLngToDivPixel(newLineCoordinates[0]);
            $hello.css({top : t.y, left : t.x});
        }

        previousPosition = position;
    },

    getLatlngToPoint : function(map, latlng, z) {
        var normalizedPoint = map.getProjection().fromLatLngToPoint(latlng); // returns x,y normalized to 0~255
        var scale = Math.pow(2, z);
        var pixelCoordinate = new google.maps.Point(normalizedPoint.x * scale, normalizedPoint.y * scale);

        //console.log('Position: ' + pixelCoordinate.x + "; " + pixelCoordinate.y);
        return pixelCoordinate;
    }
}

$(function() {
    map.init();
});
