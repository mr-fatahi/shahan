const navMenuIcon = document.querySelector(".nav__menu-icon");
const headerBackdrop = document.querySelector(".header__backdrop");
const headerMenu = document.querySelector(".header__menu");
const menuCloseBtn = document.querySelector(".menu__close-btn");
const barOne = document.querySelector(".bar-one");
const barTwo = document.querySelector(".bar-two");
const barThree = document.querySelector(".bar-three");

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
navMenuIcon.addEventListener("click", showMenuModal);
headerBackdrop.addEventListener("click", closeMenuModal);
menuCloseBtn.addEventListener("click", closeMenuModal);
window.addEventListener("resize", () => {
    if(window.innerWidth >= 768) closeMenuModal();
})
