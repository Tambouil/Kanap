// Get Data from API
const getDatas = async () => {
  const response = await fetch("http://localhost:3000/api/products");
  const data = await response.json();
  return printProducts(data);
};
getDatas();

// Display all products
const printProducts = (data) => {
  data.forEach((product) => {
    console.log(product);

    const { _id, name, description, imageUrl, altTxt } = product;

    const productLink = creatLink(_id);
    const productArticle = document.createElement("article");
    const productImg = createImg(imageUrl, altTxt);
    const productTitle = createTitle(name);
    const productDescription = createDescription(description);

    appendLink(productLink, productArticle);
    appendElements(
      productArticle,
      productImg,
      productTitle,
      productDescription
    );
  });
};

// Create ID Link element
const creatLink = (id) => {
  const link = document.createElement("a");
  link.href = "./product.html?id=" + id;
  return link;
};

// Create product's image element
const createImg = (imageUrl, altTxt) => {
  const image = document.createElement("img");
  image.src = imageUrl;
  image.alt = altTxt;
  return image;
};

// Create product's title element
const createTitle = (name) => {
  const title = document.createElement("h3");
  title.textContent = name;
  return title;
};

// Create product's description element
const createDescription = (description) => {
  const desc = document.createElement("p");
  desc.textContent = description;
  return desc;
};

// Append Link & Article to Items
const appendLink = (productLink, productArticle) => {
  const items = document.getElementById("items");
  items.appendChild(productLink);
  productLink.appendChild(productArticle);
};

// Append Image, title and description to each article
const appendElements = (
  productArticle,
  productImg,
  productTitle,
  productDescription
) => {
  productArticle.append(productImg, productTitle, productDescription);
};
