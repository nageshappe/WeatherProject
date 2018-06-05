$('document').ready(() => {
$("#weatherBtn").click(() =>{
 
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
});