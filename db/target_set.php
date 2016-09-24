<?php
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		//echo "Failed to connect to MySQL: " . mysqli_connect_error();
		echo "Failed to connect to MySQL";
		exit();
	}

	$mt_id = mysqli_real_escape_string($connection, $_POST['mt_id']);

	// week
	$q_one_w = mysqli_real_escape_string($connection, $_POST['q_one_w']);
	$q_two_w = mysqli_real_escape_string($connection, $_POST['q_two_w']);
	$q_three_w = mysqli_real_escape_string($connection, $_POST['q_three_w']);
	$q_four_w = mysqli_real_escape_string($connection, $_POST['q_four_w']);

	// month
	$q_one_m = mysqli_real_escape_string($connection, $_POST['q_one_m']);
	$q_two_m = mysqli_real_escape_string($connection, $_POST['q_two_m']);
	$q_three_m = mysqli_real_escape_string($connection, $_POST['q_three_m']);
	$q_four_m = mysqli_real_escape_string($connection, $_POST['q_four_m']);

	// quarter
	$q_one_q = mysqli_real_escape_string($connection, $_POST['q_one_q']);
	$q_two_q = mysqli_real_escape_string($connection, $_POST['q_two_q']);
	$q_three_q = mysqli_real_escape_string($connection, $_POST['q_three_q']);
	$q_four_q = mysqli_real_escape_string($connection, $_POST['q_four_q']);

	// year
	$q_one_y = mysqli_real_escape_string($connection, $_POST['q_one_y']);
	$q_two_y = mysqli_real_escape_string($connection, $_POST['q_two_y']);
	$q_three_y = mysqli_real_escape_string($connection, $_POST['q_three_y']);
	$q_four_y = mysqli_real_escape_string($connection, $_POST['q_four_y']);


	$query = "INSERT INTO target_mt (mt_id, q_one_w, q_two_w, q_three_w, q_four_w,
											q_one_m, q_two_m, q_three_m, q_four_m,
											q_one_q, q_two_q, q_three_q, q_four_q,
											q_one_y, q_two_y, q_three_y, q_four_y
									)
				VALUES ( '$mt_id', '$q_one_w', '$q_two_w', '$q_three_w', '$q_four_w',
								'$q_one_m', '$q_two_m', '$q_three_m', '$q_four_m',
								'$q_one_q', '$q_two_q', '$q_three_q', '$q_four_q',
								'$q_one_y', '$q_two_y', '$q_three_y', '$q_four_y'
						)
                ON DUPLICATE KEY UPDATE
				q_one_w = '$q_one_w', q_two_w = '$q_two_w', q_three_w = '$q_three_w', q_four_w = '$q_four_w',
                q_one_m = '$q_one_m', q_two_m = '$q_two_m', q_three_m = '$q_three_m', q_four_m = '$q_four_m',
				q_one_q = '$q_one_q', q_two_q = '$q_two_q', q_three_q = '$q_three_q', q_four_q = '$q_four_q',
				q_one_y = '$q_one_y', q_two_y = '$q_two_y', q_three_y = '$q_three_y', q_four_y = '$q_four_y'";
	
	echo mysqli_query($connection, $query);

	mysqli_close($connection);
?>
