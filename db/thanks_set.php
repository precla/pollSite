<?php
	/* Set thanks text for MT */
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$mt_t_id = mysqli_real_escape_string($connection, $_POST['mt_id']);
	$t_text = mysqli_real_escape_string($connection, $_POST['custom_thanks_text']);

	$query = "UPDATE mt SET custom_thanks_text = '". $t_text ."'
			WHERE mt_id_key = '". $mt_t_id ."'";

	echo mysqli_query( $connection, $query );

	mysqli_close( $connection );

?>
