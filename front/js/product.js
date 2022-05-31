import {fetchProductById} from "./fetcher.js";

let url = new URL (document.location);
let id = url.searchParams.get("id");

let template = document.querySelector(".item__img");
let img = document.createElement("img");
let titre = document.getElementById("title");
let prix = document.getElementById("price");
let description = document.getElementById("description");
const choix = document.getElementById("colors");
const addToCard = document.querySelector("#addToCart"); 
const quantity = document.querySelector("#quantity");



template.appendChild(img);

async function byId(id){
    let reponse = await fetchProductById(id);

    function getElement(){

        img.src = reponse.imageUrl;
        img.alt = reponse.altTxt;
        titre.textContent = reponse.name;
        prix.textContent = reponse.price;
        description.textContent = reponse.description;
        let colors = reponse.colors;

        for (let color of colors){   
            let option = document.createElement("option"); // création de l'élément
            choix.appendChild(option);  // placement de l'élément
            option.textContent = color;     // ajout du contenue dans l'élément

        }
    }
        
    getElement();
}

byId(id);

// écouter le clique sur ajout panier
addToCard.onclick = () => {
    // vérification quantité supérieur a 0 et value pas égal a indéfini 
    if (quantity.value > 0 && choix.value !== null){
        // Si localStorage n'est pas égal a nul 
        if (localStorage.getItem("produits") !== null){

            let produitPanier = JSON.parse(localStorage.getItem("produits"));

            let same = produitPanier.findIndex(produit => produit.id == id && produit.color == choix.value);  // same = produit + couleur non existante

            if (same !== -1){
                fetchProductById(id)

                    .then((data) => {

                        let produitPanier = JSON.parse(localStorage.getItem("produits"));
                        data.quantity = parseInt(produitPanier[same].quantity) + parseInt(quantity.value);
                        
                        let ajoutPanier = {
                            name: data.name,
                            color: choix.value,
                            prix: data.price,
                            id: data._id,
                            quantity: parseInt(data.quantity),                      
                        };

                        produitPanier.splice(same, 1 , ajoutPanier); 
                        localStorage.setItem("produits", JSON.stringify(produitPanier));
                        console.log("articleEnPlus");
                        window.location.href = 'cart.html';
                    })
            } else {
                fetchProductById(id)

                .then((data) => {
                    const produits = data;

                    let ajoutPanier = {
                        name: produits.name,
                        prix: produits.price,
                        color: choix.value,
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
            fetchProductById(id)

            .then((data) => {

                let ajoutPanier = {
                    name: data.name,
                    color: choix.value,
                    prix: data.price,
                    id: data._id,
                    quantity: parseInt(quantity.value),                      
                };

                    let produitPanier = []; // création tableau

                produitPanier.push(ajoutPanier); // ajout de la liste dans le panier
                localStorage.setItem("produits", JSON.stringify(produitPanier)); //
                console.log("ajoutPanier");
                window.location.href = 'cart.html';
            })

            
        }  
    }else{
        alert("Champs incorrect")
    }
}

