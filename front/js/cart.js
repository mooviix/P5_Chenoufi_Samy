import {fetchProductById} from "./fetcher.js";
import { calculPrix, calculQuantity } from "./calcul.js";

// Vérification du localStorage

function deleteProduit(event){
    let produitPanier = JSON.parse(localStorage.getItem("produits"));
    let target = event.target;
    let article = target.closest("article");
    let articleId = (article.getAttribute("data-id"));
    let articleColor = (article.getAttribute("data-color"));

    produitPanier = produitPanier.filter(tableau => tableau.id !== articleId || tableau.color != articleColor);
    
    localStorage.setItem("produits", JSON.stringify(produitPanier));
    alert("Ce produit a été supprimer du panier");
    window.location.href = "cart.html";
}


if (localStorage.getItem("produits") != null){
    let produitPanier = JSON.parse(localStorage.getItem("produits"));

    for (let produit in produitPanier){

        fetchProductById(produitPanier[produit].id)
   
        .then((data) => {
            console.log(data)
            // Déclaration des Constantes !

            const template = document.querySelector("#cart__items");
            const article = document.createElement("article");
            const image = document.createElement("img");
            const nomProduit = document.createElement("h2");
            const couleur = document.createElement("p");
            const prix = document.createElement("p");
            const quantity = document.createElement("p");
            const input = document.createElement("input");
            const supp = document.createElement("p");
            const div1 = document.createElement("div");
            const div2 = document.createElement("div");
            const div3 = document.createElement("div");
            const div4 = document.createElement("div");
            const div5 = document.createElement("div");
            const div6 = document.createElement("div");

            // initialisation des class 

            article.classList.add("cart__item");
            div1.classList.add("cart__item__img");
            div2.classList.add("cart__item__content");
            div3.classList.add("cart__item__content__description");
            div4.classList.add("cart__item__content__settings");
            div5.classList.add("cart__item__content__settings__quantity");
            div6.classList.add("cart__item__content__settings__delete");
            supp.classList.add("deleteItem");
            input.classList.add("itemQuantity");
            input.setAttribute("type", "number");
            input.setAttribute("min","1");
            input.setAttribute("max","100");
            input.setAttribute("value", produitPanier[produit].quantity);
            article.setAttribute("data-id", produitPanier[produit].id);
            article.setAttribute("data-color", produitPanier[produit].color);

            // ajout des enfants 

            template.appendChild(article);
            article.appendChild(div1);
            article.appendChild(div2);
            div1.appendChild(image);
            div2.appendChild(div3);
            div2.appendChild(div4);
            div3.appendChild(nomProduit);
            div3.appendChild(couleur);
            div3.appendChild(prix);
            div4.appendChild(div5);
            div4.appendChild(div6);
            div5.appendChild(quantity);
            div5.appendChild(input);
            div6.appendChild(supp);

            // ajout du contenu dans l'élément

            image.src = data.imageUrl;
            image.alt = data.altTxt;
            nomProduit.textContent = data.name;
            prix.textContent = data.prix;
            quantity.textContent = 'quantité : ';
            couleur.textContent = 'couleur : ' + produitPanier[produit].color;
            prix.textContent = 'prix : ' + data.price + '€';
            supp.textContent = 'Supprimer ';


            supp.addEventListener("click" , (event) =>{
                deleteProduit(event);
            })




        }) 





    }
    calculQuantity(produitPanier);
    calculPrix(produitPanier);
}






