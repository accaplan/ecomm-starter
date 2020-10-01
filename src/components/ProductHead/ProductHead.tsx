import { useProduct } from "@tylermcrobert/shopify-react";
import { QtySelect } from "components";
import React from "react";
import S from "./ProductHead.Styled";

const ProductHead = () => {
  const { product, productState, setQuantity } = useProduct();

  return (
    <S.ProductHead>
      <div>
        {product.images?.map((img) => (
          <img src={img?.src} alt="" key={img?.src} />
        ))}
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
      </div>
    </S.ProductHead>
  );
};

/**
 * Product option variant selector
 */
const ProductOptions = () => {
  const { product } = useProduct();

  const hasOptions =
    product.options.filter((item) => item.values.length > 1).length > 0;

  if (!hasOptions) return null;

  return (
    <S.ProductOptions>
      {product.options.map(({ name, values }) => {
        return (
          <Option
            values={values.map((val) => val.value)}
            key={name}
            name={name}
          />
        );
      })}
    </S.ProductOptions>
  );
};

const Option: React.FC<{
  values: string[];
  name: string;
}> = ({ values, name }) => {
  const { productState, setOptions } = useProduct();

  const isSelected = (optionName: string, optionValue: string) =>
    productState.currentVariant.selectedOptions.filter(
      (option) => option.name === optionName
    )[0].value === optionValue;

  return (
    <React.Fragment>
      {name !== "Title" && <div>{name}</div>}
      <ul>
        {values.map((value) => {
          const selected = isSelected(name, value);
          return (
            value !== "Default Title" && (
              <VariantSelect
                key={value}
                onChange={() => setOptions({ [name]: value })}
                value={value}
                selected={selected}
                name={name}
              />
            )
          );
        })}
      </ul>
    </React.Fragment>
  );
};

/**
 * VariantSelect item
 * @param Props
 */

const VariantSelect: React.FC<
  React.HTMLAttributes<HTMLLIElement> & {
    /** Text value for label */
    value: string;
    /** Function that is called on happens on select */
    onChange: () => any;
    /** Is option active */
    selected: boolean;
    /** Category name */
    name: string;
  }
> = ({ onChange, value, selected, name, ...props }) => {
  return (
    <S.InputWrap {...props} selected={selected} onClick={onChange}>
      <input
        type="radio"
        name={name}
        value={value}
        id={value}
        checked={selected}
        onChange={onChange}
      />
      <label htmlFor={value}>{value}</label>
    </S.InputWrap>
  );
};
export default ProductHead;
