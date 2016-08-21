<?php
	// delete chosen image

	$adImg = $_POST['adName'];
	echo unlink($adImg);

	// yup, that's it... :D

?>
