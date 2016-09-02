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
	$rows = array();

	for( $i = 1; $i < 6; $i++ ){
		$query = "SELECT COUNT( q_one ) FROM votes WHERE ("
			. "mt_id = ". $mt_id ." AND vote_date = '". $date ."') "
			. "AND ( q_one = ". $i ." OR q_two = ". $i ." OR q_three = ". $i ." OR q_four = ". $i ." )";

		$result = mysqli_query($connection, $query);
		array_push($rows, mysqli_fetch_row($result));
	}

	print ( json_encode( $rows ) );

	mysqli_close($connection);
?>
