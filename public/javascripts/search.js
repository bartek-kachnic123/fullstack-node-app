var timeoutSearchId = null;
const circular =  `<div class="spinner-border text-success" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`;
var isCircle = false;
$('#search-input').keyup(function() {
    let query = $(this).val();
    if (timeoutSearchId  !== null) {
        clearTimeout(timeoutSearchId);
    }
    if (query.length > 0 && !isCircle) {
        $('#search-listing').html(circular);
        isCircle = true;
    }
    timeoutSearchId = setTimeout(getData, 800, query);
});


function getData(query) {
    $.get('/books/data/',
        {'q': query},
        function(data) {
            const data_array = []
            data['data'].forEach(elem => {
                // data_array.push("<div>" + elem.title + "</div>");
                addCard(data_array, elem);
            });
            if (query.length > 0 && data_array.length === 0) {
                data_array.push("<h3>Nie znaleziono książek</h3>");
            }
            $('#search-listing').html(data_array.join(''));
            isCircle = false;
        })
}

function addCard(data_array, book) {
    // const card = `
    // <div class="card text-bg-dark">
    //             <svg class="card-img" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality"  fill-rule="evenodd"
    //                  clip-rule="evenodd" viewBox="0 0 446 511.568"><path fill="#353944" fill-rule="nonzero" d="M421.279 511.379H81.772v-.048c-70.173 2.132-80.095-9.65-81.557-56.651-.178-5.759-.169-12.408-.16-19.844l.004-5.226H0V51.831C0 27.879 6.345 14.565 22.262 6.665 34.732.475 51.946-.247 77.264.075l1.13-.041H406.3c8.504 0 16.226 3.463 21.811 9.048 5.586 5.586 9.049 13.303 9.049 21.812 0 57.623-.22 145.14-.435 232.653-.155 63.57-.315 127.151-.315 232.702 0 8.355-6.776 15.13-15.131 15.13z"/><path fill="#70B1E1" d="M81.771 496.25h339.508c0-163.19.75-302.199.75-465.356 0-8.663-7.066-15.729-15.729-15.729H78.394c-47.525-.669-63.264 1.872-63.264 36.667v377.777c0 55.75-2.297 68.782 66.641 66.641z"/><path fill="#353944" fill-rule="nonzero" d="M16.553 10.146C26.663 2.786 40.409.489 59.981.085A15.24 15.24 0 0161.587 0c8.355 0 15.13 6.775 15.13 15.13v481.242h-.055l-.004.414c-.227 8.324-7.162 14.884-15.485 14.657C-.046 509.739-.021 491.446.055 434.836.167 307.275 0 179.475 0 51.834 0 31.436 4.808 18.7 16.553 10.146z"/><path fill="#656D7A" d="M61.477 15.13c-34.506.556-46.347 6.388-46.347 36.704V429.61c0 49.642-1.932 65.418 46.347 66.762V15.13z"/><path fill="#FDFEFF" d="M139.87 466.54h218.518c8.394 0 15.263-6.901 15.263-15.263V366.83c0-8.361-6.899-15.262-15.263-15.262H139.87c-8.364 0-15.262 6.866-15.262 15.262v84.447c0 8.396 6.87 15.263 15.262 15.263z"/><path fill="#E8E7E8" fill-rule="nonzero" d="M153.88 387.768a5.302 5.302 0 010-10.603h130.386a5.302 5.302 0 010 10.603H153.88zm-.002 26.59a5.302 5.302 0 010-10.604h196.558a5.302 5.302 0 010 10.604H153.878zm0 26.585a5.302 5.302 0 010-10.604h196.558a5.302 5.302 0 010 10.604H153.878z"/></svg>
    //             <div class="card-img-overlay">
    //                 <h4 class="card-title text-center py-1">Card title</h4>
    //                 <h6 class="card-text text-center">Kategoria</h6>
    //                 <p class="card-text text-end px-2 py-1">Data publikacji: <small>14.02.2011</small></p>
    //                 <h4 class="card-text text-center text-uppercase py-5">AUTHOR</h4>
    //             </div>
    //         </div>`;
    const color = book.genre_details !== undefined ? book.genre_details.colorHex : '#107896';
    data_array.push('<div class="card text-bg-dark">');
    data_array.push('<svg class="card-img" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality"  fill-rule="evenodd"');
    data_array.push(`clip-rule="evenodd" viewBox="0 0 446 511.568"><path fill="#353944" fill-rule="nonzero" d="M421.279 511.379H81.772v-.048c-70.173 2.132-80.095-9.65-81.557-56.651-.178-5.759-.169-12.408-.16-19.844l.004-5.226H0V51.831C0 27.879 6.345 14.565 22.262 6.665 34.732.475 51.946-.247 77.264.075l1.13-.041H406.3c8.504 0 16.226 3.463 21.811 9.048 5.586 5.586 9.049 13.303 9.049 21.812 0 57.623-.22 145.14-.435 232.653-.155 63.57-.315 127.151-.315 232.702 0 8.355-6.776 15.13-15.131 15.13z"/><path fill="${color}" d="M81.771 496.25h339.508c0-163.19.75-302.199.75-465.356 0-8.663-7.066-15.729-15.729-15.729H78.394c-47.525-.669-63.264 1.872-63.264 36.667v377.777c0 55.75-2.297 68.782 66.641 66.641z"/><path fill="#353944" fill-rule="nonzero" d="M16.553 10.146C26.663 2.786 40.409.489 59.981.085A15.24 15.24 0 0161.587 0c8.355 0 15.13 6.775 15.13 15.13v481.242h-.055l-.004.414c-.227 8.324-7.162 14.884-15.485 14.657C-.046 509.739-.021 491.446.055 434.836.167 307.275 0 179.475 0 51.834 0 31.436 4.808 18.7 16.553 10.146z"/><path fill="#656D7A" d="M61.477 15.13c-34.506.556-46.347 6.388-46.347 36.704V429.61c0 49.642-1.932 65.418 46.347 66.762V15.13z"/><path fill="#FDFEFF" d="M139.87 466.54h218.518c8.394 0 15.263-6.901 15.263-15.263V366.83c0-8.361-6.899-15.262-15.263-15.262H139.87c-8.364 0-15.262 6.866-15.262 15.262v84.447c0 8.396 6.87 15.263 15.262 15.263z"/><path fill="#E8E7E8" fill-rule="nonzero" d="M153.88 387.768a5.302 5.302 0 010-10.603h130.386a5.302 5.302 0 010 10.603H153.88zm-.002 26.59a5.302 5.302 0 010-10.604h196.558a5.302 5.302 0 010 10.604H153.878zm0 26.585a5.302 5.302 0 010-10.604h196.558a5.302 5.302 0 010 10.604H153.878z"/></svg><div class="card-img-overlay">`);
    data_array.push(`<h5 class="card-title text-end px-5">${book.title}</h5>`);
    data_array.push(`<h6 class="card-text text-end px-1">${book.genre}</h6>`);
    data_array.push(`<p class="card-text text-end px-1"><small>${formatDate(book.publishedDate)}</small></p>`);
    data_array.push(`<h6 class="card-text  text-uppercase position-rel-author">${book.author}</h6>`);
    data_array.push(`<a href="/books/b/${book._id}" class="position-abs-edit-btn"><button type="button" class="btn btn-dark">Edytuj</button></a>`)

    if (!book.is_readed) {
        data_array.push(`<button type="button" id="${book._id}" onclick="markReaded(this.id)" class="btn btn-primary position-abs-read-btn">Dodaj do przeczytanych</button>`);
    }
    else {
        console.log("OK");
    }
    data_array.push('</div></div>');
}

function formatDate(date) {
    const publishedDate = new Date(date);
    const day = ("0" + publishedDate.getDate()).slice(-2); // Add leading zero and take last two characters
    const month = ("0" + (publishedDate.getMonth() + 1)).slice(-2); // Add leading zero and take last two characters
    const year = publishedDate.getFullYear();

    return `${day}.${month}.${year}`;

}

function markReaded(id) {
    const url = document.URL;
    const data = {
        _id: id,
        is_readed: true
    }
    $.ajax({
        url: url,
        type: 'PUT',
        data: data,
        success: function(data) {
            const read_btn = document.getElementById(data._id);
            read_btn.style.display = 'none';
        }
    });
}