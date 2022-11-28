//get elementos generales
const btnNew = document.getElementById('btnNew');
const containerForm = document.getElementById('containerForm');
const containerItems= document.getElementById('items');
const form = document.getElementById('form');

let status = true;
// get elementos del form
const nombreInput = document.getElementsByName('name')[0];
const tipoInput = document.getElementsByName('type')[0];
const precioInput = document.getElementsByName('price')[0];
const imageInput = document.getElementsByName('image_product')[0];

let articulos = [];
let isEdit = false;
let idEdit;
const API_URL = 'http://localhost:3000';

//General


const getData = async () => {
    try {
        let response = await fetch(`${API_URL}/products`);
        let data = await response.json();
        articulos = data;
        printCards();
    } catch (error) {
        console.log(error);
    }
}

getData();

const printCards = () => {
    containerItems.innerHTML = '';
    articulos.forEach(item => {
        containerItems.innerHTML += `
        
        <article class="card">
                <button class="delete">X</button>
                <img src="${item.image_product}" alt="imagen">
                <div class="textCard">
                    <h6>${item.type}</h6>
                    <h5>${item.name}</h5>
                    <span>${item.price}</span>
                    <img class="star" src="../images/categoria/estrella.webp" width="30px" height="15px" alt="">
                    <div class="cantidad">
                        <button class="btnEditar btn--edit "data-id="${item.id}">editar</button>
                        <button class="btnDelete btn--delete" data-id="${item.id}">eliminar</button>
                    </div>
                </div>
            </article>
        `
    });

    //get elements DOM
    const btnDeletes = document.getElementsByClassName('btn--delete');
    const btnEdits = document.getElementsByClassName('btn--edit');

    //Listeners
    Array.from(btnDeletes).forEach((element) => {
        let id = element.getAttribute('data-id');
        element.addEventListener('click', () => {
            handleDelete(id);
        })
    });

    Array.from(btnEdits).forEach((element) => {
        let id = element.getAttribute('data-id');
        element.addEventListener('click', () => {
            handleEdit(id);
        })
    });
}

//Functions events
const showForm = () => {
    containerForm.classList.remove('hidden');
};

const handleSave = async (e) => {
    e.preventDefault();
    let newArticulos = {
        name: nombreInput.value,
        type: tipoInput.value,
        price: precioInput.value,
        image_product: imageInput.value,
    };
    //Save at API
    try {
        let response = await fetch(`${API_URL}/products/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newArticulos)
        });
    } catch (error) {
        console.log(error);
    }

    getData();

    //Clean Inputs
    nombreInput.value = '';
    tipoInput.value = '';
    precioInput.value = '';
    imageInput.value = '';
    //Hide Form
    containerForm.classList.add('hidden');
};

const handleUpdate = async (e) => {
    e.preventDefault();
    let newArticulos = {
        name: nombreInput.value,
        type: tipoInput.value,
        price: precioInput.value,
        image_product: imageInput.value,
    };
    //Update at API
    let rsponse = await fetch(`${API_URL}/products/${idEdit}`, {
        method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newArticulos)
    });
    isEdit = false;
    idEdit = null;
    getData();


    //Clean Inputs
    nombreInput.value = '';
    tipoInput.value = '';
    precioInput.value = '';
    imageInput.value = '';
    //Hide Form
    containerForm.classList.add('hidden');
}

const handleDelete = async (id) => {
    try {
        let response = await fetch(`${API_URL}/products/${id}`,{
            method: 'DELETE'
        });
        console.log(response);
    } catch (error) {
        console.log(error);
    }
    getData();
}

const handleEdit = (id) => {
    isEdit = true;
    idEdit = id;
    showForm();
    const product = articulos.find((element) => element.id == id);
    nombreInput.value = product.name;
    tipoInput.value = product.type;
    precioInput.value = product.price;
    imageInput.value = product.image_product;
}

//Listeners Events
btnNew.addEventListener('click', showForm);
form.addEventListener('submit', (e) => {
    if (isEdit) {
        handleUpdate(e);
    }else {
        handleSave(e);
    }
});
