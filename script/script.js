let data=[];
let dataFiltered=[];
const form = document.getElementById('form');
const search = document.getElementById('search');
const logo = document.querySelector('.logo');
const containerCards = document.getElementById("container");
const URL_FAVORITES= "http://localhost:3000/favorites";
const URL_CARRO= "http://localhost:3000/carro";


//Declaración de todas las funciones

//Get de la data en el JSON server
const getData = async()=>{
    const URL = 'http://localhost:3000/products';
    const response = await fetch(URL)
    data = await response.json()
    console.log(data);
    renderData();
}
getData();
const getDatos = async (url) => {
    try {
        const resp = await fetch(url);
        const data = await resp.json();
        return data;

    } catch (error) {
        console.log(error);
        return null;
    }
}
const renderData = () =>{
    containerCards.innerHTML ="";
    data.forEach((element) =>{
        containerCards.innerHTML +=`
        <article class="card">
                        <button class="delete">X</button>
                        <img src="${element.image_product}" alt="imagen">
                        <div class="textCard">
                            <h6>${element.type}</h6>
                            <h5>${element.name}</h5>
                            <span>${element.price}</span>
                            <img class="star" src="./images/categoria/estrella.webp" width="25px" height="15px" alt="">
                            <button class="btnHeart btn-fav" id="fav${element.id}" name="${element.id}">💟</button>
                            <button class="btnCarro" name="${element.id}">🛒</button></button>
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
}

/*FAVORITO*/
document.addEventListener("click", async ({target})=>{
    if(target.classList.contains('btnHeart')){
        const saveFav = data.find(item => item.id == target.getAttribute('name'));
        let favHeart = await getDatos(URL_FAVORITES);
        console.log(favHeart);
        const elementExist = favHeart.some(item => item.id === saveFav.id);
        if (elementExist){
            console.log('ya esta en fav');
        } else {
            await fetch (URL_FAVORITES, {
                method: "POST",
                body: JSON.stringify(saveFav),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
        }
    }
});
document.addEventListener("click", async ({target})=>{
    if(target.classList.contains('btnCarro')){
        const addCar = data.find(item => item.id == target.getAttribute('name'));
        const car = await getDatos(URL_CARRO);
        console.log(car);
        const elementExist = car.some(item => item.id === addCar.id);
        if (elementExist){
            console.log('ya esta en carrito');
        } else {
            await fetch (URL_CARRO, {
                method: "POST",
                body: JSON.stringify(addCar),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            });
        }
    }
});


// //Función de filtrado

// const filtro = (arreglo, parametroDeFiltrado) => {
//     const filtrar = arreglo.filter(item => item.type === parametroDeFiltrado);
//     return filtrar;
// }

// // //Extraer las categorías o types de la data: 1. Obtener un arreglo con las categorías (Recordemos que mombramos los id de los botones de filtrado con el mismo nombre del type category)
// const extraerCategorías = (arreglo) => {
//     const arregloConTodasCategorías = arreglo.map(item => item.type);
//     const arregloCategorías = [...new Set(arregloConTodasCategorías)];
//     return arregloCategorías;
// }


//Declaración de constantes y variables globales



// //Escuchar los eventos
// document.addEventListener('DOMContentLoaded', async () => {
//     const containerCards = document.getElementById('container');
//     const products = await getData(URL);
//     printCards(products, containerCards);

//     const categorias = extraerCategorías(products);


//     // //Escuchar el evento click de los botones de filtrado
//     categorias.forEach(categoria => {
   
//         //     //Capturamos todos los botones del filtrado


//         const botonesFiltrado = document.getElementById(categoria);
//         botonesFiltrado.addEventListener('click', ({ target }) => {
//             const filteredProducts = filtro(products, target.id);
//             printCards(filteredProducts, containerCards);
//         })

//     });

// });
// //paso 2 funcion para filtrar datos
// const dataNombre = async (valor) => {
//     const cards = document.querySelector('#container');
//     let nombres = await getData(URL);
//     cards.innerHTML = '';
//     nombres.forEach(e => {
//         const { id, image_product: image, name, type, price} = e
//         if (valor === name) {
//            cards.innerHTML += `
//            <article class="card">
//            <button class="delete">X</button>
//                        <img src="${image}" alt="${name}">
//                        <div class="textCard">
//                            <h6>${type}</h6>
//                            <h5>${name}</h5>
//                            <span>$${price.toLocaleString()}</span>
//                            <img class="star" src="./images/categoria/estrella.webp" width="25px" height="17px" alt="">
//                            <button class="btnHeart btn-fav" id="fav${id}" name="${id}">💟</button>
//                            <div class="cantidad">
//                                <button class="decremento" name="">-</button>
//                                <span id="$">1</span>
//                                <button class="incremento" name="">+</button>
//                            </div>
//                        </div>
//                    </article>
//     `

//         } 

//     });
// }



// //evento submit buscar  paso 1 
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const valor = search.value;
//     console.log(valor);
//     if (valor && valor !== "") {
//         dataNombre(valor)
//         search.value = ""

//     } else {
//         window.location.reload();
//     }
// })
// logo.addEventListener('click', () => {
//     getData(URL);
// })



// /*favorite*/

// let dataFiltered = [];

// let favoritos = JSON.parse(localStorage.getItem("favoritospage")) || [];



// // //esuchar todos los eventos del click btnheart
// // document.addEventListener("click", ({ target }) => {
// //     if (target.classList.contains("btnHeart")) {
// //       mercado = favoritos.find((item) => item.id == target.getAttribute("name"));
// //       const elementoExist = favoritos.some((item) => item.id === mercado.id);
// //       if (elementoExist) {
// //         console.log(elementoExist);
// //         console.log(mercado);
// //         let index = favoritos.findIndex(
// //           (item) => item.id == target.getAttribute("name")
// //         );
// //         favoritos.splice(index, 1);
// //         //   let index = favoritos.findIndex(elementoExist);
// //         //   favoritos.splice(index, 1);
// //         //listaMercado.pop(elementoExist.id) ;//&& listaMercado.splice(mercado.id,-1);
// //         localStorage.setItem("favoritospage", JSON.stringify(favoritos));
// //         renderCards()
// //       } else {
// //         console.log("no hay mas de ese elemento");
// //       }
// //     }
// //   });

// console.log(favoritos);
// const containerItems = document.getElementsByClassName("items")[0];





// //escuchar todos los eventos del click btnheart
// document.addEventListener("click", ({ target }) => {
//     if (target.classList.contains("btnHeart")) {
      
//       const savefav = dataFiltered.find((item) => item.id == target.getAttribute("name")
//       );
//       const elementExist = favoritos.some((item) => item.id === savefav.id);
//       console.log(elementExist);
//       console.log(savefav);
//       if (elementExist == false) {
//         favoritos.push(savefav);
//         localStorage.setItem("favoritospage", JSON.stringify(favoritos));
//       }
//     }
//   });