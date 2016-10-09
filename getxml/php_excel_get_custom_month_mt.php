<?php

	include "../db/config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

    $chosenYear = mysqli_real_escape_string($connection, $_GET['year']);
    $chosenMt = mysqli_real_escape_string($connection, $_GET['mt_id']);

	$curr_date = date("Y-m-d", strtotime('1-1-'.$chosenYear) );

	// First day of the month.
	$firstDayMonth = date('Y-m-01', strtotime($curr_date));
	// Last day of the month.
	$lastDayMonth = date('Y-m-t', strtotime($curr_date));

	// get quarter of chosen Date
	$current_month = date('m', strtotime($firstDayMonth));

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
    $exporter->addRow( array("") );
    $exporter->addRow( array("Mjeseci") );

    $months = array( "Siječanj",
        "Veljača",
        "Ožujak",
        "Travanj",
        "Svibanj",
        "Lipanj",
        "Srpanj",
        "Kolovoz",
        "Rujan",
        "Listopad",
        "Studeni",
        "Prosinac"
    );
    $months_en = array(
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July ',
        'August',
        'September',
        'October',
        'November',
        'December',
    );

    $exporter->addRow(array( " ", "MT:", "Prosječna ocjena I. pitanja:", "Prosječna ocjena II. pitanja:",
                            "Prosječna ocjena III. pitanja:", "Prosječna ocjena IV. pitanja:" ));
    
    for ($i = 0; $i < 12; $i++){
        $exporter->addRow( array($months[$i]) );

        $month_start = new DateTime("first day of ". $months_en[$i]);
        $month_end = new DateTime("last day of ". $months_en[$i]);

        $month_start = $month_start->format('Y-m-d');
        $month_end = $month_end->format('Y-m-d');

        // avg for question one
        $query = "SELECT AVG(q_one) from votes
                    WHERE mt_id = '". $chosenMt ."'
                    AND vote_date >= '". $month_start ."'
                    AND vote_date <= '". $month_end ."'";

        $result = mysqli_query($connection, $query);

        $avgOne = mysqli_fetch_row($result);

        // avg for question two
        $query = "SELECT AVG(q_two) from votes
                    WHERE mt_id = '". $chosenMt ."'
                    AND vote_date >= '". $month_start ."'
                    AND vote_date <= '". $month_end ."'";
        
        $result = mysqli_query($connection, $query);

        $avgTwo = mysqli_fetch_row($result);

        // avg for question three
        $query = "SELECT AVG(q_three) from votes
                    WHERE mt_id = '". $chosenMt ."'
                    AND vote_date >= '". $month_start ."'
                    AND vote_date <= '". $month_end ."'";
        $result = mysqli_query($connection, $query);

        $avgThree = mysqli_fetch_row($result);

        // avg for question four
        $query = "SELECT AVG(q_four) from votes
                    WHERE mt_id = '". $chosenMt ."'
                    AND vote_date >= '". $month_start ."'
                    AND vote_date <= '". $month_end ."'";
        $result = mysqli_query($connection, $query);

        $avgFour = mysqli_fetch_row($result);

        $exporter->addRow( array( "", json_encode($chosenMt), $avgOne[0], $avgTwo[0], $avgThree[0], $avgFour[0] ) );
    }

    // writes the footer, flushes remaining data to browser:
    $exporter->finalize();

    exit();
?>