$('document').ready(() => {
    $("#chart-container").hide();
    $('table').hide();
$("#weatherBtn").click(() =>{
      $('table').show();
      $("#chart-container").hide();
     const currentCity = $("#currentCity").val();
   console.log(currentCity);
     $.ajax({
        type: 'GET',
        url: `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&APPID=d76ce6e4f25efbe1968fa2f568de2277`,
         success: (resp) => {
      
            console.log(resp);

            $('#currentTemp').text(Math.round(resp.main.temp-270));
            $('#currentPress').text(resp.main.pressure);
            $('#currentHumid').text(resp.main.humidity);
            
            
        },
        error: (err) => {
      
        }
      });
});

$("#weatherForecast").click(() => {
    const currentCity = $("#currentCity").val();
    $.ajax({
        type: 'GET',
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${currentCity}&APPID=d76ce6e4f25efbe1968fa2f568de2277`,
         success: (resp) => {
      

            plotchart(resp);
        },
        error: (err) => {
      
        }
      });
    });

    function plotchart(resp){
        $("table").hide();
        $("#chart-container").show();
        console.log(resp);
        listofDates = resp.list.map(function(ele){return moment(ele.dt*1000).format('MMMM Do, h:mm a');});
        listofTemps = resp.list.map(function(ele){return Math.round(ele.main.temp-270);});
        console.log(listofTemps);
    Highcharts.chart('chart-container', {
        title: {
            text: 'Weather Forecast'
        },
   
    
    
        xAxis: {
            categories: listofDates,
            title :
            {
                text : 'Date'
            }
        },
        yAxis:{
            title:{ text : 'Temperature'}
        },
        series: [{
            name: $("#currentCity").val(),
            marker :
            {
                symbol : 'diamond'
            },
            data: listofTemps
        }]
        });
}
});