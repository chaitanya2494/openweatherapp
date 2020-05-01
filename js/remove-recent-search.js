
function watchRemoveRecentSearch() {
    $(document).on("click", "#recentSearch .btn-remove", function () {
        // var verify = confirm("Are you sure you want to remove this city");
        // if (!verify) { // if user clicks on cancel confirm retunrs false
        //     return; // since user clicked on cancel do not execute the code for removal
        // }

        //since the li elements are rendered after document loaded it is called as dynamic elements
        //jquery will work only on static elements eg. submit button click
        //so capture the click on the document, identify where the click is originated and execute the logic



        // var elem = document.getElementById("confirmModal")
        // var instance = M.Modal.getInstance(elem);
        // instance.open();
        var liIndex = $(this).closest("li").index(); //capture the index of the li element
        console.log($("#confirmModal").length);
        $("#confirmModal").find(".btn-ok").attr("data-li-index", liIndex);
        $("#confirmModal").modal().modal('open');

        return;


    })
}

function watchConfirmDialogOkClick() {
    $("#confirmModal .btn-ok ").click(function () {
        var index = jQuery(this).attr("data-li-index");
        removeRecentSearch(index);
        $("#confirmModal").modal().modal('close');
    })
}

function removeRecentSearch(liIndex) {

    previouslySelected = localStorage.getItem('recentSearch'); // get the previously stored cities from local storage
    selected = JSON.parse(previouslySelected); //convert the string data into array
    selected.reverse(); // since we reversed the local storage while populating
    selected.splice(liIndex, 1); //remove the city name by index 
    localStorage.setItem("recentSearch", JSON.stringify(selected)); //convert the array to string and store in local storage
    $("#recentSearch").find("li:eq(" + liIndex + ")").remove();
}
