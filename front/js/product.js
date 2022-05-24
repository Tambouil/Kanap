let storedName = "";
let storedPrice = 0;
let storedImg = "";
let storedAltTxt = "";

// Get id from url for each product
const queryUrl = window.location.search;
const params = new URLSearchParams(queryUrl);
const productId = params.get("id");

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
};

getDatas().catch((err) => {
  const serverError = document.createElement("p");
  serverError.textContent = err.message;
  document.querySelector(".item").appendChild(serverError);
});

// Display attributes for each product
const displayProducts = (product) => {
  const { name, description, imageUrl, altTxt, colors, price } = product;
  storedName = name;
  storedPrice = price;
  storedImg = imageUrl;
  storedAltTxt = altTxt;

  // Create product's image element
  const img = document.createElement("img");
  img.src = imageUrl;
  img.alt = altTxt;
  const productImg = document.querySelector(".item__img");
  productImg.appendChild(img);

  // Create product's title element
  const pageTitle = document.getElementById("productTitle");
  const title = document.getElementById("title");
  pageTitle.textContent = name;
  title.textContent = name;

  // Create product's price element
  const productPrice = document.getElementById("price");
  productPrice.textContent = price;

  // Create product's description element
  const productDescription = document.getElementById("description");
  productDescription.textContent = description;

  // Create product's colors list
  const colorsList = document.getElementById("colors");
  colors.forEach((color) => {
    const colorOptions = document.createElement("option");
    colorOptions.value = color;
    colorOptions.textContent = color;
    colorsList.appendChild(colorOptions);
  });
  const cartButton = document.getElementById("addToCart");
  cartButton.addEventListener("click", handleClick);
};

// Get values from user choice on click
const handleClick = () => {
  const colorValue = document.getElementById("colors").value;
  const quantityValue = document.getElementById("quantity").value;

  if (colorValue === "" || quantityValue == 0) {
    return alert("veuillez sélectionner une couleur et une quantité");
  } else if (quantityValue <= 0 || quantityValue > 100) {
    return alert("Veuillez choisir une quantité comprise entre 1 et 100");
  } else {
    addToCart(colorValue, quantityValue);
    window.alert(
      `Votre commande a bien été ajoutée au panier. Pour le consulter, cliquez sur OK`
    );
    window.location.href = "./cart.html";
  }
};

// Store selected datas to localStorage
const addToCart = (colorValue, quantityValue) => {
  const storedData = {
    id: productId,
    name: storedName,
    color: colorValue,
    quantity: Number(quantityValue),
    image: storedImg,
    alt: storedAltTxt,
  };
  let cart = JSON.parse(localStorage.getItem("Storage"));

  // If Cart exist
  if (cart) {
    const itemToUpdate = cart.find(
      (item) => item.id === productId && item.color === colorValue
    );
    //Update quantity if the product is already in the cart
    if (itemToUpdate) {
      const quantityToUpdate = storedData.quantity + itemToUpdate.quantity;
      itemToUpdate.quantity = quantityToUpdate;
      localStorage.setItem("Storage", JSON.stringify(cart));

      // Store product in localStorage
    } else {
      cart.push(storedData);
      localStorage.setItem("Storage", JSON.stringify(cart));
    }
    //If cart doesn't exist
  } else {
    cart = [];
    cart.push(storedData);
    localStorage.setItem("Storage", JSON.stringify(cart));
  }
};
