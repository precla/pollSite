/****
	Xml page
****/

$(document).ready(function() {

	// get xml
	$('#submitButton').on('click', function() {
		var inputYear = $('#inputTextY').val();
		if(inputYear){
			var url_get_xml = './getxml/php_excel_get_custom.php?year=' + inputYear;

			window.open(url_get_xml);
		} else {
			alert("Niste ispravno unijeli godinu!");
		}
		
	});
});
