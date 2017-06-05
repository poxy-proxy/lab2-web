$(document).ready(function() {
    $('#book').click(function() {
        $.ajax({
            url: '/api/v1/book',
            type: 'GET',
            contentType: "application/json",
            success: function (result) {
                $("#listbook").html("<div></div>");
                $.each(result, function (index, value) {
                    $("#listbook").append($("<div>" +
                        "<input id='" + value.idBook + "' name='titlebook' value='" + value.title + "' >" + " " +
                        "<input id='" + value.idBook + "' name='authorbook' value='" + value.author + "' >" + " " +
                        "<input id='" + value.idBook + "' name='numberpages' value='" + value.numberPages + "' >" + " " +
                        "<input id='" + value.idBook + "' type='date' name='datewrit' value='" + value.dateWriting + "' >" + " " +
                        "<input id='" + value.idBook + "' name='circulation' value='" + value.circulations + "' >" + " " +
                        "</div>" +
                        "<button name='" + value.idBook + "' class='detailBook'>Detail</button>" + " " +
                        "<button name='" + value.idBook + "' class='deleteBook'>Delete</button>" + " " +
                        "<button name='" + value.idBook + "' class='updateBook'>Update</button>"
                    ))
                });
                $('.deleteBook').click(function() {
                    var id = $(this).attr('name');
                    // var titlebook = $("[name = titlebook][id = " + id + "]").val();
                    // var book = {titleb: titlebook};
                    $.ajax({
                        url: '/api/v1/book/' + id,
                        type: 'DELETE',
                        contentType: "application/json",
                        // data: JSON.stringify(book),
                        // dataType: "json",
                        success: function (result) {
                            alert("You deleted book");
                        }
                    });
                });
                $('.updateBook').click(function () {
                    var id = $(this).attr('name');
                    var titlebook = $("[name = titlebook][id = " + id + "]").val();
                    var authorbook = $("[name = authorbook][id = " + id + "]").val();
                    var numberpages = $("[name = numberpages][id = " + id + "]").val();
                    var circulation = $("[name = circulation][id = " + id + "]").val();
                    var datewrit = $("[name = datewrit][id = " + id + "]").val();
                    var book = {
                        titleb: titlebook,
                        authorb: authorbook,
                        circul: circulation,
                        numberpage: numberpages,
                        dateWrit: datewrit
                    };
                    $.ajax({
                        url: '/api/v1/book/' + id,
                        type: 'PUT',
                        contentType: "application/json",
                        data: JSON.stringify(book),
                        dataType: "json",
                        success: function (result) {
                            alert("You updated information on book")
                        }
                    });
                });
                $('.detailBook').click(function () {
                    var id = $(this).attr('name');
                    $.ajax({
                        url: '/api/v1/book/' +id,
                        type: 'GET',
                        contentType: "application/json",
                        success: function (result) {
                            $("#detailbook").html("<div>" +
                                "Название книги: " + result.title + "<br>" +
                                "ФИО автора: " + result.author + "<br>" +
                                "Количество страниц: " + result.numberPages + "<br>" +
                                "Дата написания книги: " + result.dateWriting + "<br>" +
                                "Тираж книги: " + result.circulations + "</div>"
                            )
                        }
                    });
                });
            }
        });
    });

    $('#addBook').submit(function(e) {
        e.preventDefault();
        var titlebook = $("[name=titleb]").val();
        var authorbook = $("[name=authorb]").val();
        var numberpages = $("[name=numberpagesb]").val();
        var circulation = $("[name=circulationb]").val();
        var datewrit = $("[name=datewritb]").val();
        var genrebook = $("[name=genrebook]").val();
        var titlelibrary = $("[name=titlelibrary]").val();
        var book = {
            titleb: titlebook,
            authorb: authorbook,
            circul: circulation,
            numberPage: numberpages,
            dateWrit: datewrit,
            genreb: genrebook,
            titlelib: titlelibrary
        };
        $.ajax({
            url: "/api/v1/book",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(book),
            dataType: "json",
            success: function (result) {
                alert("You add book in Library");
            }
        });
    });
});