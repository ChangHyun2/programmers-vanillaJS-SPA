export const by = (finder) => (obj) => {
  for (const key of Object.keys(finder)) {
    if (obj[key] !== finder[key]) {
      return false;
    }
  }

  return true;
};
