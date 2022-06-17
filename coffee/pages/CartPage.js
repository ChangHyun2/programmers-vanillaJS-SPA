import router from "../router.js";
import { storage } from "../utils/data.js";
import { withComma } from "../utils/string.js";
import { by } from "../utils/filter.js";

export default function CartPage($p) {
  const cart = storage.get(storage.keys.cart);
  const productDetails = storage.get(storage.keys.productDetails);

  if (!cart || !cart.length) {
    alert("장바구니가 비어 있습니다");
    router.link("/index.html");
    return;
  }

  const handleSubmit = (e) => {
    if (e.target.closest("button")) {
      alert("주문되었습니다");

      storage.remove(storage.keys.cart);

      router.link("/index.html");
    }
  };

  const $ = document.createElement("div");
  $.className = "CartPage";
  $.addEventListener("click", handleSubmit);
  $p.append($);

  const totalPrice = (cart) =>
    cart.reduce((acc, { productId, optionId, quantity }) => {
      const productDetail = productDetails[productId];
      const productOption = productDetail.productOptions.find(by({ id: optionId }));

      return acc + (productDetail.price + productOption.price) * quantity;
    }, 0);

  this.render = () => {
    $.innerHTML = `<h1>장바구니</h1>
          <div class="Cart">
            <ul>
              ${cart.map(({ productId, optionId, quantity }) => {
                const productDetail = productDetails[productId];
                console.log({ productDetail, optionId });
                const productOption = productDetail.productOptions.find(by({ id: optionId }));
                const { name, price } = productOption;

                return `
                  <li class="Cart__item">
                      <img src="${productDetail.imageUrl}">
                      <div class="Cart__itemDesription">
                      <div>${productDetail.name} ${name} ${withComma(price + productDetail.price)}원 ${quantity}개</div>
                      <div>${withComma(quantity * (price + productDetail.price))}원</div>
                      </div>
                  </li>
                `;
              })}
            </ul>
            <div class="Cart__totalPrice">
              총 상품가격 ${totalPrice(cart)}원
            </div>
            <button class="OrderButton">주문하기</button>
          </div>`;
  };
}
