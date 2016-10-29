<?php
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$mt_id_key = mysqli_real_escape_string($connection, $_POST['mt_id_key']);
	$mt_name = mysqli_real_escape_string($connection, $_POST['mt_name']);

	$query = "INSERT INTO mt (mt_id_key, mt_name, custom_q_text) VALUES ('$mt_id_key', '$mt_name', 'Rate the ambient of the place')";

	echo mysqli_query($connection, $query);

	mysqli_close($connection);
?>
