// init canvas
var     canvas = $( 'canvas' )
  ,       maps = $('#map_canvas')
  ,        ctx = canvas[0].getContext( '2d' ) // world
  ,       ctx2 = canvas[1].getContext( '2d' ) // fog
  ,       ctx3 = canvas[2].getContext( '2d' ) // chars
  ,      mDown = false
  ,         r1 = 20
  ,         r2 = 60
  ,    density = .4
  ,   hideFill = 'rgba( 0, 0, 0, .1 )'
  ,    overlay = 'rgba( 0, 0, 0, 1 )'
  ;

// black out the canvas
ctx.fillStyle = overlay;
ctx.fillRect( 0, 0, 1900, 800 );

// set up our "eraser"
ctx.globalCompositeOperation = 'destination-out';

maps.last()
  .on( '', function( ev, ev2 ){
    ev2 && ( ev = ev2 );

    var pX = ev.pageX
      , pY = ev.pageY
      ;

    // reveal wherever we drag
    var radGrd = ctx.createRadialGradient( pX, pY, r1, pX, pY, r2 );
    radGrd.addColorStop(       0, 'rgba( 0, 0, 0,  1 )' );
    radGrd.addColorStop( density, 'rgba( 0, 0, 0, .1 )' );
    radGrd.addColorStop(       1, 'rgba( 0, 0, 0,  0 )' );

    ctx.fillStyle = radGrd;
    ctx.fillRect( pX - r2, pY - r2, r2*2, r2*2 );

    // partially hide the entire map and re-reval where we are now
    ctx2.globalCompositeOperation = 'source-over';
    ctx2.clearRect( 0, 0, 1900, 800 );
    ctx2.fillStyle = hideFill;
    ctx2.fillRect ( 0, 0, 1900, 800 );

    var radGrd = ctx.createRadialGradient( pX, pY, r1, pX, pY, r2 );
    radGrd.addColorStop(  0, 'rgba( 0, 0, 0,  1 )' );
    radGrd.addColorStop( .8, 'rgba( 0, 0, 0, .1 )' );
    radGrd.addColorStop(  1, 'rgba( 0, 0, 0,  0 )' );

    ctx2.globalCompositeOperation = 'destination-out';
    ctx2.fillStyle = radGrd;
    ctx2.fillRect( pX - r2, pY - r2, r2*2, r2*2 );

    // hide characters except where we can see.  Can this be done in ctx2?
    ctx3.clearRect( 0, 0, 1900, 800 );

    // draw "characters"
    ctx3.globalCompositeOperation = 'source-over';
    ctx3.fillStyle = '#F00';
    for( var i=0; i<20; i++ ){
      for( var j=0; j<20; j++ ){
        ctx3.fillRect( i*100, j*100, 10, 10 );
      }
    }

    // hide characters except for in current location
    ctx3.globalCompositeOperation = 'destination-in';
    ctx3.fillStyle = radGrd;
    ctx3.fillRect( 0, 0, 1900, 800 );
  })
  .trigger( 'mousemove', {pageX: 950, pageY:200 });

// cheat codes
var keyHistory = '';
$( document.body )
    .on( 'keypress', function( ev ){
      keyHistory += String.fromCharCode( ev.keyCode ).toLowerCase();
      if( ~keyHistory.indexOf( 'blacksheepwall' ) ){
        canvas.remove();
      }
    } );
