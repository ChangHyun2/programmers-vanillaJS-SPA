import router from "../router.js";
import { storage } from "../utils/data.js";
import { withComma } from "../utils/string.js";

export default function SelectedOptions($, product, selectedOptions, updateSelectedOption) {
  const handleChangeOption = (e) => {
    const id = +e.target.dataset.id;
    const count = +e.target.value;
    updateSelectedOption(+id, count);
  };

  const handleSubmit = (e) => {
    if (e.target.closest("button")) {
      if (selectedOptions.length === 0) {
        alert("상품을 선택해주세요.");
        return;
      }

      const cart = storage.get(storage.keys.cart) || [];

      storage.set(storage.keys.cart, [
        ...cart,
        ...selectedOptions.map(({ productOption, count }) => ({
          productId: product.id,
          optionId: productOption.id,
          quantity: count,
        })),
      ]);

      router.link("/cart");
    }
  };

  $.addEventListener("change", handleChangeOption);
  $.addEventListener("click", handleSubmit);

  const totalPrice = (product, selectedOptions) =>
    withComma(
      selectedOptions.reduce((acc, selected) => {
        const { count, productOption } = selected;

        const selectedPrice = count * (productOption.price + product.price);
        return acc + selectedPrice;
      }, 0)
    );

  this.render = () => {
    $.innerHTML = `
        <h3>선택된 상품</h3>
        <ul>
          ${selectedOptions
            .map(
              ({ productOption: { id, name, price, stock }, count }) => `
              <li>
                  ${product.name} ${name} ${withComma(product.price + price)}
                  <div><input data-id=${id} type="number" value="${count}" min="${0}" max="${stock}"/>개</div>
              </li>
            `
            )
            .join("")}
        </ul>
        <div class="ProductDetail__totalPrice">${totalPrice(product, selectedOptions)}원</div>
        <button class="OrderButton">주문하기</button>
      `;
  };
}
