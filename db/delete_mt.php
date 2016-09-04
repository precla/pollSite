<?php
	/* delete MT */
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$mt_q_id = mysqli_real_escape_string($connection, $_POST['mt_id']);

	$query = "DELETE FROM votes
			WHERE mt_id = '". $mt_q_id ."'";

    mysqli_query( $connection, $query );

    $query = "DELETE FROM mt WHERE mt_id_key = '". $mt_q_id ."'";

    echo mysqli_query( $connection, $query );

	mysqli_close( $connection );

?>
