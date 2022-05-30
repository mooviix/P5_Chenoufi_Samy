import {fetchProductById} from "./fetcher.js";

// Vérification du localStorage

if (localStorage.getItem("produits") != null){
    let produitPanier = JSON.parse(localStorage.getItem("produits"));

    for (let produit in produitPanier){

        fetchProductById(produitPanier[produit].id)
   
        .then((data) => {

            // Déclaration des Constantes !

            const template = document.querySelector("#cart_items");
            const article = document.createElement("article");
            const image = document.createElement("img");
            const nomProduit = document.createElement("h2");
            const couleur = document.createElement("p");
            const prix = document.createElement("p");
            const quantity = document.createElement("p");
            const input = document.createElement("input");
            const supp = document.createElement("p")
            const div1 = document.createElement("div");
            const div2 = document.createElement("div");
            const div3 = document.createElement("div");
            const div4 = document.createElement("div");
            const div5 = document.createElement("div");
            const div6 = document.createElement("div");

            // initialisation des class pour Cart.html 

            article.classList.add("cart_item");
            div1.classList.add("cart__item__img");
            div2.classList.add("cart__item__content");
            div3.classList.add("cart__item__content__description");
            div4.classList.add("cart__item__content__settings");
            div5.classList.add("cart__item__content__settings__quantity");
            div6.classList.add("cart__item__content__settings__delete");
            supp.classList.add("deleteItem");
            input.classList.add("itemQuantity");
            input.setAttribute("type", "number");
            input.setAttribute("name", )
            article.setAttribute("data.id", produitPanier[produit].id)
            article.setAttribute("data.color", produitPanier[produit].color)
            







            













        })

        
    }
}