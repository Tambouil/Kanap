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
      const article = document.createElement("article");
      document.getElementById("cart__items").appendChild(article);
      article.classList.add("cart__item");
      article.dataset.id = item.id;
      article.dataset.color = item.color;

      const imgContainer = document.createElement("div");
      article.appendChild(imgContainer);
      imgContainer.classList.add("cart__item__img");

      const img = document.createElement("img");
      imgContainer.appendChild(img);
      img.src = item.image;
      img.alt = item.alt;

      const contentContainer = document.createElement("div");
      article.appendChild(contentContainer);
      contentContainer.classList.add("cart__item__content");

      const description = document.createElement("div");
      contentContainer.appendChild(description);
      description.classList.add("cart__item__content__description");

      const title = document.createElement("h2");
      title.textContent = item.name;

      const color = document.createElement("p");
      color.textContent = item.color;

      const price = document.createElement("p");
      price.textContent = item.price + " €";

      description.append(title, color, price);

      const settings = document.createElement("div");
      contentContainer.appendChild(settings);
      settings.classList.add("cart__item__content__settings");

      const quantityContainer = document.createElement("div");
      quantityContainer.classList.add(
        "cart__item__content__settings__quantity"
      );

      const quantity = document.createElement("p");
      quantity.textContent = "Qté : ";

      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.classList.add("itemQuantity");
      quantityInput.name = "itemQuantity";
      quantityInput.min = "1";
      quantityInput.max = "100";
      quantityInput.value = item.quantity;

      const deleteContainer = document.createElement("div");
      deleteContainer.classList.add("cart__item__content__settings__delete");

      settings.append(quantityContainer, deleteContainer);
      quantityContainer.append(quantity, quantityInput);

      const deleteItem = document.createElement("p");
      deleteContainer.appendChild(deleteItem);
      deleteItem.classList.add("deleteItem");
      deleteItem.textContent = "Supprimer";
    });
  }
};
displayOrders();
