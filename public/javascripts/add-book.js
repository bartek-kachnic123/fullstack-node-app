$(document).ready( function () {
    $.get('/books/genres/',
        function(data) {
            const data_array = [];
            data['data'].forEach(elem => data_array.push(`<option value="${elem['_id']}">`));
            $("#datalistOptions").html(data_array.join(''));
        })
});