/****
	Ads page
****/

var adsImages = [];

function readAdsList(){
	var url_read_ads_list = '../ads/read_ads_list.php';
	$('.ads_list_admin').load(url_read_ads_list);
}

function readAdsImageList(){
	var url_read_ads_images = '../ads/read_ads_images.php';

	$.get(url_read_ads_images).done(function (data) {
		if (data) {
			dataArray = $.parseJSON(data);
			for(i=0; i < dataArray.length; i++){
				adsImages[i] = dataArray[i];
				// adsImages[i] = 'ads/' + adsImages[i].slice(2);
				// ./ag_logo.png
				adsImages[i] = '<p>' + adsImages[i].slice(2) + '</p><img src="' + adsImages[i] +'"/>';
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
		adImageName = './' + adImageName.slice(2);

		var url_delete_ad_image = './ads/delete_image.php';

		$.post(url_delete_ad_image, { adName : adImageName })
			.done(function (data) {
				if(data){
					alert('Slika: "' + adImageName + '" , je uspjesno izbrisana!');
				} else {
					alert('Greška kod brisanja slike. Ponovite brisanje ili kontaktirajte administratora!');
				}
			}
		);
		readAdsList();
		readAdsImageList();
	});

});
