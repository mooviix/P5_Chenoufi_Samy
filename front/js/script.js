fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(data) {
    for (let product in data){  

      // déclaration des variables pour index.html

      let section = document.getElementById("items");
      let lien = document.createElement("a");
      let article = document.createElement("article");
      let img = document.createElement("img");
      let titre = document.createElement("h3");
      let description = document.createElement("p");

      // initialisation des class pour index.html

      titre.classList.add("productName");
      description.classList.add("productDescription");

      // Ajout des enfants dans index.html

      section.appendChild(lien);
      lien.appendChild(article);
      article.appendChild(img);
      article.appendChild(titre);
      article.appendChild(description);
      
      // ajout du contenu dans l'élement

      img.src = data[product].imageUrl;
      img.alt = data[product].altTxt;
      titre.textContent = data[product].name;
      description.textContent = data[product].description;

      // ajout du lien pour recupérer le produit 

      lien.href = `product.html?id=${data[product]._id}`;
    }
  });
