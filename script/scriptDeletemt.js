$(document).ready(function() {
    readMtList();
    readQuestionList();
    readThanksList();

    // Delete MT
    $('.submit_button_delete_mt').on('click', function() {
        if( $('#delConfirmation').text().length > 0 ){
            return;
        }
        
        var chosenMt = $('#mt_list option:selected').html();
        var appendConfirmation = '</br>Are you sure?</br>Deleted place can not be recovered!'
                                + '</br>All data of that ID will be deleted!'
                                + '</br><button class="delete_button_yes" type="submit">Yes I am sure</button>'
                                + '</br><button class="delete_button_no" type="submit">No</button>';
        $('#delConfirmation').append(appendConfirmation);

        $('.delete_button_yes').on('click', function() {
		    var url_delete_mt = './db/delete_mt.php';

            $.post(url_delete_mt, { mt_id : chosenMt })
                .done(function (data) {
                    if(data){
                        alert('ID ' + chosenMt + ' has been deleted!');
                    } else {
                        alert('Error deleting the ID, contact the admin!');
                    }
                    readMtList();
                    $('#delConfirmation').empty();
                }
            );
        });

        $('.delete_button_no').on('click', function() {
            $('#delConfirmation').empty();
        });
    });

    /* Delete custom Question
    $('.submit_button_delete_question').on('click', function() {
        if( $('#delConfirmationQuestion').text().length > 0 ){
            return;
        }
        
        var chosenQ = $('#q_list option:selected').html();
        var appendConfirmation = '</br>Are you sure?</br>'
                                + '</br><button class="delete_button_q_yes" type="submit">Yes I am sure</button>'
                                + '</br><button class="delete_button_q_no" type="submit">No</button>';
        $('#delConfirmationQuestion').append(appendConfirmation);

        $('.delete_button_q_yes').on('click', function() {
		    var url_delete_q = './db/delete_question.php';

            $.post(url_delete_q, { q_txt : chosenQ })
                .done(function (data) {
                    if(data){
                        alert('Question ' + chosenQ + ' has been deleted!');
                    } else {
                        alert('Error deleting the question, contact the admin');
                    }
                    readQuestionList();
                }
            );
        });

        $('.delete_button_q_no').on('click', function() {
            $('#delConfirmationQuestion').empty();
        });
    });
    */

    // Delete Thanks text
    $('.submit_button_del_thanks').on('click', function() {
        if( $('#delConfirmationThanksText').text().length > 0 ){
            return;
        }
        
        var chosenText = $('#thanks_list option:selected').html();
        var appendConfirmation = '</br>Are you sure?</br>'
                                + '</br><button class="delete_button_txt_yes" type="submit">Yes I am sure</button>'
                                + '</br><button class="delete_button_txt_no" type="submit">No</button>';
        $('#delConfirmationThanksText').append(appendConfirmation);

        $('.delete_button_txt_yes').on('click', function() {
		    var url_delete_text = './db/delete_text.php';

            $.post(url_delete_text, { c_txt : chosenText })
                .done(function (data) {
                    if(data){
                        alert('Text "' + chosenText + '" has been deleted!');
                    } else {
                        alert('Error deleting the text, contact the admin!');
                    }
                    readThanksList();
                    $('#delConfirmationThanksText').empty();
                }
            );
        });

        $('.delete_button_txt_no').on('click', function() {
            $('#delConfirmationThanksText').empty();
        });
    });

});

// load list of all MTs into drop down menu
function readMtList(){
	url_read_mt_list = './db/read_mt_list.php';
	$('.mt_list_admin').load(url_read_mt_list);
}

// load list of all Custom Questions into drop down menu
function readQuestionList(){
	url_read_q_list = './db/read_question_list.php';
	$('.q_list_admin').load(url_read_q_list);
}

// load list of all Custom thanks messages into drop down menu
function readThanksList(){
	url_read_thanks_list = './db/read_thanks_list.php';
	$('.thanks_list_admin').load(url_read_thanks_list);
}
