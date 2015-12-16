var previousPosition = null;
var L;
var $hello = $('#hello');
var coordinates = null;

localforage.getItem('coordinates', function(err, value) {

    if (value!= null) {
        coordinates = value;
    } else {
        coordinates = [
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
            },
            {
                "lat" : "48.857063",
                "long" : "2.373974"},
            {
                "lat" : "48.855746",
                "long" : "2.373153"},
        ]

        localforage.setItem('coordinates', coordinates, function(err, value) {
            console.log(value);
        });
    }
});


var map = {
    map     : null,
    watchId : null,
    overlay : null,
    fog     : null,

    init : function() {
        map.setMap();
        map.setFog();
        map.setWatchId();
    },

    setFog : function() {
        map.fog = new google.maps.Rectangle({
            map           : map.map,
            fillColor     : '#000000',
            fillOpacity   : 0.35,
            strokeOpacity : 0,
            bounds        : {
                north : 50.998656,
                south : 42.227020,
                east  : 9.078225,
                west  : -4.369041
            },
            zIndex: 0
        });
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

            coordinates.forEach(function(coordinate) {
                var newLine = new google.maps.LatLng((parseFloat(coordinate.lat) + 0.0001), (parseFloat(coordinate.long) + 0.0001));
                newLineCoordinates.unshift(newLine);
            });

            // for(var i = (coordinates.length - 1); i >= 0; i--) {
            //     var coordinate = coordinates[i];
            //     var lat = coordinate.lat  - (0.02 / 6378) * (180 / Math.PI);
            //     var long = coordinate.long  - (0.02 / 6378) * (180 / Math.PI);
            //     var newLine = new google.maps.LatLng(lat, long);
            //     newLineCoordinates.push(newLine);
            //
            //     //if(i === 0) {
            //     //   var newLine = new google.maps.LatLng(coordinate.lat, coordinate.long);
            //     //   newLineCoordinates.push(newLine);
            //     //}
            // }
            //console.log(newLineCoordinates);
            var polygon = new google.maps.Polygon({
                paths : newLineCoordinates,
                // paths: [
                //     new google.maps.LatLng(48.856807, 2.373173),
                //     new google.maps.LatLng(48.856461, 2.373463),
                //     new google.maps.LatLng(48.856887, 2.373153),
                //     new google.maps.LatLng(48.856887, 2.373123)
                // ],
                strokeOpacity: 1,
                strokeWeight: 1,
                fillColor: '#0000FF',
                fillOpacity: .5,
                //map: map.map,
                zIndex: 1
            });
            // var newLine = new google.maps.Polyline({
            //    path: newLineCoordinates,
            //    strokeColor: "#FF0000",
            //    strokeOpacity: 0.6,
            //    strokeWeight: 10
            // });

//            polygon.setMap(map.map);
            map.drawFog(polygon);

        }

        previousPosition = position;
    },

    drawFog : function(polygon) {
        // Get rectangle points coordinates (path)
        //console.log(polygon.getPath());
        var rb = map.fog.getBounds();
        var rectangleCoords = [
            new google.maps.LatLng(rb.getNorthEast().lat(), rb.getSouthWest().lng()),
            new google.maps.LatLng(rb.getNorthEast().lat(), rb.getNorthEast().lng()),
            new google.maps.LatLng(rb.getSouthWest().lat(), rb.getNorthEast().lng()),
            new google.maps.LatLng(rb.getSouthWest().lat(), rb.getSouthWest().lng()),
            new google.maps.LatLng(rb.getNorthEast().lat(), rb.getSouthWest().lng())
        ];

        var polygon = new google.maps.Polygon({
            paths: [rectangleCoords, polygon.getPath()],
            strokeOpacity: 0,
            strokeWeight: 0,
            fillColor: '#000000',
            fillOpacity: .6,
            map: map.map
        });
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
