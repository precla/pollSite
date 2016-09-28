<html lang="hr">

	<head>
		<title>Adria Gastro - Dohvat tablice podataka</title>
		<meta http-equiv="Content-Type" content="text/html;charset='utf-8'" />
		<link rel="shortcut icon" href="./images/favicon.ico" />
		<link rel="stylesheet" type="text/css" href="./css/stilXml.css" />
		<link rel="stylesheet" type="text/css" href="./css/jquery-ui-1.11.4.min.css" />
		<script src="./script/jquery-2.2.4.min.js" type="text/javascript"></script>
        <script src="./script/jquery-ui-1.11.4.min.js" type="text/javascript"></script>
        <script src="./script/scriptXml.js" type="text/javascript"></script>
	</head>

	<body>
        <div id="goBack"><a href="javascript:window.close();">Natrag</a></div>

        <div id="xml_functions">
            <fieldset class="xml-box-admin">
                <h3>Dohvaćanje podataka (po godini ili mjesecu)</h3>
                <hr />
                <h2>Godina</h2>
                <p>Unesite godinu za koju želite podatke:</p>
                <form action="" method="POST" enctype="multipart/form-data">
                    <input id="inputTextY" type="number" value="2016" step="1" min="2016" max="2999" /></br>                    
                    <input id="submitButtonYear" type="submit" value="Dohvati podatke"></input>
                </form>
                
                <hr />
                <h2>Kvartal</h2>
                <p>Odaberite kvartal za koji želite podatke:</p>
                <form id="quarterChoice" action="" method="POST" enctype="multipart/form-data">
                    <input type="radio" class="radio_item" value="1" name="q" id="q_1"/><label for="q_1">I. Kvartal</label><br />
					<input type="radio" class="radio_item" value="2" name="q" id="q_2"/><label for="q_2">II. Kvartal</label><br />
					<input type="radio" class="radio_item" value="3" name="q" id="q_3"/><label for="q_3">III. Kvartal</label><br />
					<input type="radio" class="radio_item" value="4" name="q" id="q_4"/><label for="q_4">IV. Kvartal</label><br />
                    <input id="submitButtonQuarter" type="submit" value="Dohvati podatke"></input>
                </form>

                <hr />
                <h2>Mjesec</h2>
                <p>Unesite mjesec za koji želite podatke:</p>
                <form action="" method="POST" enctype="multipart/form-data">
                    <input name="chosenDate" id="chosenDateM" class="date-picker" />                    
                    <input id="submitButtonMonth" type="submit" value="Dohvati podatke"></input>
                </form>
               
            </fieldset>
        </div>

    </body>
</html>
