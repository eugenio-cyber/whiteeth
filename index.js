const filters = [
  { name: "Todos", active: true },
  { name: "Pasta de dente", active: false },
  { name: "Escova de dente", active: false },
  { name: "Raspador de língua", active: false },
  { name: "Clareamento", active: false },
  { name: "Aparelhos ortodônticos", active: false },
];

function handleStickyHeader() {
  const header = document.getElementById("myHeader");
  const sticky = header.offsetTop;

  if (window.scrollY > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

function addFilters() {
  const myFilter = document.getElementById("filters");

  for (let i = 0; i < filters.length; i++) {
    const filter = filters[i];
    const filterElement = document.createElement("div");

    filterElement.classList.add("tag");
    filterElement.textContent = filter.name;

    if (filter.active) {
      filterElement.classList.add("active");
    }

    myFilter.appendChild(filterElement);

    filterElement.addEventListener("click", () => {
      if (filter.active && filter.name !== "Todos") {
        filters.forEach((element) => {
          if (element.name != "Todos") {
            element.active = false;
          } else {
            element.active = true;
          }
        });
      } else {
        filters.forEach((element) => {
          if (element.name != filter.name) {
            element.active = false;
          } else {
            element.active = true;
          }
        });
      }

      handleActive();
    });
  }
}

function handleActive() {
  const filtersElements = document.querySelectorAll(".tag");

  filtersElements.forEach((filterElement) => {
    const filter = filters.find(
      (filter) => filter.name === filterElement.textContent
    );

    if (filter.active) {
      filterElement.classList.add("active");
      handleProductsCategory(filter.name);
    } else {
      filterElement.classList.remove("active");
    }
  });
}

function handleProductsCategory(filterName) {
  const toothpasteCategory = document.getElementById("toothpaste-category");
  const toothbrushCategory = document.getElementById("toothbrush-category");
  const otherCategory = document.getElementById("other-category");

  switch (filterName) {
    case "Todos":
      toothpasteCategory.style.display = "block";
      toothbrushCategory.style.display = "block";
      otherCategory.style.display = "block";
      break;
    case "Pasta de dente":
      toothpasteCategory.style.display = "block";
      toothbrushCategory.style.display = "none";
      otherCategory.style.display = "none";
      break;
    case "Escova de dente":
      toothbrushCategory.style.display = "block";
      toothpasteCategory.style.display = "none";
      otherCategory.style.display = "none";
      break;
    default:
      toothpasteCategory.style.display = "none";
      toothbrushCategory.style.display = "none";
      otherCategory.style.display = "block";
      break;
  }
}

window.onscroll = function () {
  handleStickyHeader();
};

addFilters();
