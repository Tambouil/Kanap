// Get Datas from API
const getDatas = async () => {
  const response = await fetch("http://localhost:3000/api/products");

  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  displayProducts(data);
};

getDatas().catch((err) => {
  const serverError = document.createElement("p");
  serverError.textContent = err.message;
  document.querySelector(".items").appendChild(serverError);
});

// Display all products
const displayProducts = (products) => {
  products.forEach((product) => {
    const { _id, name, description, imageUrl, altTxt } = product;

    const productLink = document.createElement("a");
    document.querySelector(".items").appendChild(productLink);
    productLink.href = `./product.html?id=${_id}`;

    const productArticle = document.createElement("article");
    productLink.appendChild(productArticle);

    const productImg = document.createElement("img");
    productImg.src = imageUrl;
    productImg.alt = altTxt;

    const productName = document.createElement("h3");
    productName.classList.add("productName");
    productName.textContent = name;

    const productDescription = document.createElement("p");
    productDescription.classList.add("productName");
    productDescription.textContent = description;

    productArticle.append(productImg, productName, productDescription);
  });
};
