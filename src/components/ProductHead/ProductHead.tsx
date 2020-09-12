import {
  AddToCartButton,
  ProductOptions,
  QtySelector,
  useProduct,
} from "@tylermcrobert/shopify-react";
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
        <QtySelector
          onUpdate={(num) => setQuantity(num)}
          value={productState.quantity}
        />
        <AddToCartButton />
        {product.descriptionHtml && (
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        )}
      </div>
    </S.ProductHead>
  );
};
export default ProductHead;