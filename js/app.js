// Get Datas from API
const getDatas = async () => {
  const response = await fetch("http://localhost:3000/api/products");

  if (response.status !== 200) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  displayProducts(data);
  return data;
};

getDatas()
  .then((data) => console.log("resolved", data))
  .catch((err) => console.log("rejected", err.message));

// Display all products
const displayProducts = (products) => {
  products.forEach((product) => {
    const { _id, name, description, imageUrl, altTxt } = product;

    // Create ID Link
    const productLink = document.createElement("a");
    document.querySelector(".items").appendChild(productLink);
    productLink.href = `./product.html?id=${_id}`;

    // Create article container
    const productArticle = document.createElement("article");
    productLink.appendChild(productArticle);

    // Create product's image element
    const productImg = document.createElement("img");
    productArticle.appendChild(productImg);
    productImg.src = imageUrl;
    productImg.alt = altTxt;

    // Create product's title element
    const productName = document.createElement("h3");
    productArticle.appendChild(productName);
    productName.classList.add("productName");
    productName.textContent = name;

    // Create product's description element
    const productDescription = document.createElement("p");
    productArticle.appendChild(productDescription);
    productDescription.classList.add("productName");
    productDescription.textContent = description;
  });
};
