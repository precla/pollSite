<?php

	include "../db/config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

    // get all MT and their names
    $query = "SELECT mt_id_key, mt_name FROM mt";
	
	$result = mysqli_query($connection, $query);
    $mt_list = array();

	while ( $row = mysqli_fetch_row($result) ) {
        // print($row[0] . " " . $row[1] );
		array_push($mt_list, $row[0] . " - " . $row[1]);
	}

    $chosenDay = mysqli_real_escape_string($connection, $_GET['day']);

    $chosenDay = date("Y-m-d", strtotime($chosenDay));

    // When executed in a browser, this script will prompt for download 
    // of a .xls file which can then be opened by Excel or OpenOffice.

    require '../db/php-export-data.class.php';

    // 'browser' tells the library to stream the data directly to the browser.
    // other options are 'file' or 'string'
    $exporter = new ExportDataExcel('browser', date('Y-m-d _H-m-s').'.xml');

    $exporter->initialize(); // starts streaming data to web browser

    // pass addRow() an array and it converts it to Excel XML format and sends 
    // it to the browser

    // Months
    $exporter->addRow( array($chosenDay) );

    $exporter->addRow(array( " ", "ID:", "Average vote 1st question:", "Average vote 2nd question:",
                            "Average vote 3rd question:", "Average vote 4th question:" ));
    
    $exporter->addRow( array($months[$i]) );
    foreach ($mt_list as $mt){
        $mt_s = substr($mt, 0, 4);
        // avg for question one
        $query = "SELECT AVG(q_one) from votes
                    WHERE mt_id = '". $mt_s ."'
                    AND vote_date = '". $chosenDay ."'";

        $result = mysqli_query($connection, $query);

        $avgOne = mysqli_fetch_row($result);

        // avg for question two
        $query = "SELECT AVG(q_two) from votes
                    WHERE mt_id = '". $mt_s ."'
                    AND vote_date = '". $chosenDay ."'";
        
        $result = mysqli_query($connection, $query);

        $avgTwo = mysqli_fetch_row($result);

        // avg for question three
        $query = "SELECT AVG(q_three) from votes
                    WHERE mt_id = '". $mt_s ."'
                    AND vote_date = '". $chosenDay ."'";

        $result = mysqli_query($connection, $query);

        $avgThree = mysqli_fetch_row($result);

        // avg for question four
        $query = "SELECT AVG(q_four) from votes
                    WHERE mt_id = '". $mt_s ."'
                    AND vote_date = '". $chosenDay ."'";

        $result = mysqli_query($connection, $query);

        $avgFour = mysqli_fetch_row($result);

        $exporter->addRow( array( "", json_encode($mt_s), $avgOne[0], $avgTwo[0], $avgThree[0], $avgFour[0] ) );

    }

    // writes the footer, flushes remaining data to browser:
    $exporter->finalize();

    exit();
?>