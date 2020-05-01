function renderRecentSearch() {

    previouslySelected = localStorage.getItem('recentSearch'); //4. get the stringified array
    selected = []; // 5. assume selected is an empty array
    if (previouslySelected) {  // 6. local storage has some value on recent search
        selected = JSON.parse(previouslySelected); // 7. convert the string to array
    }

    selected.reverse();

    var compiled = _.template($("#recentSearchLiTemplate").html());
    var li$ = compiled({ selected: selected });
    $("#recentSearch").html(li$);

    // li$ = '';
    // selected.forEach(function (item) {


    //     li$ += '<li class="collection-item">';
    //     li$ += '<div class="row">';
    //     li$ += '<div class="col s12">';
    //     li$ += _.toUpper(item.cityName);
    //     li$ += '<span class="right material-icons">delete_outline</span>';
    //     li$ += '</div>';
    //     li$ += '<div class="col s12">';
    //     li$ += '<small class="right">' + moment(item.timestamp, 'DD/MM/YYYY HH:mm:SS').fromNow() + '</small>';
    //     li$ += '</div>';
    //     li$ += '</div>';
    //     li$ += '</li>';
    // });
    // $("#recentSearch").html(li$);

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