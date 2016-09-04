<?php
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$mt_id = mysqli_real_escape_string($connection, $_GET['mt_id']);
	$date = mysqli_real_escape_string($connection, $_GET['date']);

	$date = date("Y-m-d", strtotime($date));
	$rows = array(0, 0, 0, 0, 0);

	for( $j = 0, $i = 1; $i < 6; $i++, $j++){
		$queryOne = "SELECT COUNT( * ) FROM votes WHERE "
			. "mt_id = ". $mt_id ." AND vote_date = '". $date ."' "
			. "AND q_one = ". $i;

		$result = mysqli_query($connection, $queryOne);
		$row = mysqli_fetch_row($result);
		$rows[$j] += $row[0];

		$queryTwo = "SELECT COUNT( * ) FROM votes WHERE "
			. "mt_id = ". $mt_id ." AND vote_date = '". $date ."' "
			. "AND q_two = ". $i;

		$result = mysqli_query($connection, $queryTwo);
		$row = mysqli_fetch_row($result);
		$rows[$j] += $row[0];

		$queryThree = "SELECT COUNT( * ) FROM votes WHERE "
			. "mt_id = ". $mt_id ." AND vote_date = '". $date ."' "
			. "AND q_three = ". $i;

		$result = mysqli_query($connection, $queryThree);
		$row = mysqli_fetch_row($result);
		$rows[$j] += $row[0];

		$queryFour = "SELECT COUNT( * ) FROM votes WHERE "
			. "mt_id = ". $mt_id ." AND vote_date = '". $date ."' "
			. "AND q_four = ". $i;

		$result = mysqli_query($connection, $queryFour);
		$row = mysqli_fetch_row($result);
		$rows[$j] += $row[0];
	}

	print ( json_encode( $rows ) );

	mysqli_close($connection);
?>
