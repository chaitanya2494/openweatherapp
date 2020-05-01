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

