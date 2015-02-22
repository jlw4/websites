<?php

include("common.php");

top();

?>

<script src="js/lightbox.js"></script>
<link href="css/lightbox.css" rel="stylesheet" />

</head> <?php

body();

?>
	<div id="page">
		<div id="content">
			<div id="box1">
				<h2>Welcome to Wilsonbuilt Construction</h2>
				<!-- Gallery -->
				<div id="galleryBox">
					<?php 
						$alt = array("Shop", "Custom Home", "Pole Barn", "Rehabilitated Barn", "Deck", "Pole Barn", "Pole Barn", "Garage Addition with Log Siding", "Hay Shed", "Horse Barn", 
									 "Horse Shelter", "Monitor Style Barn", "Open Shop", "Pole Barn", "Horse Barn", "Shop", "Pole Barn", "Pole Barn", "Pole Barn", "Pole Barn",
									 "Pole Barn", "Pole Barn", "Pole Barn", "Pole Barn", "Pole Barn", "Pole Barn", "Pole Barn");
						for ($i = 0; $i < count($alt); $i++) {
							# $alt[$i] = rawurlencode($alt[$i]);
							?><a href="images/gallery/building<?= $i + 1 ?>.jpg" class="galleryImage" rel="lightbox" title= "<?= $alt[$i] ?>" ><img src="images/thumbnails/building<?= $i + 1 ?>.JPG" width="140" alt= "<?= $alt[$i] ?>" /></a><?php
						} ?>
				</div>
			</div>
		</div>
	</div>
<?php

bottom();

?>
