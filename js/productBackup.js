// Get id url params for each product
const queryUrl = window.location.search;
const params = new URLSearchParams(queryUrl);
const productId = params.get("id");

let priceStorage = 0;

// Get Datas from API
const getDatas = async () => {
  const response = await fetch(
    `http://localhost:3000/api/products/${productId}`
  );

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

// Display attributes for each product
const displayProducts = (product) => {
  const { name, description, imageUrl, altTxt, colors, price } = product;

  priceStorage = price;

  createImg(imageUrl, altTxt);
  createTitle(name);
  createPrice(price);
  createDescription(description);
  createColorsList(colors);
};

// Create product's image element
const createImg = (url, alt) => {
  const img = document.createElement("img");
  img.src = url;
  img.alt = alt;
  const productImg = document.querySelector(".item__img");
  productImg.appendChild(img);
};

// Create product's title element
const createTitle = (name) => {
  const pageTitle = document.getElementById("productTitle");
  const title = document.getElementById("title");
  pageTitle.textContent = name;
  title.textContent = name;
};

// Create product's price element
const createPrice = (price) => {
  const productPrice = document.getElementById("price");
  productPrice.textContent = price;
};

// Create product's description element
const createDescription = (description) => {
  const productDescription = document.getElementById("description");
  productDescription.textContent = description;
};

// Create product's colors list
const createColorsList = (colors) => {
  const colorsList = document.getElementById("colors");
  colors.forEach((color) => {
    const colorOptions = document.createElement("option");
    colorOptions.value = color;
    colorOptions.textContent = color;
    colorsList.appendChild(colorOptions);
  });
};

// Get values from user choice on click
const handleClick = () => {
  const colorValue = document.getElementById("colors").value;
  const quantityValue = document.getElementById("quantity").value;

  if (colorValue === "" || quantityValue == 0) {
    alert("veuillez sélectionner une couleur et une quantité");
  } else {
    addToCart(colorValue, quantityValue);
    window.location.href = "./cart.html";
  }
};
const cartButton = document.getElementById("addToCart");
cartButton.addEventListener("click", handleClick);

// Add selected data to local storage
const addToCart = (colorValue, quantityValue) => {
  const storeData = {
    id: productId,
    price: priceStorage,
    color: colorValue,
    quantity: quantityValue,
  };
  localStorage.setItem(productId, JSON.stringify(storeData));
};
