import { withComma } from "../utils/string.js";

export default function ProductOptions($, product, addSelectedOption) {
  const handleSelectProductOption = (e) => {
    const selectedId = +e.target.options[e.target.selectedIndex].value;
    if (selectedId === undefined) return;

    addSelectedOption(selectedId);
  };

  $.addEventListener("change", handleSelectProductOption);

  const productOptionLabel = (product, productOption) => {
    const { name: productName } = product;
    const { name, price, stock } = productOption;

    return stock === 0
      ? `(품절) ${productName} ${name}`
      : price === 0
      ? `${productName} ${name}`
      : `${productName} ${name} (+${withComma(price)}원)`;
  };

  this.render = () => {
    const { productOptions } = product;

    $.innerHTML = `
          <option>선택하세요.</option>
          ${productOptions
            .map((productOption) => {
              const { id, stock } = productOption;

              return `
                    <option value=${id} ${stock === 0 ? "disabled" : ""}>
                        ${productOptionLabel(product, productOption)}
                    </option>`;
            })
            .join("")}
      `;
  };
}
