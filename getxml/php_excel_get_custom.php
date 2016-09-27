<?php

	include "../db/config.php";

	$connection = mysqli_connect($db_host, $db_uid, $db_pass, $db_name);

	if (mysqli_connect_errno())  {
		echo "Failed to connect to MySQL: " . mysqli_connect_error();
		exit();
	}

    $chosenYear = mysqli_real_escape_string($connection, $_GET['year']);

    // get all MT and their names
    $query = "SELECT mt_id_key, mt_name FROM mt";
	
	$result = mysqli_query($connection, $query);
    $mt_list = array();

	while ( $row = mysqli_fetch_row($result) ) {
        // print($row[0] . " " . $row[1] );
		array_push($mt_list, $row[0] . " - " . $row[1]);
	}

	$curr_date = date("Y-m-d", strtotime('1-January-'.$chosenYear) );

	// First day of the month.
	$firstDayMonth = date('Y-m-01', strtotime($curr_date));
	// Last day of the month.
	$lastDayMonth = date('Y-m-t', strtotime($curr_date));

	// get quarter of chosen Date
	$current_month = date('m', strtotime($firstDayMonth));
	$current_year = date('Y', strtotime($curr_date));

	$start_year = date("Y-m-d", strtotime('1-January-'.$current_year));
	$end_year = date("Y-m-d", strtotime('31-December-'.$current_year));


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
        foreach ($mt_list as $mt){
            $mt_s = substr($mt, 0, 4);

            $month_start = new DateTime("first day of ". $months_en[$i]);
            $month_end = new DateTime("last day of ". $months_en[$i]);

            $month_start = $month_start->format('Y-m-d');
            $month_end = $month_end->format('Y-m-d');

            // avg for question one
        	$query = "SELECT AVG(q_one) from votes
                        WHERE mt_id = '". $mt_s ."'
                        AND vote_date >= '". $month_start ."'
                        AND vote_date <= '". $month_end ."'";

            $result = mysqli_query($connection, $query);

            $avgOne = mysqli_fetch_row($result);

            // avg for question two
            $query = "SELECT AVG(q_two) from votes
                        WHERE mt_id = '". $mt_s ."'
                        AND vote_date >= '". $month_start ."'
                        AND vote_date <= '". $month_end ."'";
            
            $result = mysqli_query($connection, $query);

            $avgTwo = mysqli_fetch_row($result);

            // avg for question three
            $query = "SELECT AVG(q_three) from votes
                        WHERE mt_id = '". $mt_s ."'
                        AND vote_date >= '". $month_start ."'
                        AND vote_date <= '". $month_end ."'";
            $result = mysqli_query($connection, $query);

            $avgThree = mysqli_fetch_row($result);

            // avg for question four
            $query = "SELECT AVG(q_four) from votes
                        WHERE mt_id = '". $mt_s ."'
                        AND vote_date >= '". $month_start ."'
                        AND vote_date <= '". $month_end ."'";
            $result = mysqli_query($connection, $query);

            $avgFour = mysqli_fetch_row($result);

            $exporter->addRow( array( "", json_encode($mt), $avgOne[0], $avgTwo[0], $avgThree[0], $avgFour[0] ) );
        }
    }

    // Quarter
    $exporter->addRow( array("") );
    $exporter->addRow( array("Kvartali") );

    $quarter = array( "Q1", "Q2", "Q3", "Q4" );

    $exporter->addRow(array( " ", "MT:", "Prosječna ocjena I. pitanja:", "Prosječna ocjena II. pitanja:",
                            "Prosječna ocjena III. pitanja:", "Prosječna ocjena IV. pitanja:" ));
    
    for ($i = 0; $i < 4; $i++){
        $exporter->addRow( array($quarter[i]) );
        $start_quarter = "";
        $end_quarter = "";

        $exporter->addRow( array( json_encode($quarter[$i]), $avgOne, $avgTwo, $avgThree, $avgFour, $avgFourTxt ) );

        foreach ($mt_list as $mt){
            $mt_s = substr($mt, 0, 4);

            if( $i == 0 ) {
                $start_quarter = date("Y-m-d", strtotime('1-January-'.$current_year));
                $end_quarter = date("Y-m-d", strtotime('1-April-'.$current_year));

            } else if( $i == 1 ) {
                $start_quarter = date("Y-m-d", strtotime('1-April-'.$current_year));
                $end_quarter = date("Y-m-d", strtotime('1-July-'.$current_year));

            } else if( $i == 2 ) {
                $start_quarter = date("Y-m-d", strtotime('1-July-'.$current_year));
                $end_quarter = date("Y-m-d", strtotime('1-October-'.$current_year));

            } else if( $i == 3 ) {
                $start_quarter = date("Y-m-d", strtotime('1-October-'.$current_year));
                $end_quarter = date("Y-m-d", strtotime('1-January-'.$current_year+1));
            }

            // avg for question one
            $query = "SELECT AVG(q_one) from votes
                        WHERE mt_id = '". $mt_s ."'
                        AND vote_date >= '". $start_quarter ."'
                        AND vote_date <= '". $end_quarter ."'";

            $result = mysqli_query($connection, $query);

            $avgOne = mysqli_fetch_row($result);

            // avg for question two
            $query = "SELECT AVG(q_two) from votes
                        WHERE mt_id = '". $mt_s ."'
                        AND vote_date >= '". $start_quarter ."'
                        AND vote_date <= '". $end_quarter ."'";
            
            $result = mysqli_query($connection, $query);

            $avgTwo = mysqli_fetch_row($result);

            // avg for question three
            $query = "SELECT AVG(q_three) from votes
                        WHERE mt_id = '". $mt_s ."'
                        AND vote_date >= '". $start_quarter ."'
                        AND vote_date <= '". $end_quarter ."'";
            $result = mysqli_query($connection, $query);

            $avgThree = mysqli_fetch_row($result);

            // avg for question four
            $query = "SELECT AVG(q_four) from votes
                        WHERE mt_id = '". $mt_s ."'
                        AND vote_date >= '". $start_quarter ."'
                        AND vote_date <= '". $end_quarter ."'";
            $result = mysqli_query($connection, $query);

            $avgFour = mysqli_fetch_row($result);

            $exporter->addRow( array( "", json_encode($mt), $avgOne[0], $avgTwo[0], $avgThree[0], $avgFour[0] ) );

        }
    }

    // Year
    $exporter->addRow( array("") );
    $exporter->addRow( array("Godina") );
    $exporter->addRow( array( " ", "MT:", "Prosječna ocjena I. pitanja:", "Prosječna ocjena II. pitanja:",
                            "Prosječna ocjena III. pitanja:", "Prosječna ocjena IV. pitanja:" ) );
    
    $exporter->addRow( array($current_year) );
    foreach ($mt_list as $mt){
        $mt_s = substr($mt, 0, 4);

        // avg for question one
        $query = "SELECT AVG(q_one) from votes
                    WHERE mt_id = '". $mt_s ."'
                    AND vote_date >= '". $start_year ."'
                    AND vote_date <= '". $end_year ."'";

        $result = mysqli_query($connection, $query);

        $avgOne = mysqli_fetch_row($result);

        // avg for question two
        $query = "SELECT AVG(q_two) from votes
                    WHERE mt_id = '". $mt_s ."'
                    AND vote_date >= '". $start_year ."'
                    AND vote_date <= '". $end_year ."'";
        
        $result = mysqli_query($connection, $query);

        $avgTwo = mysqli_fetch_row($result);

        // avg for question three
        $query = "SELECT AVG(q_three) from votes
                    WHERE mt_id = '". $mt_s ."'
                    AND vote_date >= '". $start_year ."'
                    AND vote_date <= '". $end_year ."'";
        $result = mysqli_query($connection, $query);

        $avgThree = mysqli_fetch_row($result);

        // avg for question four
        $query = "SELECT AVG(q_four) from votes
                    WHERE mt_id = '". $mt_s ."'
                    AND vote_date >= '". $start_year ."'
                    AND vote_date <= '". $end_year ."'";
        $result = mysqli_query($connection, $query);

        $avgFour = mysqli_fetch_row($result);

        $exporter->addRow( array( "", json_encode($mt), $avgOne[0], $avgTwo[0], $avgThree[0], $avgFour[0] ) );

    }

    // writes the footer, flushes remaining data to browser:
    $exporter->finalize();

    exit();
?>