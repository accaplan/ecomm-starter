import { useProduct } from "@tylermcrobert/shopify-react";
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
        <div>${productState.currentVariant.price}</div>
        <ProductOptions />
        <QtySelect
          onUpdate={(num) => setQuantity(num)}
          value={productState.quantity}
        />
        <S.AddToCart unavailable={!productState.currentVariant.available} />
        {product.descriptionHtml && (
          <div dangerouslySetInnerHTML={{ __html: product.descriptionHtml }} />
        )}
      </div>
    </S.ProductHead>
  );
};

const ProductOptions = () => {
  const { product, productState, setOptions } = useProduct();

  return (
    <div>
      {product.options.map(({ name, values }) => {
        const isSelected = (optionName: string, optionValue: string) =>
          productState.currentVariant.selectedOptions.filter(
            (option) => option.name === optionName
          )[0].value === optionValue;

        return (
          <div key={name}>
            {name !== "Title" && <div>{name}</div>}
            {values.map(({ value }) => {
              const selected = isSelected(name, value);
              return (
                value !== "Default Title" && (
                  <VariantSelect
                    key={value}
                    onChange={() => setOptions({ [name]: value })}
                    value={value}
                    selected={selected}
                  />
                )
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

/**
 * VariantSelect item
 * @param Props
 */

const VariantSelect: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    /** Text value for label */
    value: string;
    /** Function that is called on happens on select */
    onChange: () => any;
    /** Is option active */
    selected: boolean;
  }
> = ({ onChange, value, selected, ...props }) => {
  return (
    <div {...props}>
      <input
        type="radio"
        name={name}
        value={value}
        id={value}
        checked={selected}
        onChange={onChange}
      />
      <label htmlFor={value}>{value}</label>
    </div>
  );
};
export default ProductHead;
