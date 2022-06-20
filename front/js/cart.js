import {fetchProductById, handlePay} from "./fetcher.js";
import { calculPrix, calculQuantity, productId, regexAdress, regexEmail, regexName} from "./calcul.js";
 

// fonction pour supprimer un article du panier

function deleteProduit(event){
    let produitPanier = JSON.parse(localStorage.getItem("produits"));
    let target = event.target;
    let article = target.closest("article");
    let articleId = (article.getAttribute("data-id"));
    let articleColor = (article.getAttribute("data-color"));

    produitPanier = produitPanier.filter(tableau => tableau.id !== articleId || tableau.color != articleColor);
    
    localStorage.setItem("produits", JSON.stringify(produitPanier));
    alert("Ce produit a été supprimer du panier");
    article.remove();
    calculPrix();
    calculQuantity();

   
}

// Vérification du localStorage


if (localStorage.getItem("produits") != null){
    let produitPanier = JSON.parse(localStorage.getItem("produits"));

    for (let produit in produitPanier){
        fetchProductById(produitPanier[produit].id)
   
        .then((data) => {
            
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

            // écoute l'evenement du click sur le bouton supprimer

            supp.addEventListener("click" , (event) =>{
                deleteProduit(event);
            })

            // fonction pour changer la quantité dans le panier

            input.addEventListener("change" , () => {
                let id = article.dataset.id;
                let color = article.dataset.color;
                
                let same = produitPanier.findIndex(produit => produit.id == id && produit.color == color);

                let ajoutPanier = {  
                    name: data.name,
                    color: color,
                    prix: data.price,
                    id: id,
                    quantity: parseInt(input.value),                      
                };

                produitPanier.splice(same, 1, ajoutPanier);
                localStorage.setItem("produits", JSON.stringify(produitPanier));
                calculQuantity(produitPanier);
                calculPrix(produitPanier);

            })

        }) 


    }
    calculQuantity(produitPanier);
    calculPrix(produitPanier);

    // formulaire regex
    // fonction pour le formulaire
    function confirmation(){
        const form = document.querySelector(".cart__order__form");
        const firstName = document.querySelector("#firstName");
        const errorFirstName = document.querySelector("#firstNameErrorMsg");
        const LastName = document.querySelector("#lastName");
        const errorLastName = document.querySelector("#lastNameErrorMsg");
        const address = document.querySelector("#address");
        const errorAddress = document.querySelector("#addressErrorMsg");
        const city = document.querySelector("#city");
        const errorCity = document.querySelector("#cityErrorMsg");
        const email = document.querySelector("#email");
        const errorEmail = document.querySelector("#emailErrorMsg");
        const order = document.querySelector("#order");
        
        
        
        // vérification des valeurs et regex

        form.addEventListener("submit", (e) => {
            e.preventDefault()

            if(!firstName.value){
                errorFirstName.textContent = "veuillez remplir ce champ";
            }else if(!regexName(firstName.value)){
                errorFirstName.textContent = "veuillez entrée un prénom valide";
            }else if(!LastName.value){
                errorLastName.textContent = "veuillez remplir ce champ";
            }else if(!regexName(LastName.value)){
                errorLastName.textContent = "veuillez entrée un nom valide ";
            }else if(!address.value){
                errorAddress.textContent = "veuillez remplir ce champ";
            }else if(!regexAdress(address.value)){
                errorAddress.textContent = "veuillez mettre une adresse valide";
            }else if(!city.value){
                errorCity.textContent = "veuillez remplir ce champ";
            }else if(!regexName(city.value)){
                errorCity.textContent = "veuillez mettre une ville valide";
            }else if(!email.value){
                errorEmail.textContent = "veuillez remplir ce champ";
            }else if(!regexEmail(email.value)){
                errorEmail.textContent = "veuillez mettre une adresse mail valide";
            }else{

                // création de l'objet order

                let order = {   
                    contact: {  // récupération du contact
                        firstName: firstName.value,
                        lastName: LastName.value,
                        address: address.value,
                        city: city.value,
                        email: email.value,
                    },
                    products: productId(produitPanier), // récupération panier
                };

                const option = {  // requete POST
                    method: "POST",
                    body: JSON.stringify(order),
                    headers: {"Content-type": "application/json"},
                };

                handlePay(option, produitPanier);
            }   
        });
    }

    confirmation();
   
}else{

    // affichage "votre Panier est vide"
    let h1 = document.querySelector("#cartAndFormContainer");
    let texte = h1.children;
    let tableauSelector = texte[0];
    tableauSelector.textContent = "Votre panier est vide";
} 









   


   
        
    
    








