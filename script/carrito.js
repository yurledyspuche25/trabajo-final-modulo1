let data = [];
let cantProduct = 1;

const URL = "http://localhost:3000";

const containerCards = document.getElementById('container');
const btnShowForm = document.getElementById('btnShowForm');
const containerForm = document.getElementById('containerForm');
const nameInput = document.getElementsByClassName('name')[0];
const adressInput = document.getElementsByClassName('adress')[0];
const phoneInput = document.getElementsByClassName('phone')[0];

const getData = async () => {
    const URL_CARRO = "http://localhost:3000/carro"
    const response = await fetch(URL_CARRO);
    data = await response.json();
    console.log(data);
    renderData();
};
getData();

const renderData = () => {
    containerCards.innerHTML = "";
    data.forEach((element) => {
        containerCards.innerHTML += `
        <article class="card">
                        
                        <img src="${element.image_product}" alt="imagen">
                            <h6>${element.type}</h6>
                            <h5>${element.name}</h5>
                            <span>${element.price}</span>
                            <button class="btn btn--menos"name="${element.id}">-</button>
                            <span id="${element.id}">${element.cantidad} </span>
                            <button class="btn btn--plus"name="${element.id}">+</button>
                            <button class="btnDelete" name="${element.id}">X</button>
                
                    </article>
        `
    });
    const btnDelete = document.getElementsByClassName('btnDelete');

    Array.from(btnDelete).forEach((element) => {
        let id = element.getAttribute('name');
        element.addEventListener('click', () => {
            handleDelete(id);
        })
    });
};

//cantidad
document.addEventListener("click", async ({ target }) => {
    if (target.classList.contains("btn--plus")) {
        const idPlus = target.getAttribute("name");
        const spanCantidad = document.getElementById(idPlus);
        spanCantidad.innerHTML = parseInt(spanCantidad.innerHTML) + 1;
        cantProduct = spanCantidad.innerHTML;
        const productsCarrito = data.find(item => item.id == idPlus);
        productsCarrito.cantidad = cantProduct;
    }
});

//restar
document.addEventListener("click", async ({ target }) => {
    if (target.classList.contains("btn--menos")) {
        const idPlus = target.getAttribute("name");
        const spanCantidad = document.getElementById(idPlus);
        if (cantProduct >= 2) {
            spanCantidad.innerHTML = parseInt(spanCantidad.innerHTML) - 1;
            cantProduct = spanCantidad.innerHTML;
            const productsCarrito = data.find(item => item.id == idPlus);
            productsCarrito.cantidad = cantProduct;
        }

    }
});

const handleDelete = async (id) => {
    try {
        let response = await fetch(`${URL}/carro${id}`, {
            method: 'DELETE'
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    getData();
}
//Functions events
const showForm = () => {
    containerForm.classList.remove('hidden');
};
btnShowForm.addEventListener('click', showForm);

const handleSave = async (e) => {
    e.preventDefault();
    
    let totalProducto = 0;
    data.forEach(element => {
        totalProducto += parseFloat(element.cantidad) * parseFloat(element.price);
    });
    alert('el total es'+totalProducto);
    const newBuy = {
        data,
        valorTotal: totalProducto,
        name: nameInput.value,
        adress: adressInput.value,
        phone: phoneInput.value,
    };
    console.log(newBuy);
    try {
        let response = await fetch(`${URL}/buy`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newBuy)
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    };
    //clean
    nameInput.value = '';
    adressInput.value = '';
    phoneInput.value = '';
    //hide form
    containerForm.classList.add('hidden');

};
form.addEventListener('submit', (e) =>{
    handleSave(e);
});