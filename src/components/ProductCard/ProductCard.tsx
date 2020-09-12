import { AddToCartButton, useProduct } from "@tylermcrobert/shopify-react";
import React from "react";

const ProductCard = () => {
  const { product } = useProduct();
  console.log(product.vendor);

  return (
    <div>
      {product.title}
      <AddToCartButton />
    </div>
  );
};

export default ProductCard;
