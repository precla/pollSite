/****
	Ads page
****/

function readAdsList(){
	url_read_ads_list = '../ads/read_ads_list.php';
	$('.ads_list_admin').load(url_read_ads_list);
}

$(document).ready(function() {
	readAdsList();

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
	});

});
