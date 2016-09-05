<?php
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		//echo "Failed to connect to MySQL: " . mysqli_connect_error();
		echo "Failed to connect to MySQL";
		exit();
	}

	$mt_id = mysqli_real_escape_string($connection, $_POST['mt_id']);
	$q_one = mysqli_real_escape_string($connection, $_POST['q_one']);
	$q_two = mysqli_real_escape_string($connection, $_POST['q_two']);
	$q_three = mysqli_real_escape_string($connection, $_POST['q_three']);
	$q_four = mysqli_real_escape_string($connection, $_POST['q_four']);

	$query = "INSERT INTO target_mt (mt_id, q_one, q_two, q_three, q_four)
				VALUES ( '$mt_id', '$q_one', '$q_two', '$q_three', '$q_four' )
                ON DUPLICATE KEY UPDATE
                q_one = '$q_one', q_one = '$q_two', q_three = '$q_three', q_four = '$q_four'";
	
	echo mysqli_query($connection, $query);

	mysqli_close($connection);
?>
