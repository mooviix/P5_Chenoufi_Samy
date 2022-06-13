export function calculQuantity (produitPanier){
    let qtytableau = [0];
    const qtyTotal = document.querySelector('#totalQuantity');

    for (let produit in produitPanier){

        let produitQty = produitPanier[produit].quantity;
        qtytableau.push(produitQty);
    }

    qtytableau = qtytableau.map(x => parseFloat(x));
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    qtytableau = qtytableau.reduce(reducer);

    qtyTotal.textContent = qtytableau;

}


export function calculPrix (produitPanier){

    let prixTableau = [0];
    const prixTotal = document.querySelector('#totalPrice');

    for (let produit in produitPanier){
        
        let prixProduit = produitPanier[produit].prix;
        let qtyProduit = produitPanier[produit].quantity;
        let total =  parseInt(prixProduit) * parseInt(qtyProduit);
        prixTableau.push(total);
        

    }
    
    prixTableau = prixTableau.map((x) => parseInt(x));
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    prixTableau = prixTableau.reduce(reducer);
    
    prixTotal.textContent = prixTableau;

}


export function regexName (name){
    let regName = new RegExp("^[a-zA-Z ,.'-]+$");
    let test = regName.test(name);

    if(test){
        return true;
    }else{
        return false;
    }
}


export function regexAdress (adress){
    let regAdress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let testAdress = regAdress.test(adress);

    if(testAdress){
        return true;
    }else{
        return false;
    }
}


export function regexEmail (email){
    let reg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    let testEmail = reg.test(email);

    if(testEmail){
        return true;
    }else{
        return false;
    }
}


export function productId (produitPanier){
    let tableauId = [];
    for (let produit in produitPanier){
        tableauId.push(produitPanier[produit].id);
    }

    return tableauId;
}