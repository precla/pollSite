/****
	Xml page
****/

$(document).ready(function() {

	readMtList();

	// load datepicker and set format of date
	$('.date-picker-Day').datepicker({
		dateFormat: 'dd-mm-yy'
	});

	$('.date-picker').datepicker({
		dateFormat: "mm-yy",
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		onClose: function(dateText, inst) {
			function isDonePressed() {
				return ($('#ui-datepicker-div').html().indexOf('ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover') > -1);
			}
			if (isDonePressed()) {
				var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
				var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
				$(this).datepicker('setDate', new Date(year, month, 1)).trigger('change');
				$('.date-picker').focusout() //Added to remove focus from datepicker input box on selecting date
			}
		},
		beforeShow: function(input, inst) {
			inst.dpDiv.addClass('month_year_datepicker')
			if ((datestr = $(this).val()).length > 0) {
				year = datestr.substring(datestr.length - 4, datestr.length);
				month = datestr.substring(0, 2);
				$(this).datepicker('option', 'defaultDate', new Date(year, month - 1, 1));
				$(this).datepicker('setDate', new Date(year, month - 1, 1));
				// $(".ui-datepicker-calendar").hide();
			}
		}
	});

	$('#chosenDateD').val(moment().format("D-MM-YYYY"));
	$('#chosenDateM').val(moment().format("MM-YYYY"));

	var selected_value_mt;

	// get xml

	$('#submitButtonDay').on('click', function() {
		selected_value_mt = $('#mt_list').val();
		var inputDay = $('#chosenDateD').val();
		if(inputDay){
			var url_get_xml = './getxml/php_excel_get_custom_day.php?day=' + inputDay + '&mt_id=' + selected_value_mt;
			window.open(url_get_xml);
		} else {
			alert("Niste ispravno unijeli dan!");
		}
	});

	$('#submitButtonMonth').on('click', function() {
		selected_value_mt = $('#mt_list').val();
		var inputMonth = $('#chosenDateM').val();
		if(inputMonth){
			var url_get_xml = './getxml/php_excel_get_custom_month.php?month=' + inputMonth + '&mt_id=' + selected_value_mt;;
			window.open(url_get_xml);
		} else {
			alert("Niste ispravno unijeli mjesec!");
		}
	});

	$('#submitButtonQuarter').on('click', function() {
		selected_value_mt = $('#mt_list').val();
		var inputQuarter = $("#quarterChoice input[type='radio']:checked").val();
		if(inputQuarter){
			var url_get_xml = './getxml/php_excel_get_custom_quarter.php?quarter=' + inputQuarter + '&mt_id=' + selected_value_mt;;
			window.open(url_get_xml);
		} else {
			alert("Niste odabrali kvartal!");
		}
	});

	$('#submitButtonYear').on('click', function() {
		selected_value_mt = $('#mt_list').val();
		var inputYear = $('#inputTextY').val();
		if(inputYear){
			var url_get_xml = './getxml/php_excel_get_custom.php?year=' + inputYear + '&mt_id=' + selected_value_mt;;
			window.open(url_get_xml);
		} else {
			alert("Niste ispravno unijeli godinu!");
		}
	});

});

// load list of all MTs into drop down menu
function readMtList(){
	url_read_mt_list = './db/read_mt_list.php';
	$('.mt_list_admin').load(url_read_mt_list);
}
