function updateData() {
    const title = document.getElementById('title-input');
    const author = document.getElementById('author-input');
    const genre = document.getElementById('genre-input');
    const date = document.getElementById('date-input');

    const url = document.URL;
    document.title = title.value;

    const data = {
        author: author.value,
        title: title.value,
        genre: genre.value,
        publishedDate: new Date(date.value)
    };

    $.ajax({
        url: url,
        type: 'PUT',
        data: data,
        success: function(data) {
            alert(JSON.stringify(data));
        }
    });
}


function deleteBook() {
    const url = document.URL;

    $.ajax({
        url: url,
        type: 'DELETE',
        success: function(data) {
            window.location.href = data.redirect;
        }
    });
}


$(document).ready( function () {
    $.get('/books/genres/',
        function(data) {
            const data_array = [];
            data['data'].forEach(elem => data_array.push(`<option value="${elem['_id']}">`));
            $("#datalistOptions").html(data_array.join(''));
        })
});