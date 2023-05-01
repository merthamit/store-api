export const discount = (price) => {
  const newPrice = (price + Math.random() * 100).toFixed(2);
  const discountAmount = newPrice - price;
  const percent = `${((100 * discountAmount) / newPrice).toFixed(0)}%`;
  return { percent, newPrice };
};
