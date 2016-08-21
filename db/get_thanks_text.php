<?php
	/* Get cutom thanks message for MT */
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$mt_id = mysqli_real_escape_string($connection, $_POST['mt_id']);

	$query = "SELECT custom_thanks_text from mt WHERE mt_id_key = ". $mt_id;

	$qtxt = mysqli_query($connection, $query);
	$qtxt = mysqli_fetch_row($qtxt);

	print( $qtxt[0] );

	mysqli_close( $connection );

?>
