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

