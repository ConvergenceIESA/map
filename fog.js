var fog = {

    init : function() {
        fog.initVariables();

        console.log(fog.maps);
    },

    initVariables : function() {
        var canvas   = $('canvas');
        fog.maps     = $('#map_canvas');
        fog.ctx      = canvas[0].getContext( '2d' ); // world
        fog.ctx2     = canvas[1].getContext( '2d' ); // fog
        fog.ctx3     = canvas[2].getContext( '2d' ); // chars
        fog.r1       = 20;
        fog.r2       = 60;
        fog.density  = .4;
        fog.hideFill = 'rgba( 0, 0, 0, .1 )';
        fog.overlay  = 'rgba( 0, 0, 0, 1 )';
    }
}
