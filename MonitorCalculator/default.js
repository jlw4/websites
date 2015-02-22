/* By John L. Wilson

Notes:
	16:9 theta = .5123 rad
	16:10 theta = .5586 rad
	4:3 theta = .6435 rad

	height = size * sin (theta)
	width = size * cos (theta)

	12px = 1" (defualt)

*/


$(function() {
  
	var PPI = 12; // pixels per inch used to display on screen, NOT the ppi of the monitors
	var monitorArea = $( '#monitorArea' );
	var monitorCount = 3;
	var alertCount = 0;
	var alerts=["Five is enough!", "No, really, five is enough!", "No one needs more than five monitors.", "Keep trying!"];

	// setup click listeners and set monitors to 27"
	for (var i = 1; i <= 5; i++) {
		setupMonitor(i);
	}

	function setupMonitor(x) {
		$( "#sizeBox" + x ).keyup((function() { updateSize(x) }));
		$( "#horRes" + x ).keyup((function() { updateSize(x) }));
		$( "#verRes" + x ).keyup((function() { updateSize(x) }));
		$( "input[name=aspect" + x + "]:radio" ).click((function() { updateSize(x) }));
		$( "input[name=units" + x + "]:radio" ).click((function() { updateSize(x) }));
		$( "input[name=orientation" + x + "]:radio" ).click((function() { updateSize(x) }));
		updateSize(x);
	}

	$( "#bigger").click((function() { updatePPI("1") }));
	$( "#smaller").click((function() { updatePPI("-1") }));
	$( "#addMonitor").click((function() { addMonitor() }));
	$( "#removeMonitor").click((function() { removeMonitor() }));

	function updateSize(x) {
		// Gets some vars ready for use below
		var theta = parseFloat($( "input[name=aspect" + x + "]:radio:checked" ).val());
		var unit = parseFloat($( "input[name=units" + x + "]:radio:checked" ).val());
		var orientation = $( "input[name=orientation" + x + "]:radio:checked" ).val();
		var monitor = $( "#monitor" + x );
		var sizeBox = $( "#sizeBox" + x );
		var size = parseFloat( sizeBox.val() );

		// Calculates height in inches or cm
		var height = parseFloat( size * Math.sin(theta) );
		var width = parseFloat( size * Math.cos(theta) );
		
		// Swaps height and width if monitor is in portrait mode.
		if (orientation == "portrait") {
			var temp = width;
			width = height;
			height = temp;
		}
		
		// Shortens height and weigh to two decimals places, updates values in html
		var displayHeight = "Height: " + height.toFixed(2);
		var displayWidth = "Width: " + width.toFixed(2);
		if (unit > 0.5 ) {
			displayHeight += "\"";
			displayWidth += "\"";
		} else {
			displayHeight += "cm";
			displayWidth += "cm";
		}
		$( "#height" + x ).html( displayHeight );
		$( "#width" + x ).html( displayWidth );

		// Calculates height in pixels, updates size of monitor
		var pixHeight = PPI * height * unit;
		var pixWidth = PPI * width * unit;
		monitor.height( pixHeight + "px" );
		monitor.width( pixWidth + "px" );

		// Calculates pixels per inch and updates values in html
		// Just uses the average of the vertical and horizontal values, so it still works
		// if the aspect ratio and resolution ration do not match.
		var res = (parseInt($( "#verRes" + x ).val()) + parseInt($( "#horRes" + x ).val())) / 2;
		var displayPPI = (res / (( height + width ) / 2 )).toFixed(2);
		$( "#ppi" + x ).html( displayPPI );
	}

	function updatePPI(x) {
		PPI += parseInt(x);
		for (var i = 1; i <= 5; i++) {
			updateSize(i);
		}
	}

	function addMonitor() {
		if (monitorCount == 5) {
			alert(alerts[alertCount]);
			if (alertCount < alerts.length - 1) {
				alertCount++;
			}
		} else {
			monitorCount++;
			$( "#monitorBox" + monitorCount ).css("display", "inline-block");
		}
	}

	function removeMonitor() {
		if (monitorCount > 0) {
			$( "#monitorBox" + monitorCount ).css("display", "none");
			monitorCount--;
		}
	}

});