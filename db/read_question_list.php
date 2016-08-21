<?php
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$query = "SELECT question_id, question_text FROM custom_questions";
	
	$result = mysqli_query($connection, $query);

	while ( $row = mysqli_fetch_row($result) ) {
		printf("<option value='%d'>%d - %s</option>", $row[0], $row[0], $row[1]);
	}
	
	mysqli_free_result($result);
	mysqli_close($connection);
?>
