<!-- By John L. Wilson -->

<!DOCTYPE html>
<html>
	<head>
		<title>a gallery</title>
		<meta charset="utf-8" />
		<script src="jquery.js"></script>
		<script src="gallery.js" type="text/javascript"></script>
		<link href="gallery.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		<h1>A Gallery</h1>

		<h2>Here we have a scrolling gallery on both sides of a stationary image</h2>

		<div id="slideshow1">
			<?php for ($i = 1; $i <= 3; $i++) { ?>
				<div><img src="/gallery/<?= $i ?>.jpg"></div>
			<?php } ?>
		</div>
		
		<div id="stationary"><img src="/gallery/7.jpg"></div>

		<div id="slideshow2">
			<?php for ($i = 4; $i <= 6; $i++) { ?>
				<div><img src="/gallery/<?= $i ?>.jpg"></div>
			<?php } ?>
		</div>
	</body>

</html>			