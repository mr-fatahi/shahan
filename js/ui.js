import Storage from "./storage.js";

const productsDOM = document.querySelector(".products");
const cartItems = document.querySelector(".cart__badge");
const cartTotal = document.querySelector(".cart__total");
const cartContainer = document.querySelector(".cart__modal__container");
const clearCartBtn = document.querySelector(".clear-cart");

let cart;
let buttonsDOM = [];

class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      let tags = "";
      product.filling.forEach(
        (item) => (tags += `<span class="badge badge__tag">${item}</span>`)
      );
      result += `<section class="product block">
          <div class="product__image">
            <img src=${product.imageUrl} alt=${product.name}>
          </div>
          <div class="product__description">
            <a class="product__name" href="#">${product.name}</a>
            <p class="product__filling">فیلینگ: ${tags}</p>
            <div class="product__control">
              <button data-id=${
                product.id
              } class="btn btn--primary add-to-cart">افزودن به سبد</button>
              <p class="product__price"><span>${product.price.toLocaleString()}</span> تومان</p>
            </div>
          </div>
        </section>`;
    });
    productsDOM.innerHTML = result;
  }
  getAddBtns() {
    const addTocartBtns = [...document.querySelectorAll(".add-to-cart")];
    buttonsDOM = addTocartBtns;
    addTocartBtns.forEach((btn) => {
      const id = Number(btn.dataset.id);
      const isInCart = cart.find((c) => c.id === id);
      if (isInCart) {
        btn.innerText = "افزوده شده";
        btn.disabled = true;
      }
      btn.addEventListener("click", () => {
        btn.innerText = "افزوده شده";
        btn.disabled = true;
        const addedProduct = { ...Storage.getProductById(id), qty: 1 };
        cart = [...cart, addedProduct];
        Storage.saveCart(cart);
        this.setCartValue(cart);
        this.addCartItem(addedProduct);
      });
    });
  }
  setCartValue(cart) {
    let tempCartItems = 0;
    const totalPrice = cart.reduce((acc, curr) => {
      tempCartItems += curr.qty;
      return curr.qty * curr.price + acc;
    }, 0);
    cartItems.innerText = tempCartItems;
    cartTotal.innerText = totalPrice.toLocaleString();
  }
  addCartItem(product) {
    let tags = "";
    product.filling.forEach(
      (item) => (tags += `<span class="badge badge__tag">${item}</span>`)
    );
    const div = document.createElement("div");
    div.classList.add("cart__modal");
    div.innerHTML = `<div class="cart__image">
                <img
                  src=${product.imageUrl}
                  alt=${product.name}
                />
              </div>
              <div class="cart__info">
                <p class="cart__product__name">${product.name}</p>
                <p class="cart__product__filling">
                  فیلینگ: ${tags}
                </p>
                <p class="cart__product__price">
                  <span class="price">${product.price.toLocaleString()}</span> تومان
                </p>
              </div>
              <div class="cart__action">
                <div class="action__inc-dec">
                  <span class="action__inc"
                    ><i data-id=${product.id} class="fa-solid fa-chevron-up"></i
                  ></span>
                  <span class="qty">${product.qty}</span>
                  <span class="action__dec"
                    ><i data-id=${
                      product.id
                    } class="fa-solid fa-chevron-down"></i
                  ></span>
                </div>
                <span class="action__del"
                  ><i data-id=${product.id} class="fa-solid fa-trash-can"></i
                ></span>
              </div>`;
    cartContainer.appendChild(div);
  }
  setupApp() {
    cart = Storage.getCart();
    this.setCartValue(cart);
    this.populateCart(cart);
  }
  populateCart(cart) {
    cart.forEach((item) => this.addCartItem(item));
  }
  cartLogic(cb) {
    clearCartBtn.addEventListener("click", () => this.clearCart(cb));
    cartContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-trash-can")) {
        const trashIcon = e.target;
        const id = Number(trashIcon.dataset.id);
        cartContainer.removeChild(
          trashIcon.parentElement.parentElement.parentElement
        );
        this.removeItem(id);
      } else if (e.target.classList.contains("fa-chevron-up")) {
        const incIcon = e.target;
        const id = Number(incIcon.dataset.id);
        const addedItem = cart.find((item) => item.id === id);
        addedItem.qty++;
        Storage.saveCart(cart);
        this.setCartValue(cart);
        incIcon.parentElement.nextElementSibling.innerText = addedItem.qty;
      } else if (e.target.classList.contains("fa-chevron-down")) {
        const decIcon = e.target;
        const id = Number(decIcon.dataset.id);
        const substractedItem = cart.find((item) => item.id === id);
        if (substractedItem.qty === 1) {
          this.removeItem(id);
          cartContainer.removeChild(
            decIcon.parentElement.parentElement.parentElement.parentElement
          );
          if (cartContainer.children.length === 0) cb();
        }
        substractedItem.qty--;
        Storage.saveCart(cart);
        this.setCartValue(cart);
        decIcon.parentElement.previousElementSibling.innerText =
          substractedItem.qty;
      }
    });
  }
  clearCart(cb) {
    cart.forEach((item) => this.removeItem(item.id));
    while (cartContainer.children.length) {
      cartContainer.removeChild(cartContainer.children[0]);
    }
    cb();
  }
  removeItem(id) {
    cart = cart.filter((item) => item.id !== id);
    this.setCartValue(cart);
    Storage.saveCart(cart);
    const button = this.getSingleButton(id);
    button.innerText = "افزودن به سبد";
    button.disabled = false;
  }
  getSingleButton(id) {
    return buttonsDOM.find((btn) => Number(btn.dataset.id) === id);
  }
}

export default UI;
