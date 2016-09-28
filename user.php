<!DOCTYPE html>
<html lang="hr">

	<head>
		<title>Adria Gastro - user panel</title>
		<meta http-equiv="Content-Type" content="text/html;charset='utf-8'" />
		<link rel="shortcut icon" href="./images/favicon.ico" />
		<link rel="stylesheet" type="text/css" href="./css/stilUser.css" />
		<link rel="stylesheet" type="text/css" href="./css/jquery-ui-1.11.4.min.css" />
		<script src="./script/jquery-2.2.4.min.js" type="text/javascript"></script>
		<script src="./script/jquery-ui-1.11.4.min.js" type="text/javascript"></script>
		<script src="./script/scriptUser.js" type="text/javascript"></script>
		<script src="./script/Chart.bundle-2.2.1.min.js" type="text/javascript"></script>
		<script src="./script/moment.min-2.14.1.js" type="text/javascript"></script>
	</head>

	<body>
		<button class="show_settings" type="submit">Sakrij postavke</button>
		<div id="admin_functions">
			<!-- MT to show graph -->
			<fieldset id="mt-choice-box-admin">
				<h3>Odaberite MT za prikaz glasova:</h3>
				<select id="mt_list" name="mt" class="mt_list_admin">
					<!-- Content generated by call -->
				</select>
				<div id="date_and_submit">
					<h3>Datum za prikaz: <input type="text" id="datepicker" value=""></h3>
					<h3>Korak u minutama: <input type="number" id="step_min" value="25"></h3>
					<button class="submit_button_graph" type="submit">Potvrdi odabir</button>
				</div>
			</fieldset>

			<fieldset id="extern-functions-box-admin">
				<h3>Dohvat podataka u excel (XML) file:</h3>
				<h3><a id="getXmlLink" target="_blank" href="./xls.php">Zahtjev Excela</a></h3>
			</fieldset>

		</div>

		<div hidden id="infoTarget">
			<canvas id="votesRadarChart" height="500px"></canvas>
			<div id="targetTxt"><h3>Targeti:</h3></div>
			<div class="targetTxt_border"><h3>Tjedan</h3><fieldset id="targets_w"></fieldset></div>
			<div class="targetTxt_border"><h3>Mjesec</h3><fieldset id="targets_m"></fieldset></div>
			<div class="targetTxt_border"><h3>Kvartal</h3><fieldset id="targets_q"></fieldset></div>
			<div class="targetTxt_border"><h3>Godina</h3><fieldset id="targets_y"></fieldset></div>
		</div>

		<div hidden id="vote_charts">
			<canvas id="votesChartFirstQ" height="280px" width="1400px"></canvas>
			<canvas id="votesChartSecondQ" height="280px" width="1400px"></canvas>
			<canvas id="votesChartThirdQ" height="280px" width="1400px"></canvas>
			<canvas id="votesChartFourthQ" height="280px" width="1400px"></canvas>
		</div>

		<div id="footer"><hr />&copy; Antonio Prcela. All rights reserved.</div>
	</body>
</html>
