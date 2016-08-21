<?php
	// get a list of all images in /ads/ folder

	$directory = "./";
	$images = glob($directory . "*.jpg");

	$adList = array();

	foreach($images as $image) {
		array_push ($adList, $image);
	}

	$images = glob($directory . "*.jpeg");

	foreach($images as $image) {
		array_push ($adList, $image);
	}

	$images = glob($directory . "*.png");

	foreach($images as $image) {
		array_push ($adList, $image);
	}

	echo json_encode($adList);

?>
