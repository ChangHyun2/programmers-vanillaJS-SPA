const PREFIX = "coffee-";

const LOCALSTORAGE_KEYS = Object.freeze({
  products: "products",
  productDetails: "productDetails",
  cart: "cart",
});

const get = (key) => JSON.parse(window.localStorage.getItem(`${PREFIX}-${key}`));
const set = (key, value) => window.localStorage.setItem(`${PREFIX}-${key}`, JSON.stringify(value));
const remove = (key) => window.localStorage.removeItem(`${PREFIX}-${key}`);

export const storage = {
  get,
  set,
  remove,
  keys: LOCALSTORAGE_KEYS,
};
