function getYearValues(stats){

    let yearCountsStr = stats['Year Counts'];
    let yearCountsUnFormatted = yearCountsStr.split(',');
    let yearCounts = {}; 

    for(let i = 0; i < yearCountsUnFormatted.length; i++){

        let values = yearCountsUnFormatted[i].split(':');
        //Ensure only numbers are stored
        yearCounts[values[0].replace(/[^0-9]/g, '')] = values[1].replace(/[^0-9]/g, '');

    }

    return yearCounts; 

}


//Function used to make pie chart showing distribution of newest program counts
function makeYearlyPieChart(stats) {

    //Get dictonayr of values
    let yearlyStats = getYearValues(stats);
    //Get key values
    const keys = Object.keys(yearlyStats);

    //Build an array of the values that match the key
    values = []
    for(let i = 0; i < keys.length; i++){

        values.push(yearlyStats[keys[i]]);

    }

    //Build pie graph
    var ctx = document.getElementById("newestPrograms").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: keys,
            datasets: [{
                data: values,
                //Extra colors are added in case there are more than 6 years present
                backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)", "rgb(255,140,0)", "rgb(34,139,34)", "rgb(128,0,128)", "rgb(255, 180, 86)", "rgb(165,42,42)", "rgb(128,128,128)"]
            }]

        },
    });

}

function makeTableLatestPagination(){

    $('#latestPrograms').after('<div id="nav"></div>');
    var rowsShown = 7;
    var rowsTotal = $('#latestPrograms tbody tr').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        var pageNum = i + 1;
        $('#nav').append('| <a href="#latestProgram" rel="' + i + '">' + pageNum + '</a> ');
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

//Populate the table with JSON data 
function populateTable(stats){

    dataStr = stats['Programs ordered newest'];
    let dataObj = JSON.parse(dataStr);

    tableBody = document.getElementById("tableBody");
    //Just to know how many programs there are
    numberOfItems = Object.keys(dataObj['data']).length
    //Populating the table
    for(let i = 0; i < numberOfItems; i++){
        let tr = document.createElement('tr');
        let actualDate = new Date(dataObj['data'][i][0]);
        let cleanDate =  actualDate.getDate()  + "/" + (actualDate.getMonth() + 1) + "/" + actualDate.getFullYear();
        let programName = dataObj['data'][i][1];
        let programType = dataObj['data'][i][2];
        let programUrl = dataObj['data'][i][3];
        let currentRow = "<td>" + programName +"</td><td>" + programType +"</td><td>"+ cleanDate +"</td><td><a href=" + programUrl + " target=\"blank\">More Info</a>" ;
        tr.innerHTML = currentRow; 
        tableBody.append(tr);

    }


    //Make table have pages
    makeTableLatestPagination();

}

//Simply load JSON file into memory 
function loadJSONData(){

    $.getJSON("/static/data/dawson_programs_stats.json", function(json) {
        let stats = json;
        generalStats(stats); 
        makeYearlyPieChart(stats);
        populateTable(stats);
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


});