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
        var appendConfirmation = '</br>Jeste sigurni?</br>Izbrisani MT se ne može vratiti!'
                                + '</br>Svi zabilježeni glasovi za vezani MT se brišu!'
                                + '</br><button class="delete_button_yes" type="submit">Da, siguran sam</button>'
                                + '</br><button class="delete_button_no" type="submit">Ipak ne želim izbrisati MT</button>';
        $('#delConfirmation').append(appendConfirmation);

        $('.delete_button_yes').on('click', function() {
		    var url_delete_mt = './db/delete_mt.php';

            $.post(url_delete_mt, { mt_id : chosenMt })
                .done(function (data) {
                    if(data){
                        alert('MT ' + chosenMt + ' je izbrisan!');
                    } else {
                        alert('Greška kod brisanja MT-a. Ponovite brisanje ili kontaktirajte administratora!');
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
        var appendConfirmation = '</br>Jeste sigurni?</br>'
                                + '</br><button class="delete_button_q_yes" type="submit">Da, siguran sam</button>'
                                + '</br><button class="delete_button_q_no" type="submit">Ipak ne želim izbrisati</button>';
        $('#delConfirmationQuestion').append(appendConfirmation);

        $('.delete_button_q_yes').on('click', function() {
		    var url_delete_q = './db/delete_question.php';

            $.post(url_delete_q, { q_txt : chosenQ })
                .done(function (data) {
                    if(data){
                        alert('Pitanje ' + chosenQ + ' je izbrisano!');
                    } else {
                        alert('Greška kod brisanja pitanja. Ponovite brisanje ili kontaktirajte administratora!');
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
        var appendConfirmation = '</br>Jeste sigurni?</br>'
                                + '</br><button class="delete_button_txt_yes" type="submit">Da, siguran sam</button>'
                                + '</br><button class="delete_button_txt_no" type="submit">Ipak ne želim izbrisati text</button>';
        $('#delConfirmationThanksText').append(appendConfirmation);

        $('.delete_button_txt_yes').on('click', function() {
		    var url_delete_text = './db/delete_text.php';

            $.post(url_delete_text, { c_txt : chosenText })
                .done(function (data) {
                    if(data){
                        alert('Text "' + chosenText + '" je izbrisan!');
                    } else {
                        alert('Greška kod brisanja teksta. Ponovite brisanje ili kontaktirajte administratora!');
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
