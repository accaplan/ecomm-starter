import { AddToCartButton, useProduct } from "@tylermcrobert/shopify-react";
import React from "react";
import S from "./ProductCard.Styled";
import Link from "next/link";

const ProductCard = () => {
  const { product } = useProduct();

  const image = product.images && product.images[0]?.src;

  return (
    <Link as={`/products/${product.handle}`} href="products/[handle]">
      <S.ProductCard>
        {product.title}
        {image && <img src={image} />}
        <AddToCartButton />
      </S.ProductCard>
    </Link>
  );
};

export default ProductCard;
