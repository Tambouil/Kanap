// Get order id from url
const queryUrl = window.location.search;
const params = new URLSearchParams(queryUrl);
const id = params.get("orderId");

const orderConfirmation = () => {
  const displayOrderId = document.getElementById("orderId");
  displayOrderId.textContent = id;
};
orderConfirmation();
