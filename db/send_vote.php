<?php
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		//echo "Failed to connect to MySQL: " . mysqli_connect_error();
		echo "Failed to connect to MySQL";
		exit();
	}

	$mt_id = mysqli_real_escape_string($connection, $_POST['mt_id']);
	$q_one = mysqli_real_escape_string($connection, $_POST['question_one']);
	$q_two = mysqli_real_escape_string($connection, $_POST['question_two']);
	$q_three = mysqli_real_escape_string($connection, $_POST['question_three']);
	$q_four = mysqli_real_escape_string($connection, $_POST['question_four']);
	$c_q_txt = mysqli_real_escape_string($connection, $_POST['custom_q_txt']);

	$today = date("Y-m-d");
	$time = date("H:i:s");;

	$query = "INSERT INTO votes (mt_id, q_one, q_two, q_three, q_four, vote_date, vote_time, custom_q_txt)
				VALUES ( '$mt_id', '$q_one', '$q_two', '$q_three', '$q_four', '$today', '$time', '$c_q_txt' )";
	
	echo mysqli_query($connection, $query);

	mysqli_close($connection);
?>
