var fog = {

    init : function() {
        fog.initVariables();

        console.log(fog);
    },

    setUp : function() {
        // Remplis le canvas
        fog.ctx.fillStyle = fog.overlay;
        fog.ctx.fillRect( 0, 0, fog.canvas[0].width, fog.canvas[0].height );

        //fog.ctx.globalCompositeOperation = 'destination-out';
    },

    draw : function(points) {
        fog.setUp();
        console.log(points);
        // reveal wherever we drag
        points.forEach(function(point, k) {
            var i = k + 1;
            var nextPoint = points[i];

            if(point.x > 0 && point.y > 0 && nextPoint) {
                fog.ctx.beginPath();
                fog.ctx.strokeStyle = '#FFFFFF';
                fog.ctx.lineWidth = 30;
                fog.ctx.moveTo(point.x, point.y);
                fog.ctx.lineTo(nextPoint.x, nextPoint.y);
                fog.ctx.stroke();
                fog.ctx.closePath();
            }
        });
    },

    initVariables : function() {
        fog.canvas   = $('canvas');
        fog.maps     = $('#map_canvas');
        fog.ctx      = fog.canvas[0].getContext( '2d' ); // world
        fog.ctx2     = fog.canvas[1].getContext( '2d' ); // fog
        fog.ctx3     = fog.canvas[2].getContext( '2d' ); // chars
        fog.r1       = 20;
        fog.r2       = 60;
        fog.density  = .4;
        fog.hideFill = 'rgba( 0, 0, 0, .1 )';
        fog.overlay  = 'rgba( 0, 0, 0, 1 )';
    }
}

$(function() {
    fog.init();
});
