import { getProduct } from "../api.js";
import ProductOptions from "../components/ProductOptions.js";
import SelectedOptions from "../components/SelectedOptions.js";
import { storage } from "../utils/data.js";
import { withComma } from "../utils/string.js";

export default function ProductDetailPage($p) {
  const $ = document.createElement("div");
  $.className = "ProductDetailPage";
  $p.append($);

  let state = {
    selectedOptions: [],
    product: null,
    isLoading: false,
  };

  const setState = (partialState) => {
    state = { ...state, ...partialState };
    this.render();
  };

  this.render = () => {
    const { isLoading, product, selectedOptions } = state;

    if (isLoading) {
      $.innerHTML = `<div>loading...</div>`;
      return;
    }

    if (product === null) {
      $.innerHTML = "<div><상품 정보를 불러올 수 없습니다./div>";
      return;
    }

    const { imageUrl, name, price } = product;

    $.innerHTML = `
        <h1>커피잔 상품 정보</h1>
        <div class="ProductDetail">
            <img src="${imageUrl}">
            <div class="ProductDetail__info">
                <h2>${name}</h2>
                <div class="ProductDetail__price">${withComma(price)}원~</div>
                <select class="Product__options"></select>
                <div class="ProductDetail__selectedOptions"></div>
            </div>
        </div>`;

    const $productOptions = $.querySelector(".Product__options");
    const $selectedOptions = $.querySelector(".ProductDetail__selectedOptions");

    new ProductOptions($productOptions, product, addSelectedOption).render();
    new SelectedOptions($selectedOptions, product, selectedOptions, updateSelectedOption).render();
  };

  const updateSelectedOption = (id, count) => {
    const { selectedOptions } = state;

    selectedOptions.find((selected) => selected.productOption.id === id).count = count;
    setState({ selectedOptions });
  };

  const addSelectedOption = (id) => {
    const { product, selectedOptions } = state;
    if (selectedOptions.find((selectedOption) => selectedOption.productOption.id == id)) return;

    const productOption = product.productOptions.find((productOption) => productOption.id == id);
    const selectedOption = { productOption, count: 1 };

    selectedOptions.push(selectedOption);

    setState({ selectedOptions });
  };

  const fetchProduct = async () => {
    const id = +window.location.pathname.split("/").slice(-1)[0];

    try {
      setState({ isLoading: true });

      const product = await getProduct(id);
      setState({ product });
      const productDetails = storage.get(storage.keys.productDetails);
      if (productDetails) {
        productDetails[id] = product;
        storage.set(storage.keys.productDetails, productDetails);
      } else {
        storage.set(storage.keys.productDetails, { [id]: product });
      }

      setState({ isLoading: false });
    } catch (e) {
      console.log(e);
      setState({ isLoading: false });
      alert(e.message);
    }
  };

  fetchProduct();
}
