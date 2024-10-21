import { products } from "./products.js";
import { filters } from "./filters.js";

const productCart = [];

function addFilters() {
  const myFilter = document.getElementById("filters");

  filters.forEach((filter) => {
    const filterElement = document.createElement("div");

    filterElement.classList = `tag ${filter.active ? "active" : ""}`;
    filterElement.textContent = filter.name;

    myFilter.appendChild(filterElement);

    filterElement.addEventListener("click", () => {
      const filterActive = filters.find((filter) => filter.active);

      if (filterActive.name === filter.name) {
        filters.forEach((element) => {
          element.active = element.name === "Todos";
        });
      } else {
        filters.forEach((element) => {
          element.active = element.name === filter.name;
        });
      }

      handleActiveFilter();
    });
  });
}

function handleActiveFilter() {
  const filterActive = filters.find((filter) => filter.active);
  const filtersElements = document.querySelectorAll(".tag");

  filtersElements.forEach((filterElement) => {
    if (filterActive.name === filterElement.textContent) {
      filterElement.classList.add("active");
      handleProductsCategory(filterActive.name);
    } else {
      filterElement.classList.remove("active");
    }
  });
}

function handleProductsCategory(filterName) {
  const toothpasteCategory = document.getElementById("toothpaste-category");
  const toothbrushCategory = document.getElementById("toothbrush-category");
  const otherCategory = document.getElementById("other-category");

  const categories = {
    Todos: [toothpasteCategory, toothbrushCategory, otherCategory],
    "Pasta de dente": [toothpasteCategory],
    "Escova de dente": [toothbrushCategory],
    default: [otherCategory],
  };

  const categoryToShow = categories[filterName] || categories.default;

  categories.Todos.forEach((category) => {
    category.style.display = "none";
  });

  categoryToShow.forEach((category) => {
    category.style.display = "block";
  });
}

function createProducts(product) {
  let offerAlert = "";
  let price = `<p>R$${product.price.toFixed(2)}</p>`;
  let oldPrice = "";

  const stars = Array(Math.floor(product.stars))
    .fill('<img src="assets/star.png" alt="Estrela" />')
    .join("");

  const halfStar =
    product.stars % 1 >= 0.5
      ? '<img src="assets/star-half.png" alt="Meia estrela" />'
      : "";

  if (product.isPromotion) {
    offerAlert = `<div class="offer-alert"><span>30% OFF</span></div>`;
    price = `<p>R$${(product.price - product.discount).toFixed(2)}</p>`;
    oldPrice = `<span>R$${product.price.toFixed(2)}</span>`;
  }

  return `
    <div class="product">
      ${offerAlert}
      <img src="${product.img}" alt="${product.name}" />
      <div class="product-info">
        <div class="product-rating">
          ${stars}${halfStar}
          <span>(${product.ratings})</span>
        </div>
        <h4>${product.name}</h4>
        <div class="product-price">
          ${oldPrice}${price}
        </div>
        <div class="product-button" id="product-button" data-product-id="${product.id}">
          <span>Adicionar ao carrinho</span>
        </div>
      </div>
    </div>
  `;
}

function addProducts() {
  const toothpasteContainer = document.getElementById("toothpaste-list");
  const toothbrushContainer = document.getElementById("toothbrush-list");
  const otherContainer = document.getElementById("other-list");
  const toothpasteProducts = [];
  const toothbrushProducts = [];
  const otherProducts = [];

  products.forEach((product) => {
    switch (product.type) {
      case "toothpaste":
        toothpasteProducts.push(createProducts(product));
        break;
      case "toothbrush":
        toothbrushProducts.push(createProducts(product));
        break;

      default:
        otherProducts.push(createProducts(product));
        break;
    }
  });

  toothpasteContainer.innerHTML = toothpasteProducts;
  toothbrushContainer.innerHTML = toothbrushProducts;
  otherContainer.innerHTML = otherProducts;

  handleProductCart();
}

function handleProductCart() {
  document.querySelectorAll(".product-button").forEach((item) => {
    item.addEventListener("click", () => {
      const productCartElement = document.getElementById("product-cart");

      productCart.push(products.find((p) => p.id == item.dataset.productId));
      productCartElement.textContent = productCart.length;
    });
  });
}

addFilters();
addProducts();
