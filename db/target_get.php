<?php
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		//echo "Failed to connect to MySQL: " . mysqli_connect_error();
		echo "Failed to connect to MySQL";
		exit();
	}

	$mt_id = mysqli_real_escape_string($connection, $_GET['mt_id']);

	$query = "SELECT * from target_mt WHERE mt_id = ". $mt_id;

	$result = mysqli_query($connection, $query);	
    $result = mysqli_fetch_row($result);

	print( json_encode($result) );

	mysqli_close($connection);
?>
