<?php
	/* Set question for MT */
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$mt_q_id = mysqli_real_escape_string($connection, $_POST['mt_id']);
	$q_text = mysqli_real_escape_string($connection, $_POST['question_text']);

	$query = "UPDATE mt SET custom_q_text = '". $q_text ."'
			WHERE mt_id_key = '". $mt_q_id ."'";

	echo mysqli_query( $connection, $query );

	mysqli_close( $connection );

?>
