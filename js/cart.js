const cart = JSON.parse(localStorage.getItem("Storage"));

const displayOrders = () => {
  if (cart === null || cart.length === 0) {
    const emptyCart = document.getElementById("cart__title");
    emptyCart.textContent = "Votre panier est vide :(";
  } else {
    cart.forEach((item) => {
      const { id, name, color, quantity, image, alt } = item;

      // Get product's price from API
      fetch(`http://localhost:3000/api/products/${id}`)
        .then((response) => response.json())
        .then((data) => {
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
          deleteContainer.classList.add(
            "cart__item__content__settings__delete"
          );

          settings.append(quantityContainer, deleteContainer);
          quantityContainer.append(quantityTitle, quantityInput);

          const deleteItem = document.createElement("p");
          deleteContainer.appendChild(deleteItem);
          deleteItem.classList.add("deleteItem");
          deleteItem.textContent = "Supprimer";

          getTotalQuantityPrice(data);
          updateOrders(data);
          deleteOrder(data);
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
displayOrders();

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
      const orderUpdated = JSON.stringify(cart);
      localStorage.setItem("Storage", orderUpdated);

      getTotalQuantityPrice(data);
    });
  });
};

// Delete item from order
const deleteOrder = (data) => {
  const deleteInputs = document.querySelectorAll(".deleteItem");
  deleteInputs.forEach((deleteInput, i) => {
    deleteInput.addEventListener("click", () => {
      const articleToDelete = deleteInput.closest("article");
      articleToDelete.remove();

      const productToDelete = cart.indexOf(cart[i]);
      cart.splice(productToDelete);
      localStorage.setItem("Storage", JSON.stringify(cart));

      getTotalQuantityPrice(data);
    });
  });
};
