export const withComma = (price, unit = 3) => {
  const str = String(price);

  return str.length < unit + 1 ? str : withComma(str.slice(0, str.length - 3)) + "," + str.slice(str.length - 3);
};
