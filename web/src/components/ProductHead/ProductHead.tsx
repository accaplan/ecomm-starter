import { ProductSchemaOptionCategoryValue } from "sanity-shopify-toolkit";
import { QtySelect } from "components";
import { urlFor } from "lib/sanity";
import { useProduct } from "providers";
import React from "react";
import S from "./ProductHead.Styled";

const ProductHead = () => {
  const { cmsProduct, productState, setQuantity, addToCart } = useProduct();

  return (
    <S.ProductHead>
      <div>
        <img
          src={urlFor(cmsProduct.image).url() || ""}
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
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </S.ProductHead>
  );
};

/**
 * Product option variant selector
 */
const ProductOptions = () => {
  const { cmsProduct } = useProduct();

  const hasOptions =
    cmsProduct.options.categories.filter((item) => item.values.length > 1)
      .length > 0;

  if (!hasOptions) return null;

  return (
    <S.ProductOptions>
      {cmsProduct.options.categories.map(({ name, values }) => {
        return <Option variants={values} key={name} name={name} />;
      })}
    </S.ProductOptions>
  );
};

/** TODO:Figure out why shit in here is firing 2x or 3x on click */
const Option: React.FC<{
  variants: ProductSchemaOptionCategoryValue[];
  name: string;
}> = ({ variants, name }) => {
  const { productState, setOptions } = useProduct();

  const isSelected = (categoryName: string, optionValue: string) => {
    return (
      productState.currentVariant.selectedOptions.findIndex(
        (i) => i.categoryName === categoryName && i.value == optionValue
      ) !== -1
    );
  };

  return (
    <React.Fragment>
      {name !== "Title" && <div>{name}</div>}
      <ul>
        {variants.map((variant) => {
          const value = variant.title;
          const selected = isSelected(name, value);

          return (
            value !== "Default Title" && (
              <VariantSelect
                key={value}
                onChange={() =>
                  setOptions({
                    categoryName: name,
                    value: variant.title,
                  })
                }
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
    <S.InputWrap {...props} selected={selected}>
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
