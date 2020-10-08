import { ProductSchemaOptionCategoryValue } from "sanity-shopify-toolkit";
import { QtySelect } from "components";
import { urlFor } from "lib/sanity";
import { useProduct } from "providers";
import React from "react";
import S from "./ProductHead.Styled";

const ProductHead = () => {
  const { cmsProduct, productState, setQuantity } = useProduct();

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
        {/* <S.AddToCart unavailable={!productState.currentVariant.isAvailable} /> */}
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

const Option: React.FC<{
  variants: ProductSchemaOptionCategoryValue[];
  name: string;
}> = ({ variants, name }) => {
  const { productState, setOptions } = useProduct();

  /** TODO: Fix this to be more accurate. currently if there are two 'blue' variants, they'll both show active */
  const isSelected = (optionValue: string) =>
    productState.currentVariant.title.split(" / ").includes(optionValue);

  return (
    <React.Fragment>
      {name !== "Title" && <div>{name}</div>}
      <ul>
        {variants.map((variant) => {
          const value = variant.title;
          const selected = isSelected(value);
          return (
            value !== "Default Title" && (
              <VariantSelect
                key={value}
                onChange={() =>
                  setOptions({
                    categoryName: name,
                    variantName: variant.title,
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
