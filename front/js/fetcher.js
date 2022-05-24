const url = "http://localhost:3000/api/products/";

export async function fetchProductById(id){
    return fetch(url + id)
        .then(resp => resp.json());
};