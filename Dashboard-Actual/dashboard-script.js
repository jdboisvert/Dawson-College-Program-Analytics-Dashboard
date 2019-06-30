//Function used to make pie chart showing distribution of newest program counts
function makeYearlyPieChart() {
    var ctx = document.getElementById("newestPrograms").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["2014", "2015", "2016", "2017", "2018", "2019"],
            datasets: [{
                data: [80, 45, 25, 50, 10, 50],
                backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255, 205, 86)", "rgb(34,139,34)", "rgb(128,0,128)", "rgb(255, 180, 86)"]
            }]

        },
    });

}

function makeTableLatest(){

    $('#latestPrograms').after('<div id="nav"></div>');
    var rowsShown = 7;
    var rowsTotal = $('#latestPrograms tbody tr').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        $('#nav').append('<a href="#latestProgram" rel="' + i + '">' + pageNum + '</a> ');
    }
    $('#latestPrograms tbody tr').hide();
    $('#latestPrograms tbody tr').slice(0, rowsShown).show();
    $('#nav a:first').addClass('active');
    $('#nav a').bind('click', function() {

        $('#nav a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#latestPrograms tbody tr').css('opacity', '0.0').hide().slice(startItem, endItem).
        css('display', 'table-row').animate({
            opacity: 1
        }, 300);
    });

}

//Simply load JSON file into memory 
function loadJSONData(){

    $.getJSON("https://api.myjson.com/bins/hn1z7", function(json) {
        let stats = json; // this will show the info it in firebug console
        generalStats(stats); 
    });

}

function generalStats(stats){

    $("#totalCount").html(stats['Total']);
    $("#programCount").html(stats['Number of Programs']);
    $("#profileCount").html(stats['Number of Profiles']);
    $("#disciplineCount").html(stats['Number of Disciplines']);
    $("#specialCount").html(stats['Number of Special']);
    $("#generalEduCount").html(stats['Number of General']);

}

//When document is loaded
$(document).ready(function() {
    
    //Load JSON file with data 
    loadJSONData();
    //Populate general stats
    //generalStats(stats);
    //Make yearly pie chart
    makeYearlyPieChart();
    //Make latest table have pagination / populate
    makeTableLatest();

});