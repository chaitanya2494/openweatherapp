$(document).ready(function () { //coding to be executed only after document is ready for action

    watchCityName();
    // watchSubmitClick();
    watchInputFormSubmit();
    renderRecentSearch();

})

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

function appendToRecentSearch(cityName) {
    previouslySelected = localStorage.getItem('recentSearch'); //4. get the stringified array
    selected = []; // 5. assume selected is an empty array
    if (previouslySelected) {  // 6. local storage has some value on recent search
        selected = JSON.parse(previouslySelected); // 7. convert the string to array
    }

    selected.push({
        cityName: cityName,
        timestamp: moment().format('DD/MM/YYYY HH:mm:SS')
    }); //1. add cityName to selected array
    nowSelected = JSON.stringify(selected);// 2. convert the array to string

    localStorage.setItem('recentSearch', nowSelected); //3. stored the stringified array
    renderRecentSearch();

}

function renderRecentSearch() {

    previouslySelected = localStorage.getItem('recentSearch'); //4. get the stringified array
    selected = []; // 5. assume selected is an empty array
    if (previouslySelected) {  // 6. local storage has some value on recent search
        selected = JSON.parse(previouslySelected); // 7. convert the string to array
    }

    selected.reverse();

    li$ = '';
    selected.forEach(function (item) {


        li$ += '<li class="collection-item">';
        li$ += '<div class="row">';
        li$ += '<div class="col s12">';
        li$ += item.cityName;
        li$ += '<span class="right material-icons">delete_outline</span>';
        li$ += '</div>';
        li$ += '<div class="col s12">';
        li$ += '<small class="right">' + moment(item.timestamp, 'DD/MM/YYYY HH:mm:SS').fromNow() + '</small>';
        li$ += '</div>';
        li$ += '</div>';
        li$ += '</li>';
    });
    $("#recentSearch").html(li$);

}


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
