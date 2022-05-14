const cart = [];

// Convert localstorage to an array of objects
const localStorageToCart = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const storedOrder = localStorage.getItem(localStorage.key(i));
    const orders = JSON.parse(storedOrder);
    cart.push(orders);
  }
  console.log(cart);
};
localStorageToCart();

// Display all orders in the cart
const displayOrders = () => {
  if (cart.length === 0) {
    const emptyCart = document.getElementById("cart__title");
    emptyCart.textContent = "Votre panier est vide :(";
  } else {
    cart.forEach((item) => {
      const { id, name, price, color, quantity, image, alt } = item;

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
      priceItem.textContent = price + " €";

      descriptionItem.append(titleItem, colorItem, priceItem);

      // Settings section
      const settings = document.createElement("div");
      contentContainer.appendChild(settings);
      settings.classList.add("cart__item__content__settings");

      const quantityContainer = document.createElement("div");
      quantityContainer.classList.add(
        "cart__item__content__settings__quantity"
      );

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
    });
  }
};
displayOrders();

const getTotalQuantity = () => {
  const totalQuantity = document.getElementById("totalQuantity");
  const total = cart.reduce((total, item) => total + item.quantity, 0);
  totalQuantity.textContent = total;
};
getTotalQuantity();

const getTotalPrice = () => {
  const totalPrice = document.getElementById("totalPrice");
  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  totalPrice.textContent = total;
};
getTotalPrice();

function updateOrders() {
  const updateInputs = document.querySelectorAll(".itemQuantity");
  // console.log( updateInputs);
  updateInputs.forEach((updateInput) => {
    // console.log(updateInput);
    updateInput.addEventListener("change", (e) => {
      let idUpdate = e.target.closest(".cart__item").dataset.id;
      let colorUpdate = e.target.closest(".cart__item").dataset.color;
      const itemUpdate = cart.find(
        (el) => (el.id === idUpdate) & (el.color === colorUpdate)
      );

      itemUpdate.quantity = Number(updateInput.value);

      console.log(itemUpdate);

      getTotalQuantity();
      getTotalPrice();
    });
  });
}
updateOrders();
