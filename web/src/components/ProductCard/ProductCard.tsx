import { AddToCartButton, useProduct } from "@tylermcrobert/shopify-react";
import React from "react";
import S from "./ProductCard.Styled";
import Link from "next/link";

const ProductCard = () => {
  const { product } = useProduct();

  const image = product.images && product.images[0]?.src;

  return (
    <S.ProductCard>
      <Link as={`/products/${product.handle}`} href="products/[handle]">
        <a>
          {product.title}
          {image && <img src={image} />}
        </a>
      </Link>
      <AddToCartButton />
    </S.ProductCard>
  );
};

export default ProductCard;
