import { useProduct, parseProductVariant } from "@tylermcrobert/shopify-react";
import { QtySelect } from "components";
import { urlFor } from "lib/sanity";
import { useSanityProduct } from "providers";
import React from "react";
import { SanityProductOptionValue } from "types";
import S from "./ProductHead.Styled";

const ProductHead = () => {
  const {
    currentVariant,
    cmsProduct,
    productState,
    setQuantity,
  } = useSanityProduct();

  return (
    <S.ProductHead>
      <div>
        <img
          src={urlFor(currentVariant.image).url() || ""}
          alt={cmsProduct.title}
        />
      </div>
      <div>
        <h1>{cmsProduct.title}</h1>
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
  const { cmsProduct } = useSanityProduct();

  const hasOptions =
    cmsProduct.options.filter((item) => item.values.length > 1).length > 0;

  if (!hasOptions) return null;

  return (
    <S.ProductOptions>
      {cmsProduct.options.map(({ name, values }) => {
        return <Option values={values} key={name} name={name} />;
      })}
    </S.ProductOptions>
  );
};

const Option: React.FC<{
  values: SanityProductOptionValue[];
  name: string;
}> = ({ values, name }) => {
  const { productState, setOptions } = useSanityProduct();

  const isSelected = (optionName: string, optionValue: string) =>
    productState.currentVariant.selectedOptions.filter(
      (option) => option.name === optionName
    )[0].value === optionValue;

  return (
    <React.Fragment>
      {name !== "Title" && <div>{name}</div>}
      <ul>
        {values.map((val) => {
          const value = val.title;
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
