class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }
  static getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
  }
  static getProductById(id) {
    const _products = JSON.parse(localStorage.getItem("products"));
    return _products.find((p) => p.id === id);
  }
  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

export default Storage;
