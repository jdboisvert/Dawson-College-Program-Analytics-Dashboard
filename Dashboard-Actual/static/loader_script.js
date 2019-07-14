//Function used to generate random texts about the loading process
function loadingMessages() {


    let message = "Just scrapping the website. Should only take a few moments!";
    $('#message').html(message);


}

//When document is loaded
$(document).ready(function() {

    $('#viewboard').submit(function(e) {
        $('#loader').css('display', 'block');
        $('#viewboard').css('display', 'none');
        loadingMessages();

    });


});