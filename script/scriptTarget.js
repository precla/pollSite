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
            document.getElementById('custom_question').prepend(data);
        });

        $(".submit_choice").prop('disabled', true);

        // disable drop down and button
        $("#mt_list").prop('disabled', true);
        $("#set-target-values").show("blind");
    });

    $(".submit_target_values").on('click', function(){
        // week values
        var qOne_w      =   $("#q_one_target_week").val();
        var qTwo_w      =   $("#q_two_target_week").val();
        var qThree_w    =   $("#q_three_target_week").val();
        var qFour_w     =   $("#q_four_target_week").val();
        
        // month values
        var qOne_m      =   $("#q_one_target_month").val();
        var qTwo_m      =   $("#q_two_target_month").val();
        var qThree_m    =   $("#q_three_target_month").val();
        var qFour_m     =   $("#q_four_target_month").val();

        // quarter values
        var qOne_q      =   $("#q_one_target_quarter").val();
        var qTwo_q      =   $("#q_two_target_quarter").val();
        var qThree_q    =   $("#q_three_target_quarter").val();
        var qFour_q     =   $("#q_four_target_quarter").val();

        // year values
        var qOne_y      =   $("#q_one_target_year").val();
        var qTwo_y      =   $("#q_two_target_year").val();
        var qThree_y    =   $("#q_three_target_year").val();
        var qFour_y     =   $("#q_four_target_year").val();

        if( qOne_w != 0 && qTwo_w != 0 && qThree_w != 0 && qFour_w != 0 &&
            qOne_m != 0 && qTwo_m != 0 && qThree_m != 0 && qFour_m != 0 &&
            qOne_q != 0 && qTwo_q != 0 && qThree_q != 0 && qFour_q != 0 &&
            qOne_y != 0 && qTwo_y != 0 && qThree_y != 0 && qFour_y != 0     ) {

			set_target_mt = './db/target_set.php';

            selected_value_mt = $("#mt_list option:selected").val();

			posting = $.post(set_target_mt, { mt_id: selected_value_mt,
                            q_one_w: qOne_w,  q_two_w: qTwo_w,  q_three_w: qThree_w,  q_four_w: qFour_w,
                            q_one_m: qOne_m,  q_two_m: qTwo_m,  q_three_m: qThree_m,  q_four_m: qFour_m,
                            q_one_q: qOne_q,  q_two_q: qTwo_q,  q_three_q: qThree_q,  q_four_q: qFour_q,
                            q_one_y: qOne_y,  q_two_y: qTwo_y,  q_three_y: qThree_y,  q_four_y: qFour_y });

			posting.done(function( data ) {
                if (data != false ) {
                    $("#set-target-values").hide("blind");
                    alert("Vrijednosti uspješno postavljene.");
                    
                    // enable drop down and button
                    $("#mt_list").prop('disabled', false);
                    $(".submit_choice").prop('disabled', false);
                }
            });
        } else {
            alert("Neispravne vrijednosti! Molimo provjerite postavljene vrijednosti.");
        }
    });

});

// load list of all MTs into drop down menu
function readMtList(){
	url_read_mt_list = './db/read_mt_list.php';
	$('#mt_list').load(url_read_mt_list);
}