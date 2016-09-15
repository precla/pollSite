$(document).ready(function() {
    readMtList();

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
                        $('#delConfirmation').append('MT ' + chosenMt + ' je izbrisan!');
                        $('#delConfirmation').empty();
                    } else {
                        alert('Greška kod brisanja MT-a. Ponovite brisanje ili kontaktirajte administratora!');
                    }
                    readMtList();
                }
            );
        });

        $('.delete_button_no').on('click', function() {
            $('#delConfirmation').empty();
        });

    });

});

// load list of all MTs into drop down menu
function readMtList(){
	url_read_mt_list = './db/read_mt_list.php';
	$('.mt_list_admin').load(url_read_mt_list);
}
