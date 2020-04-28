$(document).ready(function () { //coding to be executed only after document is ready for action

    watchCityName();
    watchSubmitClick();

})

function watchSubmitClick() {
    $("#submit").click(function () {
        var name = $("#cityName").val();
        console.log(name);
    })

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
