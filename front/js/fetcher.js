import { productId } from "./calcul.js";

const url = "http://localhost:3000/api/products/";
const urlOrder = 'http://localhost:3000/api/products/order';

export async function fetchProductById(id){
    return fetch(url + id)
        .then(resp => resp.json());
};


export function handlePay(option, produitPanier){
    return fetch(urlOrder, option)
        .then(resp => resp.json())

        .then((data) => {
            localStorage.clear()
            localStorage.setItem("products", JSON.stringify(productId(produitPanier)));          
            // Importation de l'orderId dans le paramètre de l'url :               
            window.location.href = `confirmation.html?orderId=${data.orderId}`;
            
        });

};