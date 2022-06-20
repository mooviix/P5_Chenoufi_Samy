const url = "http://localhost:3000/api/products/";
const urlOrder = 'http://localhost:3000/api/products/order';

// fonction pour recuperer URL + ID

export async function fetchProductById(id){
    return fetch(url + id)
        .then(resp => resp.json());
};

// fonction pour renvoyer a confirmation

export function handlePay(option, produitPanier){
    return fetch(urlOrder, option)
        .then(resp => resp.json())

        .then((data) => {
            localStorage.clear()      
            // Importation de l'orderId dans le paramètre de l'url :               
            window.location.href = `confirmation.html?orderId=${data.orderId}`;
            
        });

};