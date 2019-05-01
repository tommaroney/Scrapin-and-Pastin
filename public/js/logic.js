document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems, {});

    var dropdown = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(dropdown, { hover: true });
});

$(document).ready(() => {

    $(".postNote").click(function(event) {

        event.preventDefault();

        const articleId = $(this).data("value");

        const newNote = $("#newNote" + articleId).val();

        console.log(newNote);

        $.ajax({
            method: "POST",
            url: "/api/article/" + articleId + "/notes",
            data: {note: newNote}
        }).then(response => {
            console.log(response);
            location.reload();
        });
    });

    $(".noteDelete").click(function(event) {

        event.preventDefault();
        
        const noteId = $(this).val();
        
        console.log(noteId);

        $.ajax({
            method: "DELETE",
            url: "/api/article/notes/" + noteId
        }).then(response => {
            console.log(response);
            $("#" + response._id).remove();
        });
    });

    $("#newArticles").click(function(event) {

        console.log("here");

        $.ajax({
            method: "GET",
            url: "/api/article/scrape"
        }).then(result => {
            console.log("back");
            location.reload()
        });
    });

    $("#clearArticles").click(event => {
        $.ajax({
            method: 'DELETE',
            url: '/api/articles/all'
        }).then(response => location.reload());
    });

    $("#saveIt").click(function(event) {

        const savedArticle = { ringerId: $(this).data("id") };

        $.ajax({
            method: "POST",
            url: "/api/article/save",
            data: savedArticle
        }).then(response => location.reload());
        // .then(response => location.reload());

    });

    $("#unSaveIt").click(function(event) {

        const savedArticle = { ringerId: $(this).data("id") };

        $.ajax({
            method: "POST",
            url: "/api/article/unsave",
            data: savedArticle
        }).then(response => location.reload());
        // .then(response => location.reload());

    });

});