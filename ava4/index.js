$( function() {

	var welcome = $( "#welcome" );
	welcome.delay( 500 ).fadeIn( 800 ).delay( 2000 ).fadeOut( 800 )
	setTimeout(function(){ window.location = "start.php"; }, 4000);


});