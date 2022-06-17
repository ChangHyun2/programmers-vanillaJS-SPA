import ProductList from "../components/ProductList.js";

export default function ProductListPage($p) {
  const $ = document.createElement("div");
  $.className = "ProductListPage";
  $p.append($);

  this.render = () => {
    $.innerHTML = "<h1>상품목록</h1>";
    const productList = new ProductList($);
    productList.render();
  };
}
