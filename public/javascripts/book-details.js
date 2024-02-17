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