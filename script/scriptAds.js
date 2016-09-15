/****
	Ads page
****/

var adsImages = [];

function readAdsList(){
	$('.ads_list_admin').empty();

	var url_read_ads_list = './read_ads_list.php';
	$('.ads_list_admin').load(url_read_ads_list);
}

function readAdsImageList(){
	$("#pics_preview").empty();

	var url_read_ads_images = './read_ads_images.php';

	$.get(url_read_ads_images).done(function (data) {
		if (data) {
			dataArray = $.parseJSON(data);
			adsImages = [];
			for(i=0; i < dataArray.length; i++){
				adsImages[i] = dataArray[i];
				// adsImages[i] = 'ads/' + adsImages[i].slice(2);
				// ./ag_logo.png
				adsImages[i] = '<div id="pic_preview_b"><p>Naziv slike: ' + adsImages[i].slice(2)
								+ '</p><img src="' + adsImages[i] +'"/></div>';
			}
			$('#pics_preview').html(adsImages);
		}
	});
}

$(document).ready(function() {
	readAdsList();
	readAdsImageList();

	// delete ad picture
	$('.del_button_ad').on('click', function() {
		var adImageName = $('#ad_list option:selected').html();
		// remove ./ and add proper path:
		// adImageName = './' + adImageName.slice(2);

		var url_delete_ad_image = './delete_image.php';

		$.post(url_delete_ad_image, { adName : adImageName })
			.done(function (data) {
				if(data){
					alert('Slika: "' + adImageName + '" , je uspjesno izbrisana!');
					readAdsList();
					readAdsImageList();
				} else {
					alert('Greška kod brisanja slike. Ponovite brisanje ili kontaktirajte administratora!');
				}
			}
		);
		
	});

});
