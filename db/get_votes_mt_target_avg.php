<?php
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$mt_id = mysqli_real_escape_string($connection, $_GET['mt_id']);
	$date_start = mysqli_real_escape_string($connection, $_GET['date_start']);
	$date_end = mysqli_real_escape_string($connection, $_GET['date_end']);

	$date_start = date("Y-m-d", strtotime($date_start));
	$date_end = date("Y-m-d", strtotime($date_end));

	// WEEK
	// avg for question one
	$query = "SELECT AVG(q_one) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $date_start ."'
				AND vote_date <= '". $date_end ."'";

	$result = mysqli_query($connection, $query);
	$rows = array();

	array_push($rows, mysqli_fetch_row($result));

	// avg for question two
	$query = "SELECT AVG(q_two) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $date_start ."'
				AND vote_date <= '". $date_end ."'";
	
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// avg for question three
	$query = "SELECT AVG(q_three) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $date_start ."'
				AND vote_date <= '". $date_end ."'";
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// avg for question four
	$query = "SELECT AVG(q_four) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $date_start ."'
				AND vote_date <= '". $date_end ."'";
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));
	
	// MONTH

	// QUARTER

	// YEAR
	print ( json_encode( $rows ) );

	mysqli_close($connection);
?>
