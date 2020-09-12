import { ProductOptions, useProduct } from "@tylermcrobert/shopify-react";
import { QtySelect } from "components";
import React from "react";
import S from "./ProductHead.Styled";

const ProductHead = () => {
  const { product, productState, setQuantity } = useProduct();

  return (
    <S.ProductHead>
      <div>
        <img src={productState.currentVariant.image?.src} alt={product.title} />
      </div>
      <div>
        <h1>{product.title}</h1>
        <ProductOptions />
        <QtySelect
          onUpdate={(num) => setQuantity(num)}
          value={productState.quantity}
        />
        <S.AddToCart />
        {product.descriptionHtml && (
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        )}
      </div>
    </S.ProductHead>
  );
};
export default ProductHead;
