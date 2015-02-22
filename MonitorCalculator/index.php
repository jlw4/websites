<!-- By John L. Wilson -->

<!DOCTYPE html>
<html>
	<head>
		<title>Monitor Calculator</title>
		<meta charset="utf-8" />
		<script src="jquery.js"></script>
		<script src="default.js" type="text/javascript"></script>
		<link href="default.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		<header>
			<h1>Monitor Calculator</h1>
			<h2>A tool for planning your multi-monitor setup.</h2>
		</header>

		<!-- Bigger and Smaller buttons increase and decrease the size of the monitors -->
		<div id="options">
			<button id="bigger">Bigger</button>
			<button id="smaller">Smaller</button>
			<button id="addMonitor">Add Monitor</button>
			<button id="removeMonitor">Remove Monitor</button>
		</div>

		<div id="monitorArea">
			<?= addMonitors(); ?>
		</div>

	</body>

</html>

<?php

function addMonitors() { 

	for ($i = 1; $i <= 5; $i++) { ?>
		<div id="monitorBox<?= $i ?>" class="monitorBox">
			<div id="monitor<?= $i ?>" class="monitor"></div>
				Size: <input type="text" id="sizeBox<?= $i ?>" size="4ems" value="27" >

			<!-- Toggle for switching from inches to cm -->
			<div class="monitorOptions">
				<!-- 1cm = .3937 inches -->
				<label><input type="radio" name="units<?= $i ?>" value="1.0" checked >inches</label>
				<label><input type="radio" name="units<?= $i ?>" value=".3937" >cm</label>
			</div>

			<!-- Toggle for different aspect ratios.
			Notes: 16:9 theta = .5123 rad, 16:10 theta = .5586 rad, 4:3 theta = .6435 rad 
			where theta is the angle the hypotenuse makes with the bottom of the monitor -->
			<div class="monitorOptions">
				<label><input type="radio" name="aspect<?= $i ?>" value=".5123" checked >16:9</label>
				<label><input type="radio" name="aspect<?= $i ?>" value=".5586" >16:10</label>
				<label><input type="radio" name="aspect<?= $i ?>" value=".6435" >4:3</label>
			</div>

			<!-- Toggle for landscape or portrait orientation -->
			<div class="monitorOptions">
				<label><input type="radio" name="orientation<?= $i ?>" value="landscape" checked >landscape</label>
				<label><input type="radio" name="orientation<?= $i ?>" value="portrait" >portrait</label>
			</div>

			<!-- Resolution fields -->
			<div class="monitorOptions">
				Resolution: <br/>
				<input type="text" id="horRes<?= $i ?>" size="4ems" value="1920" >
				 x <input type="text" id="verRes<?= $i ?>" size="4ems" value="1080" >
			</div>

			<!-- This area is populated by default.js onload -->
			<div class="monitorOptions">Screen dimensions:</div>
			<div class="monitorOptions" id="height<?= $i ?>"></div>
			<div class="monitorOptions" id="width<?= $i ?>"></div>
			<div class="monitorOptions" >
				PPI: <span id="ppi<?= $i ?>" ></span>
			</div>
		</div> <?php 
	}
} ?>