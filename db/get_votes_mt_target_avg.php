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
	$curr_date = mysqli_real_escape_string($connection, $_GET['curr_date']);

	$date_start = date("Y-m-d", strtotime($date_start));
	$date_end = date("Y-m-d", strtotime($date_end));

	// First day of the month.
	$firstDayMonth = date('Y-m-01', strtotime($curr_date));
	// Last day of the month.
	$lastDayMonth = date('Y-m-t', strtotime($curr_date));

	// get quarter of chosen Date
	$current_month = date('m', strtotime($firstDayMonth));
	$current_year = date('Y', strtotime($firstDayMonth));

	if($current_month >= 1 && $current_month <= 3) {
		$start_quarter = date("Y-m-d", strtotime('1-January-'.$current_year));
		$end_quarter = date("Y-m-d", strtotime('1-April-'.$current_year));

	} else if($current_month >= 4 && $current_month <= 6) {
		$start_quarter = date("Y-m-d", strtotime('1-April-'.$current_year));
		$end_quarter = date("Y-m-d", strtotime('1-July-'.$current_year));

	} else if($current_month >= 7 && $current_month <= 9) {
		$start_quarter = date("Y-m-d", strtotime('1-July-'.$current_year));
		$end_quarter = date("Y-m-d", strtotime('1-October-'.$current_year));

	} else if($current_month >= 10 && $current_month <= 12) {
		$start_quarter = date("Y-m-d", strtotime('1-October-'.$current_year));
		$end_quarter = date("Y-m-d", strtotime('1-January-'.$current_year+1));
	}

	$start_year = date("Y-m-d", strtotime('1-January-'.$current_year));
	$end_year = date("Y-m-d", strtotime('31-December-'.$current_year));

	/*********************** WEEK ***********************/
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

	/*********************** MONTH ***********************/
	// avg for question one
	$query = "SELECT AVG(q_one) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $firstDayMonth ."'
				AND vote_date <= '". $lastDayMonth ."'";

	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// avg for question two
	$query = "SELECT AVG(q_two) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $firstDayMonth ."'
				AND vote_date <= '". $lastDayMonth ."'";
	
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// avg for question three
	$query = "SELECT AVG(q_three) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $firstDayMonth ."'
				AND vote_date <= '". $lastDayMonth ."'";
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// avg for question four
	$query = "SELECT AVG(q_four) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $firstDayMonth ."'
				AND vote_date <= '". $lastDayMonth ."'";
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	/*********************** QUARTER ***********************/
	// avg for question one
	$query = "SELECT AVG(q_one) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $start_quarter ."'
				AND vote_date <= '". $end_quarter ."'";

	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// avg for question two
	$query = "SELECT AVG(q_two) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $start_quarter ."'
				AND vote_date <= '". $end_quarter ."'";
	
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// avg for question three
	$query = "SELECT AVG(q_three) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $start_quarter ."'
				AND vote_date <= '". $end_quarter ."'";
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// avg for question four
	$query = "SELECT AVG(q_four) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $start_quarter ."'
				AND vote_date <= '". $end_quarter ."'";
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	/*********************** YEAR ***********************/
	// avg for question one
	$query = "SELECT AVG(q_one) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $start_year ."'
				AND vote_date <= '". $end_year ."'";

	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// avg for question two
	$query = "SELECT AVG(q_two) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $start_year ."'
				AND vote_date <= '". $end_year ."'";
	
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// avg for question three
	$query = "SELECT AVG(q_three) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $start_year ."'
				AND vote_date <= '". $end_year ."'";
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// avg for question four
	$query = "SELECT AVG(q_four) from votes
				WHERE mt_id = '". $mt_id ."'
				AND vote_date >= '". $start_year ."'
				AND vote_date <= '". $end_year ."'";
	$result = mysqli_query($connection, $query);

	array_push($rows, mysqli_fetch_row($result));

	// final output:
	print ( json_encode( $rows ) );

	mysqli_close($connection);
?>
