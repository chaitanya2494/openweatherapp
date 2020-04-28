$(document).ready(function () { //coding to be executed only after document is ready for action

    watchCityName();
    watchSubmitClick();

})

function watchSubmitClick() {
    $("#submit").click(function () {
        var name = $("#cityName").val();
        console.log(name);
        getWeatherInfo(name);
        $("#weatherInfo").hide();

    })

}

function getWeatherInfo(name) {

    $.ajax({
        url: 'http://api.openweathermap.org/data/2.5/forecast?q=' + name + '&appid=' + appId,
        method: 'GET',
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

}

function watchCityName() {
    $("#cityName").keyup(function () {
        if (!validCityName()) {
            $("#submit").prop("disabled", true)
            return;
        }
        var name = $("#cityName").val();
        $("#cityName").val(name.toLowerCase());
        $("#submit").prop("disabled", false)
        //  console.log(regex.test(name))
        // console.log(name);
        // console.log(name.toLowerCase());
    })
}
function validCityName() {
    var name = $("#cityName").val();
    var regex = /^[a-zA-Z]*$/;
    var error = '';
    if (!name) {
        error = "City Name Cannot Be Empty";
    }
    if (!error && name.length < 3) {
        error = "City Name Should Be Min 3 Characters";

    }
    if (!error && name.length >= 20) {
        error = "City Name Should Not Exceed 20 Characters";
    }
    if (!regex.test(name)) {
        error = "Only Alphabets Allowed";
    }
    $(".error").text(error);
    return !error; //not of error = valid city name = returns true
}
