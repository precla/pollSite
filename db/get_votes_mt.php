<?php
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$mt_id = mysqli_real_escape_string($connection, $_POST['mt_id']);
	$date = mysqli_real_escape_string($connection, $_POST['date']);

	$date = date("Y-m-d", strtotime($date));

	$query = "SELECT * from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date = '". $date ."'";
	
	$result = mysqli_query($connection, $query);
	$rows = array();

	while ( $row = mysqli_fetch_row($result) ) {
		$rows[] = $row;
	}

	print ( json_encode( $rows ) );

	mysqli_close($connection);
?>
