function watchCityName() {
    $("#cityName").keyup(function (event) {

        if (!validCityName()) {
            // $("#submit").prop("disabled", true)
            return;
        }
        var name = $("#cityName").val();
        $("#cityName").val(name.toLowerCase());
        // $("#submit").prop("disabled", false);
        // if (event.keyCode === 13) {
        //     getWeatherInfo(name);
        //     return;
        // }
        //  console.log(regex.test(name))
        // console.log(name);
        // console.log(name.toLowerCase());
    })
}

function watchSubmitClick() {
    $("#submit").click(function () {
        var name = $("#cityName").val();
        console.log(name);
        getWeatherInfo(name);
        $("#weatherInfo").hide();

    })

}
function watchInputFormSubmit() {
    $("#inputForm").submit(function (event) {
        event.preventDefault();
        var name = $("#cityName").val();
        console.log(name);
        getWeatherInfo(name);
        $("#weatherInfo").hide();
    })
}