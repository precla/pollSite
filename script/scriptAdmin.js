jQuery.ajaxSetup({async:false});

/****
	Admin page
****/

$(document).ready(function() {
	$('#infoTarget').hide();
	var selected_value_mt;

	// load datepicker and set format of date
	$('#datepicker').datepicker({
		dateFormat: 'dd-mm-yy'
	});

	document.getElementById('datepicker').value = moment().format("D-MM-YYYY");

	$('.show_settings').on('click', function() {
		if( $('.show_settings').html() == 'Hide settings' ){
			$('.show_settings').text('Show settings');
			$('#admin_functions').hide("blind");
		} else {
			$('.show_settings').text('Hide settings');
			$('#admin_functions').show("blind");
		}
	});

	reloadStuff();

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
				alert('No data for that date!');
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

			for(var i = 0; i < 4; i++){
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

			for(var i = 0; i < votesArray.length; i++){
				votesQone[i] = 0;
				votesQtwo[i] = 0;
				votesQthree[i] = 0;
				votesQfour[i] = 0;
			}

			voteDate = votesArray[0][3];
			voteQuestion = votesArray[0][6];

			var currVote, nextVote, count = 0;

			currVote = moment(voteDate + ' ' + votesArray[0][7]);
			var vArrayLength = votesArray.length;

			for(i = 1, j = 0; i < vArrayLength; i++){

				// make votes sum in 20min blocks
				nextVote = moment(voteDate + ' ' + votesArray[i][7]);

				var stepMin = $("#step_min").val();

				if( (nextVote.diff(currVote, 'minutes') <= stepMin) && (i < vArrayLength-1) ){
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

					count = 1;
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

			for(var i = 0; i < 4; i++){
				votesAverage[i] = (votesAmount[i] / votesTotal).toFixed(2);
			}

			/* clear current chart, if any exist, before rendering new */
			if(votesQoneChart || votesQtwoChart || votesQthreeChart || votesQfourChart || votesTotalRadarChart){
				votesQoneChart.destroy();
				votesQtwoChart.destroy();
				votesQthreeChart.destroy();
				votesQfourChart.destroy();
				votesTotalRadarChart.destroy();
			}

			// chart colors
			var backgroundColorSet = "rgba(10, 50, 250, 0.2)";
			var borderColorSet = "rgba(5, 20, 255, 1)";

			// line chart #1
			votesQoneChart = new Chart(ctxOne, {
				type: 'line',
				data: {
					labels: voteTime,
					datasets: [{
						label: 'Average rating in that moment',
						data: votesQone,
						backgroundColor: backgroundColorSet,
						borderColor: borderColorSet,
						borderWidth: 1
					}]
				},
				options: {
					responsive: false,
					title: {
						display: true,
						text: 'Average rating for "How are you satisifed with the quality?": ' + votesAverage[0]
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

			// bar chart #2
			votesQtwoChart = new Chart(ctxTwo, {
				type: 'line',
				data: {
					labels: voteTime,
					datasets: [{
						label: 'Average rating in that moment',
						data: votesQtwo,
						backgroundColor: backgroundColorSet,
						borderColor: borderColorSet,
						borderWidth: 1
					}]
				},
				options: {
					responsive: false,
					title: {
						display: true,
						text: 'Average rating for "How satisfied are you with the choice?": ' + votesAverage[1]
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

			// bar chart #3
			votesQthreeChart = new Chart(ctxThree, {
				type: 'line',
				data: {
					labels: voteTime,
					datasets: [{
						label: 'Average rating in that moment',
						data: votesQthree,
						backgroundColor: backgroundColorSet,
						borderColor: borderColorSet,
						borderWidth: 1
					}]
				},
				options: {
					responsive: false,
					title: {
						display: true,
						text: 'Average rating for "How do you like the new design of our place?": ' + votesAverage[2]
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

			// bar chart #4
			var get_custom_question = './db/question_get_date.php';
			posting = $.get(get_custom_question, { mt_id: selected_value_mt, date: selected_date });

			posting.done(function( data ) {
				
				votesQfourChart = new Chart(ctxFour, {
					type: 'line',
					data: {
						labels: voteTime,
						datasets: [{
							label: 'Average rating in that moment',
							data: votesQfour,
							backgroundColor: backgroundColorSet,
						borderColor: borderColorSet,
							borderWidth: 1
						}]
					},
					options: {
						responsive: false,
						title: {
							display: true,
							text: 'Average rating for "' + data + '": ' + votesAverage[3]
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
			});

			// radar chart
			get_votes_mt_amount = './db/get_votes_mt_amount.php';
			posting = $.get(get_votes_mt_amount, { mt_id: selected_value_mt, date: selected_date });

			posting.done(function( data ) {

				if(data.length < 5){
					alert('No data for that Date!');
					exit();
				}
				votesTotalAmount = [];

				votesArray = $.parseJSON(data);

				for(var i = 0; i<5; i++){
					votesTotalAmount[i] = parseInt(votesArray[i]);
				}

				// radar chart for sum of votes
				votesTotalRadarChart = new Chart(ctxRadar, {
					type: "radar",
					data: {
						labels: ["1", "2", "3", "4", "5"],
						datasets: [
							{
								label: "Total number of votes for that Date",
								backgroundColor: backgroundColorSet,
								borderColor: borderColorSet,
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
			$("#vote_charts").show("blind");

			// Targets:
			$('#infoTarget').hide();

			$('#targets_w').empty();
			$('#targets_m').empty();
			$('#targets_q').empty();
			$('#targets_y').empty();

			var get_target_values = './db/target_get.php';
			posting = $.get(get_target_values, { mt_id: selected_value_mt });
			posting.done(function( data ) {
				var targetVal = [];

				targetVal = $.parseJSON(data);

				// q_one_m	q_two_m	 q_three_m 	q_four_m 	q_one_q   q_two_q 	q_three_q 	q_four_q 	q_one_y 	q_two_y 	q_three_y 	q_four_y
				// 2.9",	"3",	 "3.8",		"3.9",		"2.3",    "2.3",	"3.5",		"3.7",		"1.7",		"3.1",		"3.3",		"3.3"
				if(targetVal){
					
					var tWeekValArrayAvg = [];
					var tMonthValArrayAvg = [];
					var tQuarterValArrayAvg = [];
					var tYearValArrayAvg = [];

					var currentWeekNumber = moment(selected_date, "DD-MM-YYYY").isoWeek();

					var weekStart = moment().startOf('isoWeek');
					var weekEnd = moment().endOf('isoWeek');

					weekStart = weekStart.subtract(moment(weekStart, "YYYY-MM-DD").isoWeek() - currentWeekNumber, 'weeks').format('L');
					weekEnd = weekEnd.subtract(moment(weekEnd, "YYYY-MM-DD").isoWeek() - currentWeekNumber, 'weeks').format('L');

					var url_get_target_votes = './db/get_votes_mt_target_avg.php';
					var getting = $.get(url_get_target_votes, { mt_id: selected_value_mt, date_start: weekStart, date_end: weekEnd, curr_date: selected_date });

					getting.done(function(data){
						var targetAverageValues = $.parseJSON(data);

						// any value that has a null means it has no data for that range
						// from 0 to 3 is for week
						if(targetAverageValues[0]){
							tWeekValArrayAvg[0] = parseFloat(targetAverageValues[0]);
							tWeekValArrayAvg[1] = parseFloat(targetAverageValues[1]);
							tWeekValArrayAvg[2] = parseFloat(targetAverageValues[2]);
							tWeekValArrayAvg[3] = parseFloat(targetAverageValues[3]);
						} else {
							tWeekValArrayAvg[0] = tWeekValArrayAvg[1] = tWeekValArrayAvg[2] = tWeekValArrayAvg[3] = 'NV';
						}

						// from 4 to 7 is for month
						if(targetAverageValues[0]){
							tMonthValArrayAvg[0] = parseFloat(targetAverageValues[4]);
							tMonthValArrayAvg[1] = parseFloat(targetAverageValues[5]);
							tMonthValArrayAvg[2] = parseFloat(targetAverageValues[6]);
							tMonthValArrayAvg[3] = parseFloat(targetAverageValues[7]);
						} else {
							tMonthValArrayAvg[0] = tMonthValArrayAvg[1] = tMonthValArrayAvg[2] = tMonthValArrayAvg[3] = 'NV';
						}

						// from 8 to 11 is for quarter
						if(targetAverageValues[0]){
							tQuarterValArrayAvg[0] = parseFloat(targetAverageValues[8]);
							tQuarterValArrayAvg[1] = parseFloat(targetAverageValues[9]);
							tQuarterValArrayAvg[2] = parseFloat(targetAverageValues[10]);
							tQuarterValArrayAvg[3] = parseFloat(targetAverageValues[11]);
						} else {
							tQuarterValArrayAvg[0] = tQuarterValArrayAvg[1] = tQuarterValArrayAvg[2] = tQuarterValArrayAvg[3] = 'NV';
						}

						// from 12 to 15 is for year
						if(targetAverageValues[0]){
							tYearValArrayAvg[0] = parseFloat(targetAverageValues[12]);
							tYearValArrayAvg[1] = parseFloat(targetAverageValues[13]);
							tYearValArrayAvg[2] = parseFloat(targetAverageValues[14]);
							tYearValArrayAvg[3] = parseFloat(targetAverageValues[15]);
						} else {
							tYearValArrayAvg[0] = tYearValArrayAvg[1] = tYearValArrayAvg[2] = tYearValArrayAvg[3] = 'NV';
						}
					});

					var i = 0;
					while(i < 4){

						// week (+1)
						$("#targets_w").append('<p>' + parseInt(i+1) + '. question:&nbsp</p>');
	
						if(tWeekValArrayAvg[i].toFixed(2) < parseFloat(targetVal[i+1])) {
							$("#targets_w").append('<div id="redTxt">' + tWeekValArrayAvg[i].toFixed(2) + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+1]) + '</div>');
						} else {
							$("#targets_w").append('<div id="greenTxt">' + tWeekValArrayAvg[i].toFixed(2) + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+1]) + '</div>');
						}

						// month (+5)
						$("#targets_m").append('<p>' + parseInt(i+1) + '. question:&nbsp</p>');
						if(tMonthValArrayAvg[i].toFixed(2) < parseFloat(targetVal[i+5])) {
							$("#targets_m").append('<div id="redTxt">' + tMonthValArrayAvg[i].toFixed(2) + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+5]) + '</div>');
						} else {
							$("#targets_m").append('<div id="greenTxt">' + tMonthValArrayAvg[i].toFixed(2) + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+5]) + '</div>');
						}

						// quarter (+9)
						$("#targets_q").append('<p>' + parseInt(i+1) + '. question:&nbsp</p>');
						if(tQuarterValArrayAvg[i].toFixed(2) < parseFloat(targetVal[i+9])) {
							$("#targets_q").append('<div id="redTxt">' + tQuarterValArrayAvg[i].toFixed(2) + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+9]) + '</div>');
						} else {
							$("#targets_q").append('<div id="greenTxt">' + tQuarterValArrayAvg[i].toFixed(2) + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+5]) + '</div>');
						}

						// year (+13)
						$("#targets_y").append('<p>' + parseInt(i+1) + '. question:&nbsp</p>');
						if(tYearValArrayAvg[i].toFixed(2) < parseFloat(targetVal[i+13])) {
							$("#targets_y").append('<div id="redTxt">' + tYearValArrayAvg[i].toFixed(2) + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+13]) + '</div>');
						} else {
							$("#targets_y").append('<div id="greenTxt">' + tYearValArrayAvg[i].toFixed(2) + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+13]) + '</div>');
						}
						i++;
					}

					$("#infoTarget").show("blind");
				}
			});

		});
	});

/* Chart rendering END */

	// add new MT
	$('.submit_button_add_mt').on('click', function() {
		var new_mt_id = $('#new_mt_id').val();
		var new_mt_name = $('#new_mt_name').val();
		var questionTxt = $('#q_list option:selected').html();
		questionTxt = 'Rate the ambient of the place';
		
		if( !$.isNumeric(new_mt_id) ){
			alert('Inserted "ID" is not a number, please remove non-numeric characters!');
		} else if(new_mt_id && new_mt_name){
			var url_set_new_mt = './db/add_mt.php';
			$.post(url_set_new_mt, { mt_id_key: new_mt_id, mt_name: new_mt_name, custom_q_text: questionTxt })
				.done(function (data) {
					if(data){
						alert('ID ' + new_mt_id + ' , "' + new_mt_name + '" has been successfully added into the database!\n'
								+ 'Fourth question set to: ' + questionTxt);
						reloadStuff();
					} else {
						alert('Error adding ID, does it exist already? Contact the admin!');
					}
				}
			);
			$('#new_mt_id').val('');
			$('#new_mt_name').val('');
			
		} else if( $.isNumeric(new_mt_id) ){
			alert('Not all requiered data has been set!');
		}
	});

	// submit new custom question
	$('.submit_button_add_question').on('click', function() {
		var new_question = $('#new_question_text').val();
		var url_set_new_question = './db/question_add.php';

		if(new_question.length < 1 || new_question.length > 255){
			alert("Input can't be empty and has to be less than 255 characters.\nPlease repeat!");
		} else {
			$.post(url_set_new_question, { question_text : new_question })
				.done(function (data) {
					if(data){
						reloadStuff();
						alert('Question: "' + new_question + '" , has been successfully added!');
					} else {
						alert('Error adding question.\nRepeat or contact admin!');
					}
				}
			);
			$('#new_question_text').val('');
		}
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
					reloadStuff();
					alert('Question: "' + questionTxt + '" , has been successfully set for ID ' + mt_id_q + '!');
				} else {
					alert('Error setting the question. Repeat or contact the admin!');
				}
			}
		);
	});

	// submit thanks message for MT
	$('.submit_button_thanks_message').on('click', function() {
		var new_thanks = $('#new_thanks_text').val();
		var url_set_new_thanks = './db/thanks_add.php';

		if(new_thanks.length < 1 || new_thanks.length > 255){
			alert("Input can't be empty and has to be less than 255 characters.\nPlease repeat!");
		} else {
			$.post(url_set_new_thanks, { custom_thanks_text : new_thanks })
				.done(function (data) {
					if(data){
						reloadStuff();
						alert('Tekst: "' + new_thanks + '" , has been succssfully add into the database!');
					} else {
						alert('Error adding the info text. Repeat or contact the admin!');
					}
				}
			);
			$('#new_thanks_text').val('');
		}
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
					alert('Tekst: "' + thanksTxt + '" , Has been successfully set for ID ' + mt_id_q + '!');
				} else {
					alert('Error setting the text. Repeat or contact the admin!');
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

function reloadStuff(){
	readMtList();
	readQuestionList();
	readThanksList();
}