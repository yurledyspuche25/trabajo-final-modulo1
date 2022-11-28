let data =[];

const URL = "http://localhost:3000/favorites";
const containerCards= document.getElementById('container');

const getData = async()=>{
    const URL_API = "http://localhost:3000/favorites";
    const response = await fetch(URL_API);
    data =await response.json();
    console.log(data);
    renderData();

};
getData();

const renderData =() =>{
    containerCards.innerHTML = "";
    data.forEach((element)=>{
        containerCards.innerHTML += `
        <article class="card">
                        <button class="btnDelete delete" name ="${element.id}">x</button>
                        <img src="${element.image_product}" alt="imagen">
                        <div class="textCard">
                            <h6>${element.type}</h6>
                            <h5>${element.name}</h5>
                            <span>${element.price}</span>
                            <img class="star" src="../images/categoria/estrella.webp" width="25px" height="15px" alt="">
                            <button class="btnHeart btn-fav" id="fav${element.id}" name="${element.id}">💟</button>
                            <button class="btnCarrito" name="${element.id}">🛒</button></button>
                           <div class="cantidad">
                               <button 
                            <div class="cantidad">
                                <button class="decremento">-</button>
                                <span>1</span>
                                <button class="incremento">+</button>
                            </div>
                        </div>
                    </article>
        `
    })


    const btnDelete = document.getElementsByClassName('btnDelete');
console.log(btnDelete);
    Array.from(btnDelete).forEach((element) => {
        let id = element.getAttribute('name');
        element.addEventListener('click', ()=>{
            handleDelete(id)
        })
        });

};
const handleDelete = async (id) =>{
    try {
        let response = await fetch(`${URL}/${id}`,{
            method: 'DELETE'
        })
    } catch (error) {
        console.log(error);
    }
    getData();
}
