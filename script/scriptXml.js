/****
	Xml page
****/

$(document).ready(function() {

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
				$(".ui-datepicker-calendar").hide();
			}
		}
	});

	// get xml
	$('#submitButtonYear').on('click', function() {
		var inputYear = $('#inputTextY').val();
		if(inputYear){
			var url_get_xml = './getxml/php_excel_get_custom.php?year=' + inputYear;
			window.open(url_get_xml);
		} else {
			alert("Niste ispravno unijeli godinu!");
		}
	});
	$('#submitButtonMonth').on('click', function() {
		var inputMonth = $('#chosenDateM').val();
		if(inputMonth){
			var url_get_xml = './getxml/php_excel_get_custom_month.php?month=' + inputMonth;
			window.open(url_get_xml);
		} else {
			alert("Niste ispravno unijeli mjesec!");
		}
	});
	$('#submitButtonQuarter').on('click', function() {
		var inputQuarter = $("#quarterChoice input[type='radio']:checked").val();
		if(inputQuarter){
			var url_get_xml = './getxml/php_excel_get_custom_quarter.php?quarter=' + inputQuarter;
			window.open(url_get_xml);
		} else {
			alert("Niste odabrali kvartal!");
		}
	});
});
