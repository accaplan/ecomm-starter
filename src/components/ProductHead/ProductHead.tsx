import { ProductSchemaOptionCategoryValue } from "sanity-shopify-toolkit";
import { QtySelect } from "components";
import { urlFor } from "lib/sanity";
import { useProduct } from "providers";
import React from "react";
import S from "./ProductHead.Styled";

const ProductHead = () => {
  const { cmsProduct, productState, setQuantity } = useProduct();

  // console.log(
  //   cmsProduct.options.variants.map((variant) => variant.isAvailable)
  // );

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
        return <Option values={values} key={name} name={name} />;
      })}
    </S.ProductOptions>
  );
};

const Option: React.FC<{
  values: ProductSchemaOptionCategoryValue[];
  name: string;
}> = () =>
  // { values, name }
  {
    return <div>option</div>;
    // const { currentVariant, setOptions } = useProduct();

    // const isSelected = (optionName: string, optionValue: string) =>
    //   productState.currentVariant.selectedOptions.filter(
    //     (option) => option.name === optionName
    //   )[0].value === optionValue;

    // return (
    //   <React.Fragment>
    //     {name !== "Title" && <div>{name}</div>}
    //     <ul>
    //       {values.map((val) => {
    //         const value = val.title;
    //         const selected = isSelected(name, value);
    //         return (
    //           value !== "Default Title" && (
    //             <VariantSelect
    //               key={value}
    //               onChange={() => setOptions({ [name]: value })}
    //               value={value}
    //               selected={selected}
    //               name={name}
    //             />
    //           )
    //         );
    //       })}
    //     </ul>
    //   </React.Fragment>
    // );
  };

// /**
//  * VariantSelect item
//  * @param Props
//  */

// const VariantSelect: React.FC<
//   React.HTMLAttributes<HTMLLIElement> & {
//     /** Text value for label */
//     value: string;
//     /** Function that is called on happens on select */
//     onChange: () => any;
//     /** Is option active */
//     selected: boolean;
//     /** Category name */
//     name: string;
//   }
// > = ({ onChange, value, selected, name, ...props }) => {
//   return (
//     <S.InputWrap {...props} selected={selected} onClick={onChange}>
//       <input
//         type="radio"
//         name={name}
//         value={value}
//         id={value}
//         checked={selected}
//         onChange={onChange}
//       />
//       <label htmlFor={value}>{value}</label>
//     </S.InputWrap>
//   );
// };
export default ProductHead;
