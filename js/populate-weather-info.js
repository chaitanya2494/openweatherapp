function getWeatherInfo(name) {

    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + name + '&appid=' + appId,
        //  method: 'GET',
        success: function (response) {
            console.log("received from server", response);
            populateWeatherInfo(response);
        },
        error: function (err) {
            console.log("error received from server", err);
            //alert(err.responseJSON.message);
            $(".error").text(err.responseJSON.message);
        }
    })

}

function populateWeatherInfo(response) {

    var city = response.city.name + ", " + response.city.country;
    // console.log(city)
    $("#weatherInfo").show();
    $("#weatherInfo").find("tr:eq(0)").find("td").text(city);
    tr$ = '';
    response.list.forEach(function (data) {
        tr$ += '<tr>';
        tr$ += '<th> ' + moment.unix(data.dt).format('DD/MM/YYYY HH:mm:SS') + '  </th>';
        tr$ += '<td> ' + data.main.temp + ' </td>';
        tr$ += '</tr>';
    })
    $('#weatherInfo').append(tr$);
    appendToRecentSearch(response.city.name)
}
