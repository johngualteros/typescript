"use strict";
const buttonAdd = document.querySelector('#buttonAdd');
const inputTitle = document.querySelector('#title');
const inputCost = document.querySelector('#cost');
const inputCurrency = document.querySelector('#currency');
const expenses = new Expenses('USD');
render();
buttonAdd.addEventListener('click', (e) => {
    if (inputTitle.value != '' && inputCost.value != '' && !isNaN(parseFloat(inputCost.value))) {
        const title = inputTitle.value;
        const cost = parseFloat(inputCost.value);
        const currency = inputCurrency.value;
        expenses.add({ title: title, cost: { number: cost, currency: currency } });
        render();
    }
    else {
        alert('Complete los campos');
    }
});
function render() {
    let html = '';
    expenses.getItems().forEach(item => {
        const { id, title, cost } = item;
        html += `
        <div class="item">
            <div><span class="currency">${cost.currency}</span>${cost.number}</div>
            <div>${title}</div>
            <div><button class="buttonEliminar" data-id="${id}">Eliminar</button></div>
        
        </div>
        `;
    });
    $('#items').innerHTML = html;
    $('#display').textContent = expenses.getTotal();
    $$('.buttonEliminar').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            expenses.remove(parseInt(id));
            render();
        });
    });
}
function $(selector) {
    return document.querySelector(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
