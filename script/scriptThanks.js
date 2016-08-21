$(document).ready(function() {
    var mtId= $('#mtId').html();
    var sendUrl = './db/get_thanks_text.php';

    $.post( sendUrl, { mt_id: mtId } )
        .done(function (data) {
            if(data == 'Failed to connect to MySQL'){
                // do nothing
            } else if (data) {
                var customThanksText = $.parseJSON(data);

            }
        }
    );
});
