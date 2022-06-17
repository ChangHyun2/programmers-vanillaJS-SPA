import { getProducts } from "../api.js";
import router from "../router.js";
import { storage } from "../utils/data.js";
import { withComma } from "../utils/string.js";

export default function ($p) {
  let state = { products: storage.get(storage.keys.products) || [] };

  const handleClickProductItem = (e) => {
    const $productItem = e.target.closest("li");

    if ($productItem) {
      router.link(`/products/${$productItem.dataset.id}`);
    }
  };

  const $ = document.createElement("ul");
  $.className = "ProductList";
  $.addEventListener("click", handleClickProductItem);
  $p.append($);

  this.render = () => {
    $.innerHTML = `
        ${state.products
          .map(
            (product) => `
            <li class="Product" data-id=${product.id}>
                <img src="${product.imageUrl}">
                <div class="Product__info">
                <div>${product.name}</div>
                <div>${withComma(product.price)}원~</div>
                </div>
            </li>`
          )
          .join("")}
    `;
  };

  const setState = (newState) => {
    state = { ...state, ...newState };
    this.render();
  };

  const fetchProducts = async () => {
    try {
      setState({ isLoading: true });
      const products = await getProducts();
      storage.set(storage.keys.products, products);
      setState({ isLoading: false, products });
    } catch (e) {
      setState({ isLoading: false });
      alert(e.message);
    }
  };

  if (!state.products.length) {
    fetchProducts();
  }
}
