import { products } from "./productsDB.js";

class Products {
  getProducts() {
    return products;
  }
  getProductsByFilter(categoryFilter, sortType) {
    let filteredProducts = products;
    if (categoryFilter.length) {
      filteredProducts = products.filter((p) =>
        categoryFilter.includes(p.category)
      );
    }
    if (sortType === "latest") {
      filteredProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    if (sortType === "earliest") {
      filteredProducts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    }
    return filteredProducts;
  }
}

export default Products;
