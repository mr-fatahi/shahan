import Products from "./products.js";
import Storage from "./storage.js";
import UI from "./ui.js";

let filters = [];
let sortType = "latest";

const navMenuIcon = document.querySelector(".nav__menu-icon");
const headerBackdrop = document.querySelector(".header__backdrop");
const headerMenu = document.querySelector(".header__menu");
const menuCloseBtn = document.querySelector(".menu__close-btn");
const barOne = document.querySelector(".bar-one");
const barTwo = document.querySelector(".bar-two");
const barThree = document.querySelector(".bar-three");
const cartBackdrop = document.querySelector(".cart__backdrop");
const cartContent = document.querySelector(".cart__content");
const cartBtn = document.querySelector(".cart__btn");
const closeModalBtn = document.querySelector(".close-modal");
const accardionHeader = [...document.querySelectorAll(".accardion__header")];
const accardionBody = [...document.querySelectorAll(".accardion__body")];
const accardionChev = [...document.querySelectorAll(".accardion-chevron")];
const filterBtn = [...document.querySelectorAll(".filter-btn")];
const filterBackdrop = document.querySelector(".sort-filter-backdrop");
const filterModal = [...document.querySelectorAll(".sort-filter-modal")];
const closeFilterModalBtn = [
  ...document.querySelectorAll(".close-filter-modal"),
];
const checkbox = [...document.querySelectorAll("input[name=checkbox]")];
const radio = [...document.querySelectorAll("input[name=sort]")];

function showMenuModal() {
  headerBackdrop.style.display = "block";
  headerMenu.style.opacity = "1";
  headerMenu.style.right = "0";
  barOne.style.transform = "rotate(45deg)";
  barTwo.style.transform = "rotate(-45deg) translate(5px, -6px)";
  barThree.style.display = "none";
}
function closeMenuModal() {
  headerBackdrop.style.display = "none";
  headerMenu.style.opacity = "0";
  headerMenu.style.right = "-100%";
  barOne.style.transform = "rotate(0deg)";
  barTwo.style.transform = "rotate(0deg) translate(0, 0px)";
  barThree.style.display = "block";
}
function showCartModal() {
  cartBackdrop.classList.remove("hidden");
}
function closeCartModal() {
  cartBackdrop.classList.add("hidden");
}
function showFilterModal(e) {
  filterBackdrop.style.display = "block";
  filterModal.forEach((modal) => {
    if (modal.dataset.type === e.target.dataset.type) {
      modal.style.opacity = "1";
      modal.style.bottom = "0";
    }
  });
}
function closeFilterModal() {
  filterBackdrop.style.display = "none";
  filterModal.forEach((modal) => {
    modal.style.opacity = "0";
    modal.style.bottom = "-100%";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const products = new Products().getProducts();
  const ui = new UI();
  ui.setupApp();
  ui.displayProducts(products);
  ui.getAddBtns();
  ui.cartLogic(closeCartModal);
  Storage.saveProducts(products);
});

navMenuIcon.addEventListener("click", showMenuModal);
headerBackdrop.addEventListener("click", closeMenuModal);
menuCloseBtn.addEventListener("click", closeMenuModal);
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) closeMenuModal();
});
cartBtn.addEventListener("click", showCartModal);
cartBackdrop.addEventListener("click", closeCartModal);
closeModalBtn.addEventListener("click", closeCartModal);
cartContent.addEventListener("click", (e) => e.stopPropagation());
accardionHeader.forEach((acc) => {
  acc.addEventListener("click", () => {
    accardionBody.forEach((body) => {
      if (acc.dataset.type === body.dataset.type) {
        body.classList.toggle("extended");
      }
    });
    accardionChev.forEach((chev) => {
      if (acc.dataset.type === chev.dataset.type) {
        chev.classList.toggle("rotate");
      }
    });
  });
});
filterBtn.forEach((btn) =>
  btn.addEventListener("click", (e) => showFilterModal(e))
);
filterBackdrop.addEventListener("click", closeFilterModal);
closeFilterModalBtn.forEach((btn) =>
  btn.addEventListener("click", closeFilterModal)
);
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024)
    filterModal.forEach((modal) => (modal.style.opacity = "1"));
});
checkbox.forEach((box) => {
  box.addEventListener("change", (e) => {
    if (e.target.checked) {
      filters = [...filters, e.target.id];
    } else {
      filters = filters.filter((f) => f !== e.target.id);
    }
    const products = new Products().getProductsByFilter(filters, sortType);
    const ui = new UI();
    ui.displayProducts(products);
    ui.getAddBtns();
  });
});
radio.forEach(box => {
  box.addEventListener("change", (e) => {
    sortType = e.target.id;
    const products = new Products().getProductsByFilter(filters, sortType);
    const ui = new UI();
    ui.displayProducts(products);
    ui.getAddBtns();
  })
})