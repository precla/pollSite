<?php
	/* delete custom question */
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$q_txt_id = mysqli_real_escape_string($connection, $_POST['q_txt']);

    $query = "DELETE FROM custom_questions WHERE question_id = '". $q_txt_id ."'";

    echo mysqli_query( $connection, $query );

	mysqli_close( $connection );

?>
