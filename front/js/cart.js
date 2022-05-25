let cart = JSON.parse(localStorage.getItem("Storage"));
const checkNames = new RegExp("^[a-zA-Z-àâäéèêëïîôöùûüç ,.'-]+$");
const checkAdress = new RegExp(
  "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
);
const checkEmail = new RegExp(
  "^[a-zA-Z0-9._-]+[@]{1}[a-zA-Z0-9._-]+[.]{1}[a-z]{2,10}$"
);

// Get Datas from API
const getDatas = async () => {
  if (cart === null || cart.length === 0) {
    const emptyCart = document.getElementById("cart__title");
    emptyCart.textContent = "Votre panier est vide :(";
  } else {
    cart.forEach((item, i) => {
      fetch(`http://localhost:3000/api/products//${item.id}`)
        .then((res) => res.json())
        .then((data) => {
          displayOrders(data, item, i);
        })
        .catch((err) => {
          const serverError = document.createElement("p");
          serverError.textContent = err.message;
          document.getElementById("cart__items").appendChild(serverError);
          serverError.style.textAlign = "center";
        });
    });
  }
};
getDatas();

const displayOrders = (data, item, i) => {
  const { id, name, color, quantity, image, alt } = item;

  const article = document.createElement("article");
  document.getElementById("cart__items").appendChild(article);
  article.classList.add("cart__item");
  article.dataset.id = id;
  article.dataset.color = color;

  // Attributes section
  const imgContainer = document.createElement("div");
  article.appendChild(imgContainer);
  imgContainer.classList.add("cart__item__img");

  const itemImg = document.createElement("img");
  imgContainer.appendChild(itemImg);
  itemImg.src = image;
  itemImg.alt = alt;

  const contentContainer = document.createElement("div");
  article.appendChild(contentContainer);
  contentContainer.classList.add("cart__item__content");

  const descriptionItem = document.createElement("div");
  contentContainer.appendChild(descriptionItem);
  descriptionItem.classList.add("cart__item__content__description");

  const titleItem = document.createElement("h2");
  titleItem.textContent = name;

  const colorItem = document.createElement("p");
  colorItem.textContent = color;

  const priceItem = document.createElement("p");
  priceItem.textContent = data.price + " €";

  descriptionItem.append(titleItem, colorItem, priceItem);

  // Settings section
  const settings = document.createElement("div");
  contentContainer.appendChild(settings);
  settings.classList.add("cart__item__content__settings");

  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add("cart__item__content__settings__quantity");

  const quantityTitle = document.createElement("p");
  quantityTitle.textContent = "Qté : ";

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.classList.add("itemQuantity");
  quantityInput.name = "itemQuantity";
  quantityInput.min = "1";
  quantityInput.max = "100";
  quantityInput.value = quantity;

  const deleteContainer = document.createElement("div");
  deleteContainer.classList.add("cart__item__content__settings__delete");

  settings.append(quantityContainer, deleteContainer);
  quantityContainer.append(quantityTitle, quantityInput);

  const deleteItem = document.createElement("p");
  deleteContainer.appendChild(deleteItem);
  deleteItem.classList.add("deleteItem");
  deleteItem.textContent = "Supprimer";
  deleteItem.addEventListener("click", (e) => {
    const articleToDelete = e.target.closest("article");
    const productToDelete = cart.indexOf(cart[i]);
    articleToDelete.remove();
    cart.splice(productToDelete, 1);
    localStorage.setItem("Storage", JSON.stringify(cart));
    getTotalQuantityPrice(data);
  });
  getTotalQuantityPrice(data);
  updateOrders(data);
};

// Display total quantity and total price order
const getTotalQuantityPrice = (data) => {
  const totalQuantityContainer = document.getElementById("totalQuantity");
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  totalQuantityContainer.textContent = totalQuantity;

  const totalPriceContainer = document.getElementById("totalPrice");
  const totalPrice = data.price * totalQuantity;
  totalPriceContainer.textContent = totalPrice;
};

// Update total quanity and total price order
const updateOrders = (data) => {
  const updateInputs = document.querySelectorAll(".itemQuantity");
  updateInputs.forEach((updateInput) => {
    updateInput.addEventListener("change", (e) => {
      const idUpdate = e.target.closest(".cart__item").dataset.id;
      const colorUpdate = e.target.closest(".cart__item").dataset.color;
      const itemUpdate = cart.find(
        (el) => (el.id === idUpdate) & (el.color === colorUpdate)
      );
      itemUpdate.quantity = Number(updateInput.value);
      if (itemUpdate.quantity <= 0 || itemUpdate.quantity > 100) {
        return alert("Veuillez choisir une quantité comprise entre 1 et 100");
      }
      const orderUpdated = JSON.stringify(cart);
      localStorage.setItem("Storage", orderUpdated);

      getTotalQuantityPrice(data);
    });
  });
};

// Check valid inputs for order form
const checkForm = () => {
  const form = document.querySelector(".cart__order__form");

  form.firstName.addEventListener("input", function () {
    checkFirstName(this);
  });

  const checkFirstName = (firstNameInput) => {
    const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
    if (checkNames.test(firstNameInput.value)) {
      firstNameErrorMsg.textContent = "";
    } else {
      firstNameErrorMsg.textContent = "Merci de renseigner un prénom valide";
    }
  };

  form.lastName.addEventListener("input", function () {
    validLastName(this);
  });

  const validLastName = (lastNameInput) => {
    const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
    if (checkNames.test(lastNameInput.value)) {
      lastNameErrorMsg.textContent = "";
    } else {
      lastNameErrorMsg.textContent = "Merci de renseigner un nom valide";
    }
  };

  form.address.addEventListener("input", function () {
    validAddress(this);
  });

  const validAddress = (addressInput) => {
    const addressErrorMsg = document.getElementById("addressErrorMsg");
    if (checkAdress.test(addressInput.value)) {
      addressErrorMsg.textContent = "";
    } else {
      addressErrorMsg.textContent = "Merci de renseigner une adresse valide";
    }
  };

  form.city.addEventListener("input", function () {
    validCity(this);
  });

  const validCity = (cityInput) => {
    const cityErrorMsg = document.getElementById("cityErrorMsg");
    if (checkNames.test(cityInput.value)) {
      cityErrorMsg.textContent = "";
    } else {
      cityErrorMsg.textContent = "Merci de renseigner une ville valide";
    }
  };

  form.email.addEventListener("input", function () {
    validEmail(this);
  });

  const validEmail = (emailInput) => {
    const emailErrorMsg = document.getElementById("emailErrorMsg");
    if (checkEmail.test(emailInput.value)) {
      emailErrorMsg.textContent = "";
    } else {
      emailErrorMsg.textContent = "Merci de renseigner une adresse mail valide";
    }
  };
};
checkForm();

const sendForm = () => {
  const orderBtn = document.getElementById("order");
  const firstNameField = document.getElementById("firstName");
  const lastNameField = document.getElementById("lastName");
  const addressField = document.getElementById("address");
  const cityField = document.getElementById("city");
  const emailField = document.getElementById("email");

  orderBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (
      !firstNameField.value ||
      !lastNameField.value ||
      !cityField.value ||
      !addressField.value ||
      !emailField.value
    ) {
      return alert("Un ou plusieurs champs sont vides");
    } else if (
      !checkNames.test(firstName.value) ||
      !checkNames.test(lastName.value) ||
      !checkNames.test(city.value) ||
      !checkAdress.test(address.value) ||
      !checkEmail.test(email.value)
    ) {
      return alert("Les champs ne sont pas correctement renseignés");
    } else {
      const orderIds = [];

      cart.forEach((item) => {
        orderIds.push(item.id);
      });

      const order = {
        contact: {
          firstName: firstNameField.value,
          lastName: lastNameField.value,
          address: addressField.value,
          city: cityField.value,
          email: emailField.value,
        },
        products: orderIds,
      };

      const options = {
        method: "POST",
        body: JSON.stringify(order),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch("http://localhost:3000/api/products/order", options)
        .then((res) => res.json())
        .then((data) => {
          localStorage.clear();
          document.location.href =
            "./confirmation.html?orderId=" + data.orderId;
        })
        .catch((err) => {
          alert("Server error" + err.message);
        });
    }
  });
};
sendForm();
