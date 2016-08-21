<?php
	/* Add thanks */
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$thanks_text = mysqli_real_escape_string($connection, $_POST['custom_thanks_text']);

	$query = "INSERT INTO custom_thanks (custom_thanks_text) VALUES ('$thanks_text')";

	echo mysqli_query($connection, $query);

	mysqli_close($connection);
?>
