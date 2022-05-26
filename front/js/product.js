// import {fetchProductById} from "./fetcher.js";

// let url = new URL (document.location);
// let id = url.searchParams.get("id");

// let template = document.querySelector(".item__img");
// let img = document.createElement("img");
// let titre = document.getElementById("title");
// let prix = document.getElementById("price");
// let description = document.getElementById("description");
// const choix = document.getElementById("colors");
// const addToCard = document.querySelector("#addToCart");  // <==== Pourquoi on n'est pas obligé d'aller chercher addToCard? 
// const quantity = document.querySelector("#quantity");



// template.appendChild(img);

// async function byId(id){
//     let reponse = await fetchProductById(id);

//     function getElement(){

//         img.src = reponse.imageUrl;
//         img.alt = reponse.altTxt;
//         titre.textContent = reponse.name;
//         prix.textContent = reponse.price;
//         description.textContent = reponse.description;
//         let colors = reponse.colors;

//         for (let color of colors){   // <====  pourquoi of fonctionne et pas in ?
//             let option = document.createElement("option"); // création de l'élément
//             choix.appendChild(option);  // placement de l'élément
//             option.textContent = color;     // ajout du contenue dans l'élément

//         }
//     }
        
//     getElement();
// }

// byId(id);

// // écouter le clique sur ajout panier
// addToCard.onclick = () => {
//     // vérification quantité supérieur a 0 et value pas égal a indéfini 
//     if (quantity.value > 0 && choix.value !== null){
//         // Si localStorage n'est pas égal a nul 
//         if (localStorage.getItem("produits") !== null){

//             let produitPanier = JSON.parse(localStorage.getItem("produits"));

//             let same = produitPanier.findIndex(produit => produit.id == id && produit.color == choix.value);  // same = produit + couleur déja existante

//             if (same !== -1){
//                 fetchProductById(id)

//                     .then((data) => {

//                         let produitPanier = JSON.parse(localStorage.getItem("produits"));
//                         data.quantity = parseInt(produitPanier[same].quantity) + parseInt(quantity.value);
                        
//                         let ajoutPanier = {
//                             name: data.name,
//                             color: data.colors,
//                             prix: data.price,
//                             id: data._id,
//                             quantity: parseInt(data.quantity),                      
//                         };

//                         produitPanier.splice(same, 1 , ajoutPanier); 
//                         localStorage.setItem("produits", JSON.stringify(ajoutPanier));
//                         console.log("articleEnPlus")
//                     })
//             } else {
//                 fetchProductById(id)

//                 .then((data) => {
//                     const produits = data;

//                     let ajoutPanier = {
//                         name: produits.name,
//                         price: produits.price,
//                         color: choix.value,
//                         quantity: parseInt(quantity.value),
//                         id: produits._id,
//                     };

//                     produitPanier.push(ajoutPanier);
//                     localStorage.setItem("produits", JSON.stringify(produitPanier));
//                     console.log('Nouveau article ajouté au panier');
//                 }); 
//             }



//         } else {
//             fetchProductById(id)

//                 .then((data) => {

//                     let ajoutPanier = {
//                         name: data.name,
//                         color: choix.value,
//                         prix: data.price,
//                         id: data._id,
//                         quantity: parseInt(quantity.value),                      
//                     };

//                     let produitPanier = []; // création tableau

//                     produitPanier.push(ajoutPanier); // ajout de la liste dans le panier
//                     localStorage.setItem("produits", JSON.stringify(ajoutPanier)); //
//                     console.log("ajoutPanier");
//                 })

            
//         } 

        
//     }
// }


import { fetchProductById } from "./fetcher.js";

const url = 'http://localhost:3000/api/products/';

// Récupération de l'ID du produit dans l'url :
let params = new URL(document.location).searchParams;
let id = params.get("id");

// Initialisation des variables :
const template = document.querySelector(".item__img");
const titre = document.getElementById('title');
const price = document.getElementById('price');
const choice = document.getElementById('colors');
const quantity = document.getElementById('quantity');
const description = document.getElementById('description');
const image = document.createElement('img');
template.appendChild(image);

// Fonction permettant d'afficher les infos du produits en fonction de son ID dans le DOM :
async function byId(id) {
    let reponse = await fetchProductById(id);

    const imageUrl = reponse.imageUrl;
    const alt = reponse.altTxt;
    const prix = reponse.price;
    const name = reponse.name;
    const text = reponse.description;
    const colors = reponse.colors;

    function getElement() {
        image.src = imageUrl;
        image.alt = alt;
        titre.innerHTML = name;
        price.innerHTML = prix;
        description.innerHTML = text;

        for (let color of colors) {
        let option = document.createElement('option');
        choice.appendChild(option);
        option.innerHTML = color;
        }  
    }
    getElement();
}

byId(id);

// Système d'ajout au panier :
addToCart.onclick = () => {
    // Verification si couleur / quantité ne sont pas égale à nul :
    if (quantity.value > 0 && choice.value !== null) {
        // Vérification de l'existance de la liste "produits" du LocalStorage :
        if (localStorage.getItem("produits") !== null) {
            // Récupération de la liste :
            let produitPanier = JSON.parse(localStorage.getItem("produits"));
            // Recherche de l'index dans la liste :
            let same = produitPanier.findIndex(produit => produit.id == id && produit.color == choice.value);

            if (same !== -1 ) {
                fetchProductById(id)

                    .then((data) => {

                        //let produitPanier = JSON.parse(localStorage.getItem("produits"));   
                        data.quantity = parseInt(produitPanier[same].quantity) + parseInt(quantity.value);

                        let ajoutPanier = {
                            name: data.name,
                            price: data.price,
                            color: choice.value,
                            quantity: parseInt(data.quantity),
                            id: data._id,
                        };

                        produitPanier.splice(same, 1, ajoutPanier);
                        localStorage.setItem("produits", JSON.stringify(produitPanier));
                        console.log("Article en plus !");
                        window.location.href = 'cart.html';
                    })    
            } else {
                fetchProductById(id)
                            
                    .then((data) => {
                        const produits = data;
                                    
                        let ajoutPanier = {
                            name: produits.name,
                            price: produits.price,
                            color: choice.value,
                            quantity: parseInt(quantity.value),
                            id: produits._id,
                        };
    
                        produitPanier.push(ajoutPanier);
                        localStorage.setItem("produits", JSON.stringify(produitPanier));
                        console.log('Nouveau article ajouté au panier');
                        window.location.href = 'cart.html';
                    });
            }           
        } else {
            fetchProductById(id).then((data) => {
                    const produits = data;

                    let ajoutPanier = {
                        name: produits.name,
                        price: produits.price,
                        color: choice.value,
                        quantity: parseInt(quantity.value),
                        id: produits._id,
                    };

                    let produitPanier = [];

                    produitPanier.push(ajoutPanier);
                    localStorage.setItem("produits", JSON.stringify(produitPanier));
                    console.table('Ajout au panier');  
                    window.location.href = 'cart.html';               
                });
        }
    } else {
        alert('Veuillez remplir les champs, merci !');
    }           
}