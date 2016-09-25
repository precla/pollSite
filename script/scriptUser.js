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

	document.getElementById('datepicker').value = moment().format("D-MM-YYYY");;

	$('.show_settings').on('click', function() {
		if( $('.show_settings').html() == 'Sakrij postavke' ){
			$('.show_settings').text('Prikaži postavke');
			$('#admin_functions').hide("blind");
		} else {
			$('.show_settings').text('Sakrij postavke');
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
						label: 'Prosječna ocjena u tom trenutku',
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
						text: 'Prosječna ocjena za "Koliko ste zadovoljni uslugom restorana?": ' + votesAverage[0]
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
						label: 'Prosječna ocjena u tom trenutku',
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
						text: 'Prosječna ocjena za "Koliko ste zadovoljni kvalitetom ponude?": ' + votesAverage[1]
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
						label: 'Prosječna ocjena u tom trenutku',
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
						text: 'Prosječna ocjena za "Koliko ste zadovoljni raznovrsnošću ponude?": ' + votesAverage[2]
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
							label: 'Prosječna ocjena u tom trenutku',
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
							text: 'Prosječna ocjena za "' + data + '": ' + votesAverage[3]
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
					alert('Nema podataka za taj datum!');
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
								label: "Ukupan broj ocjena",
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

					//var currDate = moment().format('L');
					
					selected_date;

					var weekStart = moment().startOf('isoWeek').format('YYYY-MM-DD');
					var weekEnd = moment().endOf('isoWeek').format('YYYY-MM-DD');

					var tWeekValArrayAvg = [];
					var tMonthValArrayAvg = [];
					var tQuarterValArrayAvg = [];
					var tYearValArrayAvg = [];

					var url_get_target_votes = './db/get_votes_mt_target_avg.php';
					var getting = $.get(url_get_target_votes, { mt_id: selected_value_mt, date_start: weekStart, date_end: weekEnd });

					getting.done(function(data){
						var targetAverageValues = $.parseJSON(data);

						// from 0 to 3 is for week
						tWeekValArrayAvg[0] = parseFloat(targetAverageValues[0]);
						tWeekValArrayAvg[1] = parseFloat(targetAverageValues[1]);
						tWeekValArrayAvg[2] = parseFloat(targetAverageValues[2]);
						tWeekValArrayAvg[3] = parseFloat(targetAverageValues[3]);

						// from 4 to 7 is for month
						tMonthValArrayAvg[0] = parseFloat(targetAverageValues[4]);
						tMonthValArrayAvg[1] = parseFloat(targetAverageValues[5]);
						tMonthValArrayAvg[2] = parseFloat(targetAverageValues[6]);
						tMonthValArrayAvg[3] = parseFloat(targetAverageValues[7]);

						// from 8 to 11 is for quarter
						tQuarterValArrayAvg[0] = parseFloat(targetAverageValues[8]);
						tQuarterValArrayAvg[1] = parseFloat(targetAverageValues[9]);
						tQuarterValArrayAvg[2] = parseFloat(targetAverageValues[10]);
						tQuarterValArrayAvg[3] = parseFloat(targetAverageValues[11]);

						// from 12 to 15 is for year
						tYearValArrayAvg[0] = parseFloat(targetAverageValues[12]);
						tYearValArrayAvg[1] = parseFloat(targetAverageValues[13]);
						tYearValArrayAvg[2] = parseFloat(targetAverageValues[14]);
						tYearValArrayAvg[3] = parseFloat(targetAverageValues[15]);

					});

					var i = 0;
					while(i < 4){

						// week (+1)
						$("#targets_w").append('<p>' + parseInt(i+1) + '. pitanje:&nbsp</p>');
	
						if(tWeekValArrayAvg[i] < parseFloat(targetVal[i+1])) {
							$("#targets_w").append('<div id="redTxt">' + tWeekValArrayAvg[i] + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+1]) + '</div>');
						} else {
							$("#targets_w").append('<div id="greenTxt">' + tWeekValArrayAvg[i] + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+1]) + '</div>');
						}

						// month (+5)
						$("#targets_m").append('<p>' + parseInt(i+1) + '. pitanje:&nbsp</p>');
						if(tMonthValArrayAvg[i] < parseFloat(targetVal[i+5])) {
							$("#targets_m").append('<div id="redTxt">' + tMonthValArrayAvg[i] + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+5]) + '</div>');
						} else {
							$("#targets_m").append('<div id="greenTxt">' + tMonthValArrayAvg[i] + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+5]) + '</div>');
						}

						// quarter (+9)
						$("#targets_q").append('<p>' + parseInt(i+1) + '. pitanje:&nbsp</p>');
						if(tQuarterValArrayAvg[i] < parseFloat(targetVal[i+9])) {
							$("#targets_q").append('<div id="redTxt">' + tQuarterValArrayAvg[i] + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+9]) + '</div>');
						} else {
							$("#targets_q").append('<div id="greenTxt">' + tQuarterValArrayAvg[i] + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+5]) + '</div>');
						}

						// year (+13)
						$("#targets_y").append('<p>' + parseInt(i+1) + '. pitanje:&nbsp</p>');
						if(tYearValArrayAvg[i] < parseFloat(targetVal[i+13])) {
							$("#targets_y").append('<div id="redTxt">' + tYearValArrayAvg[i] + '</div>'
									+ '<div id="blueTxt">&nbsp/ ' + parseFloat(targetVal[i+13]) + '</div>');
						} else {
							$("#targets_y").append('<div id="greenTxt">' + tYearValArrayAvg[i] + '</div>'
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

function calcTargets(){
	readMtList();
	readQuestionList();
	readThanksList();
}
