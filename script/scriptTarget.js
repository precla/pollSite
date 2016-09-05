/****
	Target page
****/

$(document).ready(function() {

    readMtList();

    /* Load custom question for MT */
    loadedQuestion = './db/question_get.php';

    var selected_value_mt;

    $(".submit_choice").on('click', function(){

        selected_value_mt = $("#mt_list option:selected").val();
        var getQtxt = $.get(loadedQuestion, { mt_id: selected_value_mt });

        getQtxt.done(function( data ) {
            document.getElementById('custom_question')
                .innerHTML = data + ' <input type="number" id="q_four_target" value="0" step="0.1" min="1" max="5">';
        });

        $("#set-target-values").show("blind");
    });

    $(".submit_target_values").on('click', function(){
        var qOne = $("#q_one_target").val();
        var qTwo = $("#q_two_target").val();
        var qThree = $("#q_three_target").val();
        var qFour = $("#q_four_target").val();

        if( qOne != 0 && qTwo != 0 && qThree != 0 && qFour != 0 ){
			set_target_mt = './db/target_set.php';
			posting = $.post(set_target_mt, { mt_id: selected_value_mt, q_one: qOne, q_two: qTwo, q_three: qThree, q_four: qFour });

			posting.done(function( data ) {
                alert("Vrijednosti uspješno postavljene.");
            });
        } else {
            alert("Neispravne vrijednosti! Molimo provjerite postavljene vrijendosti.");
        }
    });

});

// load list of all MTs into drop down menu
function readMtList(){
	url_read_mt_list = './db/read_mt_list.php';
	$('#mt_list').load(url_read_mt_list);
}