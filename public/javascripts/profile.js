$(document).ready( function () {

    $.get('/profile/readed-books/',
        function(data) {
            const data_array = [];
            const keys = Object.keys(data['data']);
            keys.sort();

            let books = null;
            keys.forEach(key => {
                data_array.push('<div class="accordion-item"><h2 class="accordion-header">');
                data_array.push(`<button class="btn btn-lg btn-secondary border border-dark collapsed w-100" style="background-color: ${data.data[key].colorHex}" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-${key}" aria-expanded="false" aria-controls="panelsStayOpen-${key}">${key}`);
                data_array.push(`<i class="material-icons md-auto">expand_more</i></button></h2>`);
                data_array.push(`<div id="panelsStayOpen-${key}" class="accordion-collapse collapse">`);
                data_array.push('<div class="accordion-body">');
                books = data.data[key].books;
                if (Array.isArray(books[0])) {
                    books.forEach(book => data_array.push(`<a href="/books/b/${book[0]}"<button class="btn border border-dark book-hover mx-2 my-1">${book[1]}</button></a>`))
                }

                data_array.push('</div></div></div>');
            })

            $("#accordionPanel").html(data_array.join(''));
        })
});