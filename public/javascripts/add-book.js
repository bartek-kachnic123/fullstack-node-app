$(document).ready( function () {
    const names = ['Fantastyka', 'Historyczna', 'Dramat', 'Powieść Literacka'];
    const array = []
    names.forEach(elem => array.push(`<option value="${elem}">`) );
    $("#datalistOptions").html(array.join(''));
});