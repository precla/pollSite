$(document).ready(function() {
    var mtId= $('#mtId').html();
    var sendUrl = './db/get_thanks_text.php';

    $.post( sendUrl, { mt_id: mtId } )
        .done(function (data) {
            document.getElementById('custom_thanks_text').innerHTML = data;
        }
    );
});
