import {fetchProductById} from "./fetcher.js";

let url = new URL (document.location);
let id = url.searchParams.get("id");

let template = document.querySelector(".item__img");
let img = document.createElement("img");
let titre = document.getElementById("title");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let choix = document.getElementById("colors");

template.appendChild(img);

async function byId(id){
    let reponse = await fetchProductById(id);
    console.log(reponse);

    function getElement(){

        img.src = reponse.imageUrl;
        img.alt = reponse.altTxt;
        titre.innerHTML = reponse.name;
        prix.innerHTML = reponse.price;
        description.innerHTML = reponse.description;
        let colors = reponse.colors;

        for (let color of colors){   // <====  pourquoi of fonctionne et pas in 
            let option = document.createElement("option"); // création de l'élément
            choix.appendChild(option);  // placement de l'élément
            option.innerHTML = color;     // ajout du contenue dans l'élément

        }
    }
        
    getElement();


}

byId(id);

