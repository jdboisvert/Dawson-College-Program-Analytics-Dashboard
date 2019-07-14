//Make this in the future load from a text file
function getRandomMessage(){

    return "Just scrapping the website. Should only take a few moments!";

}

//Function used to generate random texts about the loading process
function loadingMessages(){

    //An infinite loop to ensure messages are always displayed
    while (true){

        let message = getRandomMessage();
        $('#viewboardContainer').html(message);

    }


}

//When document is loaded
$(document).ready(function() {
    
    $('#viewboard').submit(function(e){
        $('#loader').css('display', 'block'); 
        $('#viewboard').css('display', 'none');
        loadingMessages();

    });


});