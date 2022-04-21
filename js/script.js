// Get Data from API
const getDatas = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return printProducts(data);
};
getDatas();

const printProducts = (data) => {
  data.forEach((product) => {
    console.log(product);

    const { _id, name, description, imageUrl, altTxt } = product;

    const productLink = creatLink(_id);
    const productArticle = createArticle();
    const productImg = createImg(imageUrl, altTxt);
    const productTitle = createTitle(name);
    const productDescription = createDescription(description);

    productArticle.appendChild(productImg);
    productArticle.appendChild(productTitle);
    productArticle.appendChild(productDescription);

    appendChilden(productLink, productArticle);
  });
};

const creatLink = (id) => {
  const link = document.createElement("a");
  link.href = "./product.html?id=" + id;
  return link;
};

const appendChilden = (productLink, productArticle) => {
  const items = document.getElementById("items");
  items.appendChild(productLink);
  productLink.appendChild(productArticle);
};

const createArticle = () => {
  const article = document.createElement("article");
  return article;
};

const createImg = (imageUrl, altTxt) => {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
};

const createTitle = (name) => {
  const title = document.createElement("h3");
  title.textContent = name;
  return title;
};

const createDescription = (description) => {
  const desc = document.createElement("p");
  desc.textContent = description;
  return desc;
};
