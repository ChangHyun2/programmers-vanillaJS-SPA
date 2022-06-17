import ProductListPage from "./pages/ProductListPage.js";
import ProductDetailPage from "./pages/ProductDetailPage.js";
import CartPage from "./pages/CartPage.js";
import router from "./router.js";

export default function ($p) {
  const $ = document.createElement("main");
  $.className = "App";
  $p.append($);

  const pages = new Map();
  pages.set(/^\/coffee\/index.html$/, ProductListPage);
  pages.set(/^\/coffee\/products\/\d+$/, ProductDetailPage);
  pages.set(/^\/coffee\/cart$/, CartPage);

  router.init($, pages);
}
