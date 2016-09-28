jQuery.ajaxSetup({async:false});

var adsImages = dataArray = [];

$(document).ready(function() {
	var selected_value_mt;
	var loadedQuestion;

	// load list of all MTs into drop down menu
	url_read_mt_list = './db/read_mt_list.php';
	$('#mt_list').load(url_read_mt_list);

	$('.submit_mt').on('click', function() {
		// vote page only - .mt-choice-box

		$('.mt-choice-box').fadeOut(550, function() {
			$('#ads').fadeIn(550);
			$('#voting_div').fadeIn(550);

			/* Show selected MT on page */
			selected_value_mt = $('#mt_list').val();
			document.getElementById('mt_header').innerHTML = '<p>MT: ' + $('#mt_list option:selected').html() + '</p>';

			/* Ads above voting */
			
			/* load all current ad images */
			adsImages = dataArray = [];
			
			url_read_ads_images = './ads/read_ads_images.php';

			$.post(url_read_ads_images).done(function (data) {
					if (data) {
						dataArray = $.parseJSON(data);
						for(i=0; i < dataArray.length; i++){
							adsImages[i] = dataArray[i];
							adsImages[i] = 'ads/' + adsImages[i].slice(2);
						}
					}
				}
			);

			setInterval(fadeDivs, 7000);

			/* Load custom question for MT */
			loadedQuestion = './db/question_get.php';

			var getQtxt = $.get(loadedQuestion, { mt_id: selected_value_mt });
			getQtxt.done(function( data ) {
				document.getElementById('custom_question').innerHTML = data;
				loadedQuestion = data;
			});
		});
	});

	$('.submit_vote').on('click', function() {

		// get val from selected radio button
		var sel_q_one = $("#question_one input[type='radio']:checked").val()
		var sel_q_two = $("#question_two input[type='radio']:checked").val();
		var sel_q_three = $("#question_three input[type='radio']:checked").val()
		var sel_q_four = $("#question_four input[type='radio']:checked").val();

		if (sel_q_one && sel_q_two && sel_q_three && sel_q_four) {
			// insert vote into database
			var sendUrl = './db/send_vote.php';

			$.post( sendUrl, { mt_id: selected_value_mt, question_one: sel_q_one,
								question_two: sel_q_two, question_three: sel_q_three,
								question_four: sel_q_four, custom_q_txt: loadedQuestion } )
				.done(function (data) {
					if(data == 'Failed to connect to MySQL'){
						alert('Nažalost Vaš glas nije zabilježen. SQL greska 100.');
					} else if (data) {
						// open new notification window and close it after 3.3 sec
						var w = window.open('./thanks.php?MT=' + selected_value_mt, '');
						w.focus();
						setTimeout(function() {w.close();}, 4000);
					} else {
						alert('Nažalost Vaš glas nije zabilježen, pokušajte ponovo ili se obratite djelatniku.');
					}
				}
			);
			// reset radio buttons
			$('#input[type="radio"]').prop('checked', false);

			$('#radio1_3').prop('checked', true);
			$('#radio2_3').prop('checked', true);
			$('#radio3_3').prop('checked', true);
			$('#radio4_3').prop('checked', true);
		} else {
			alert('Niste odabrali sve ocjene.\nMolimo ponovite Vaš odabir.');
		}
	});

});

var fi = 0;

function fadeDivs() {

	$('#adsImg').fadeOut(250, function(){
		$(this).attr('src', adsImages[fi]).bind('onreadystatechange load', function(){
			if (this.complete) $(this).fadeIn(250);
		});
	});

	if (fi < (adsImages.length - 1)) {
		fi++;
	} else {
		fi = 0;
	}
}
