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
                data_array.push("<h3>" + elem + "</h3>");
            });
            if (query.length > 0 && data_array.length === 0) {
                data_array.push("<h3>Nie znaleziono książek</h3>");
            }
            $('#search-listing').html(data_array.join(''));
            isCircle = false;
        })
}