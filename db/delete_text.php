<?php
	/* delete thanks text */
	include "config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno()) {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

	$c_txt_id = mysqli_real_escape_string($connection, $_POST['c_txt']);

    $query = "DELETE FROM custom_thanks WHERE thanks_id = '". $c_txt_id ."'";

    echo mysqli_query( $connection, $query );

	mysqli_close( $connection );

?>
