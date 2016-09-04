<!DOCTYPE html>
<html lang="hr">

	<head>
		<title>Adria Gastro - admin panel</title>
		<meta http-equiv="Content-Type" content="text/html;charset='utf-8'" />
		<link rel="shortcut icon" href="./images/favicon.ico" />
		<link rel="stylesheet" type="text/css" href="./css/stilDelete.css" />
		<script src="./script/jquery-2.2.4.min.js" type="text/javascript"></script>
		<script src="./script/jquery-ui-1.11.4.min.js" type="text/javascript"></script>
		<script src="./script/scriptDeletemt.js" type="text/javascript"></script>
	</head>

	<body>

        <div id="delete_functions">
			<!-- MT to show graph -->
			<fieldset id="mt-choice-box-admin">
				<h3>Odaberite MT za brisanje:</h3>
				<select id="mt_list" name="mt" class="mt_list_admin">
					<!-- Content generated by call -->
				</select>
                <button class="submit_button_delete_mt" type="submit">Briši MT</button>
                <div id="delConfirmation"></div>
			</fieldset>
        </div>

    </body>
</html>
