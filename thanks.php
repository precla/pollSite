<?php
    $mtid = $_GET['MT'];
?>

<html lang="hr">

	<head>
		<title>Poll - Info text</title>
		<meta http-equiv="Content-Type" content="text/html;charset='utf-8'" />
		<meta name="viewport" content="initial-scale=0.8">
		<link rel="shortcut icon" href="./images/favicon.ico" />
		<link rel="stylesheet" type="text/css" href="./css/stil.css" />
		<script src="./script/jquery-2.2.4.min.js" type="text/javascript"></script>
		<script src="./script/scriptThanks.js" type="text/javascript"></script>
	</head>
    <body>
        <div id="thanks_page">
            <h1 style="font-size: 200%">Thanks for your vote!</h1>
            <div id="mtId" hidden><?php echo $mtid; ?></div>
            <!-- Load custom set thanks text -->
            <h1 style="font-size: 250%" id="custom_thanks_text"></p>
        </div>
    </body>
</html>
