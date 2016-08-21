<?php
	// get a list of all images in /ads/ folder

	$directory = "./";
	$images = glob($directory . "*.jpg");

	foreach($images as $image) {
		printf("<option value='%s'>%s</option>", $image, substr($image, 2) );
	}

	$images = glob($directory . "*.jpeg");

	foreach($images as $image) {
		printf("<option value='%s'>%s</option>", $image, substr($image, 2) );
	}

	$images = glob($directory . "*.png");

	foreach($images as $image) {
		printf("<option value='%s'>%s</option>", $image, substr($image, 2) );
	}
?>
