/****
	Admin page
****/

$(document).ready(function() {
	var selected_value_mt;

	// load datepicker and set format of date
	$('#datepicker').datepicker({
		dateFormat: 'dd-mm-yy'
	});

	document.getElementById('datepicker').value = moment().format("D-MM-YYYY");;

	readMtList();
	readQuestionList();
	readThanksList();

/* 
	Chart rendering START

	votesArray - array from MySQL query
	votesQone - votes from upper (first) question
	votesQtwo - votes from lower (second) question
	votesQthree - votes from upper (first) question
	votesQfour - votes from lower (second) question
	voteTime - time of vote shown as hh:mm:ss 	
	votesAmount - amount of 
	votesAverage - array of average votes for first, second, third and fourth q. check comment with "vote query"
*/

	var votesArray = [];
	var votesQone = [];
	var votesQtwo = [];
	var votesQthree = [];
	var votesQfour = [];
	var voteTime = [];
	var votesAmount = [];
	var votesAverage = [];
	var voteDate, voteQuestion, votesTotal;
	var votesTotalAmount = [];

	var ctxOne = document.getElementById('votesChartFirstQ');
	var ctxTwo = document.getElementById('votesChartSecondQ');
	var ctxThree = document.getElementById('votesChartThirdQ');
	var ctxFour = document.getElementById('votesChartFourthQ');
	var ctxRadar = document.getElementById('votesRadarChart');

/* Chart rendering BEGIN */
	var votesQoneChart, votesQtwoChart, votesQthreeChart, votesQfourChart, votesTotalRadarChart;

	// get graph for specified date
	$('.submit_button_graph').on('click', function() {

		var selected_value_mt = $('#mt_list').val();
		var selected_date = $('#datepicker').val();

		url_get_votes_mt = './db/get_votes_mt.php';
		var posting = $.post(url_get_votes_mt, { mt_id: selected_value_mt, date: selected_date });

		posting.done(function( data ) {
			if(data.length < 3){
				alert('Nema podataka za taj datum!');
				exit();
			}
			
			// reset all values
			votesArray = [];
			votesQone = [];
			votesQtwo = [];
			votesQthree = [];
			votesQfour = [];
			voteTime = [];
			voteDate = [];
			voteQuestion = [];
			votesTotal = 0;

			for(i = 0; i < 4; i++){
				votesAmount[i] = 0;
				votesAverage[i] = 0;
			}

/*
	vote query
	0		1	2	3			4	5	6								7
	["9991","2","3","2016-08-15","4","5","Ocijenite ambijent restorana","14:11:55"]
*/
			// save requested data from php into array
			votesArray = $.parseJSON(data);

			for(i = 0; i < votesArray.length; i++){
				votesQone[i] = 0;
				votesQtwo[i] = 0;
				votesQthree[i] = 0;
				votesQfour[i] = 0;
			}

			voteDate = votesArray[0][3];
			voteQuestion = votesArray[0][6];

			var currVote, nextVote, count = 0;

			currVote = moment(voteDate + ' ' + votesArray[0][7]);

			for(i = 1, j = 0; i < votesArray.length; i++){

				// make votes sum in 30min blocks
				nextVote = moment(voteDate + ' ' + votesArray[i][7]);

				if( nextVote.diff(currVote, 'minutes') < 20 ){
					votesQone[j] = votesQone[j] + parseInt(votesArray[i][1]);
					votesQtwo[j] = votesQtwo[j] + parseInt(votesArray[i][2]);
					votesQthree[j] = votesQthree[j] + parseInt(votesArray[i][4]);
					votesQfour[j] = votesQfour[j] + parseInt(votesArray[i][5]);
					count++;
				} else {
					votesQone[j] = (votesQone[j] / count).toFixed(2);
					votesQtwo[j] = (votesQtwo[j] / count).toFixed(2);
					votesQthree[j] = (votesQthree[j] / count).toFixed(2);
					votesQfour[j] = (votesQfour[j] / count).toFixed(2);

					count = 0;
					++j;
					voteTime[j] = votesArray[i][7];
					currVote = moment(voteDate + ' ' + voteTime[j]);
					votesQone[j] += parseInt(votesArray[i][1]);
					votesQtwo[j] += parseInt(votesArray[i][2]);
					votesQthree[j] += parseInt(votesArray[i][4]);
					votesQfour[j] += parseInt(votesArray[i][5]);
				}

				//	index 0 - sum of votes for first q
				//	index 1 - sum of votes for second q ... 

				votesAmount[0] = votesAmount[0] + parseInt(votesArray[i][1]);
				votesAmount[1] = votesAmount[1] + parseInt(votesArray[i][2]);
				votesAmount[2] = votesAmount[2] + parseInt(votesArray[i][4]);
				votesAmount[3] = votesAmount[3] + parseInt(votesArray[i][5]);

				votesTotal++;

			}

			for(i = 0; i < 4; i++){
				votesAverage[i] = (votesAmount[i] / votesTotal).toFixed(2);
			}

			/* clear current chart, if any exist, before rendering new */
			if(votesQoneChart && votesQtwoChart && votesQthreeChart && votesQfourChart){
				votesQoneChart.destroy();
				votesQtwoChart.destroy();
				votesQthreeChart.destroy();
				votesQfourChart.destroy();
				votesTotalRadarChart.destroy();
			}

			// line chart
			votesQoneChart = new Chart(ctxOne, {
				type: 'line',
				data: {
					labels: voteTime,
					datasets: [{
						label: 'Prosječna ocjena u tom trenutku',
						data: votesQone,
						backgroundColor: 'rgba(197, 157, 95, 0.2)',
						borderColor: 'rgba(197, 157, 95, 1)',
						borderWidth: 1
					}]
				},
				options: {
					responsive: false,
					title: {
						display: true,
						text: 'Prosječna ocjena prvog pitanja: ' + votesAverage[0]
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});

			// bar chart
			votesQtwoChart = new Chart(ctxTwo, {
				type: 'line',
				data: {
					labels: voteTime,
					datasets: [{
						label: 'Prosječna ocjena u tom trenutku',
						data: votesQtwo,
						backgroundColor: 'rgba(197, 157, 95, 0.2)',
						borderColor: 'rgba(197, 157, 95, 1)',
						borderWidth: 1
					}]
				},
				options: {
					responsive: false,
					title: {
						display: true,
						text: 'Prosječna ocjena drugog pitanja: ' + votesAverage[1]
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});

			// bar chart
			votesQthreeChart = new Chart(ctxThree, {
				type: 'line',
				data: {
					labels: voteTime,
					datasets: [{
						label: 'Prosječna ocjena u tom trenutku',
						data: votesQthree,
						backgroundColor: 'rgba(197, 157, 95, 0.2)',
						borderColor: 'rgba(197, 157, 95, 1)',
						borderWidth: 1
					}]
				},
				options: {
					responsive: false,
					title: {
						display: true,
						text: 'Prosječna ocjena trećeg pitanja: ' + votesAverage[2]
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});

			// bar chart
			votesQfourChart = new Chart(ctxFour, {
				type: 'line',
				data: {
					labels: voteTime,
					datasets: [{
						label: 'Prosječna ocjena u tom trenutku',
						data: votesQfour,
						backgroundColor: 'rgba(197, 157, 95, 0.2)',
						borderColor: 'rgba(197, 157, 95, 1)',
						borderWidth: 1
					}]
				},
				options: {
					responsive: false,
					title: {
						display: true,
						text: 'Prosječna ocjena četvrtog pitanja: ' + votesAverage[3]
					},
					scales: {
						yAxes: [{
							ticks: {
								beginAtZero: true
							}
						}]
					}
				}
			});

			get_votes_mt_amount = './db/get_votes_mt_amount.php';
			posting = $.post(get_votes_mt_amount, { mt_id: selected_value_mt, date: selected_date });

			posting.done(function( data ) {
				if(data.length < 5){
					alert('Nema podataka za taj datum!');
					exit();
				}
				votesTotalAmount = [];

				votesArray = $.parseJSON(data);

				for(i=0; i<5; i++){
					votesTotalAmount[i] = parseInt(votesArray[i]);
				}

				// radar chart for sum of votes
				votesTotalRadarChart = new Chart(ctxRadar, {
					type: "radar",
					data: {
						labels: ["1", "2", "3", "4", "5"],
						datasets: [
							{
								label: "Ukupan broj određene ocjene",
								backgroundColor: "rgba(135, 206, 250, 0.2)",
								borderColor: "rgba(30, 144, 255, 1)",
								pointBackgroundColor: "rgba(179, 181, 198, 1)",
								pointBorderColor: "#fff",
								pointHoverBackgroundColor: "#fff",
								pointHoverBorderColor: "rgba(179, 181, 198, 1)",
								data: votesTotalAmount
							}
						]
					},
					options: {
						responsive: false,
						scale: {
							reverse: false,
							ticks: {
								beginAtZero: true
							}
						}
					}
				});
			});
		});
	});

/* Chart rendering END */

	// add new MT
	$('.submit_button_add_mt').on('click', function() {
		var new_mt_id = $('#new_mt_id').val();
		var new_mt_name = $('#new_mt_name').val();
		
		if( !$.isNumeric(new_mt_id) ){
			alert('Unesni "Broj MT-a" nije broj, uklonite znakove i unesite samo brojeve!');
		} else if(new_mt_id && new_mt_name){
			var url_set_new_mt = './db/add_mt.php';
			$.post(url_set_new_mt, { mt_id_key: new_mt_id, mt_name: new_mt_name })
				.done(function (data) {
					if(data){
						alert('MT ' + new_mt_id + ' , ' + new_mt_name + ' je uspjesno dodano u bazu!');
					} else {
						alert('Greška kod dodavanja MT-a, mozda vec postoji? Ponovite dodavanje ili kontaktirajte administratora!');
					}
				}
			);
			$('#new_mt_id').val('');
			$('#new_mt_name').val('');
		} else if( $.isNumeric(new_mt_id) ){
			alert('Niste unijeli sve potrebne podatke za dodavanje MT-a!');
		}

		readMtList();
	});

	// submit new custom question
	$('.submit_button_add_question').on('click', function() {
		var new_question = $('#new_question_text').val();
		var url_set_new_question = './db/question_add.php';

		if(new_question.length < 1 || new_question.length > 255){
			alert('Unos ne smije biti prazan i mora biti manji od 255 znakova.\nMolimo ponovite unos!');
		} else {
			$.post(url_set_new_question, { question_text : new_question })
				.done(function (data) {
					if(data){
						alert('Pitanje: "' + new_question + '" , je uspjesno dodano u bazu!');
					} else {
						alert('Greška kod dodavanja pitanja.\nPonovite dodavanje ili kontaktirajte administratora!');
					}
				}
			);
			$('#new_question_text').val('');
		}
		readQuestionList();
	});

	// set question for MT
	$('.submit_button_set_question').on('click', function() {
		var questionTxt = $('#q_list option:selected').html();
		// remove id num and leave only text:
		questionTxt = questionTxt.substr(questionTxt.indexOf('- ')+2);

		var mt_id_q = $('#mt_list_q').val();
		var url_set_question_mt = './db/question_set.php';

		$.post(url_set_question_mt, { mt_id : mt_id_q, question_text : questionTxt })
			.done(function (data) {
				if(data){
					alert('Pitanje: "' + questionTxt + '" , je uspjesno postavljeno za MT ' + mt_id_q + '!');
				} else {
					alert('Greška kod postavljanja pitanja. Ponovite postavljanje ili kontaktirajte administratora!');
				}
			}
		);
	});

	// submit thanks message for MT
	$('.submit_button_thanks_message').on('click', function() {
		var new_thanks = $('#new_thanks_text').val();
		var url_set_new_thanks = './db/thanks_add.php';

		if(new_thanks.length < 1 || new_thanks.length > 255){
			alert('Unos ne smije biti prazan i mora biti manji od 255 znakova.\nMolimo ponovite unos!');
		} else {
			$.post(url_set_new_thanks, { custom_thanks_text : new_thanks })
				.done(function (data) {
					if(data){
						alert('Tekst: "' + new_thanks + '" , je uspjesno dodan u bazu!');
					} else {
						alert('Greška kod dodavanja teksta.\nPonovite dodavanje ili kontaktirajte administratora!');
					}
				}
			);
			$('#new_thanks_text').val('');
		}
		readThanksList();
	});

	// set thanks message for MT
	$('.submit_button_set_thanks').on('click', function() {
		var thanksTxt = $('#thanks_list option:selected').html();
		// remove id num and leave only text:
		thanksTxt = thanksTxt.substr(thanksTxt.indexOf('- ')+2);

		var mt_id_q = $('#mt_list_thanks').val();
		var url_set_thanks_mt = './db/thanks_set.php';

		$.post(url_set_thanks_mt, { mt_id : mt_id_q, custom_thanks_text : thanksTxt })
			.done(function (data) {
				if(data){
					alert('Tekst: "' + thanksTxt + '" , je uspjesno postavljeno za MT ' + mt_id_q + '!');
				} else {
					alert('Greška kod postavljanja teksta. Ponovite postavljanje ili kontaktirajte administratora!');
				}
			}
		);
	});

});

// load list of all MTs into drop down menu
function readMtList(){
	url_read_mt_list = './db/read_mt_list.php';
	$('.mt_list_admin').load(url_read_mt_list);
	$('.mt_list_q_admin').load(url_read_mt_list);
	$('.mt_list_thanks_admin').load(url_read_mt_list);
}

// load list of all Custom Questions into drop down menu
function readQuestionList(){
	url_read_q_list = './db/read_question_list.php';
	$('#q_list').load(url_read_q_list);
}

// load list of all Custom thanks messages into drop down menu
function readThanksList(){
	url_read_thanks_list = './db/read_thanks_list.php';
	$('#thanks_list').load(url_read_thanks_list);
}

function countVoteAmountRating(arr, rat){
	var counter = 0;
	for( i = 1; i < 6; i++ ){
		if ( arr[i] == rat ){
			counter++;
		}
	}
	return counter;
}
