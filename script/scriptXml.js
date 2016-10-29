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

	$('#mtCheckbox').on('click', function() {
		if($("#mtCheckbox").is(':checked')){
			$("#showMtChoice").hide();
		} else {
			$("#showMtChoice").show();
		}
	});

	// get xml

	$('#submitButtonDay').on('click', function() {
		
		var inputDay = $('#chosenDateD').val();
		selected_value_mt = $('#mt_list').val();
		var url_get_xml;

		if(inputDay){
			if(checkboxMtChecked()){
				url_get_xml = './getxml/php_excel_get_custom_day.php?day=' + inputDay;
			} else {
				url_get_xml = './getxml/php_excel_get_custom_day_mt.php?day=' + inputDay + '&mt_id=' + selected_value_mt;
			}

			window.open(url_get_xml);
		} else {
			alert("Day not valid!");
		}
	});

	$('#submitButtonMonth').on('click', function() {

		var inputMonth = $('#inputTextM').val();
		selected_value_mt = $('#mt_list').val();
		var url_get_xml;

		if(inputMonth){
			if(checkboxMtChecked()){
				url_get_xml = './getxml/php_excel_get_custom_month.php?year=' + inputMonth;
			} else {
				url_get_xml = './getxml/php_excel_get_custom_month_mt.php?year=' + inputMonth + '&mt_id=' + selected_value_mt;
			}

			window.open(url_get_xml);
		} else {
			alert("Month not valid!");
		}
	});

	$('#submitButtonQuarter').on('click', function() {

		var inputQuarter = $("#quarterChoice input[type='radio']:checked").val();
		selected_value_mt = $('#mt_list').val();
		var url_get_xml;

		if(inputQuarter){
			if(checkboxMtChecked()){
				url_get_xml = './getxml/php_excel_get_custom_quarter.php?quarter=' + inputQuarter;
			} else {
				url_get_xml = './getxml/php_excel_get_custom_quarter_mt.php?quarter=' + inputQuarter + '&mt_id=' + selected_value_mt;
			}

			window.open(url_get_xml);
		} else {
			alert("You did not choose a quarter!");
		}
	});

	$('#submitButtonYear').on('click', function() {

		var inputYear = $('#inputTextY').val();
		selected_value_mt = $('#mt_list').val();
		var url_get_xml;

		if(inputYear){
			if(checkboxMtChecked()){
				url_get_xml = './getxml/php_excel_get_custom.php?year=' + inputYear;
			} else {
				url_get_xml = './getxml/php_excel_get_custom_mt.php?year=' + inputYear + '&mt_id=' + selected_value_mt;
			}

			window.open(url_get_xml);
		} else {
			alert("Not a proper year!");
		}
	});

});

// load list of all MTs into drop down menu
function readMtList(){
	url_read_mt_list = './db/read_mt_list.php';
	$('.mt_list_admin').load(url_read_mt_list);
}

function checkboxMtChecked(){
	if(document.getElementById('mtCheckbox').checked){
		selected_value_mt = "";
		return true;
	} else {
		selected_value_mt = $('#mt_list').val();
		return false;
	}
}
