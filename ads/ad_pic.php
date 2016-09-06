<?php
    if(isset($_FILES['image'])){
        $errors = array();
        $file_name = $_FILES['image']['name'];
        $file_size = $_FILES['image']['size'];
        $file_tmp = $_FILES['image']['tmp_name'];
        $file_type = $_FILES['image']['type'];
        $file_ext = strtolower(end(explode('.',$_FILES['image']['name'])));

        list($width, $height) = getimagesize($file_tmp);

        if ($width != 740 && $height != 300){
            $errors[] = "Dimenzije slike nisu ispravne!";
        }

        $expensions = array("jpeg","jpg","png");

        if (in_array($file_ext, $expensions) === false) {
            $errors[] = "Odabrali ste datoteku koja nije podržana!";
        }

        if ($file_size > 262144) {
            $errors[] = 'Veličina slike ne smije prelaziti 256 KB!';
        }

        if (empty($errors) == true) {
            move_uploaded_file( $file_tmp, "./".$file_name );
        } else {
            echo '<div id="pic_error">';
            foreach($errors as $errMsg){
                print $errMsg . '</br>';
            }

            echo '</div>';
        }
    }
?>

<html lang="hr">

	<head>
		<title>Adria Gastro - Reklamne slike</title>
		<meta http-equiv="Content-Type" content="text/html;charset='utf-8'" />
		<link rel="shortcut icon" href="../images/favicon.ico" />
		<link rel="stylesheet" type="text/css" href="../css/stilAds.css" />
		<link rel="stylesheet" type="text/css" href="../css/jquery-ui-1.11.4.min.css" />
		<script src="../script/jquery-2.2.4.min.js" type="text/javascript"></script>
		<script src="../script/scriptAds.js" type="text/javascript"></script>
	</head>

	<body>
        <p><a href="javascript:window.close();">Natrag</a></p>

        <div id="ads_functions">
            <!-- upload new ad pic -->
            <fieldset class="ad-upload-box-admin">
                <h3>Dodavanje nove reklamne slike:</h3>

                <form action="" method="POST" enctype="multipart/form-data">
                    <input type="file" name="image" /></br>
                    <input type="submit" value="Postavi sliku"></input>
                </form>
                <p>Podržani formati: JPG, JPEG, PNG</br>
                Rezolucija slike mora biti 740 x 300 pixela (š x v)</br>
                Maksimalna veličina slike: 256 KB</p>
            </fieldset>

            <!-- delete ad pic -->
            <fieldset class="ad-delete-box-admin">
                <h3>Brisanje reklamne slike:</h3>
                <select id="ad_list" name="ads_list" class="ads_list_admin">
                    <!-- Content generated by call -->
                </select>
                <button class="del_button_ad" type="submit">Izbriši sliku</button>
            </fieldset>
        </div>

        <div class="ad-pics-box-admin">
            <h3>Pregled aktivnih reklamnih slika:</h3>
            <div id="pics_preview">
                <!-- Content generated by call -->
            </div>
        </div>

    </body>
</html>
