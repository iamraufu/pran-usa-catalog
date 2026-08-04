import productImages from "../data/productImages";
import placeholder from "/assets/placeholder.jpg";

const imageMap = {};

Object.values(productImages).forEach((group) => {
  group.products.forEach((code) => {
    imageMap[code] = group.image;
  });
});

export const getProductImage = (itemCode) => {
  return imageMap[String(itemCode)] || placeholder;
};
