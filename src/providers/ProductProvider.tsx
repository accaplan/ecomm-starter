import {
  parseProductVariant,
  Product,
  ProductCtxType,
  ProductProvider as PackageProductProvider,
  useProduct as usePackageProduct,
} from "@tylermcrobert/shopify-react";
import React, { createContext, useContext } from "react";
import { ProductSchema, SanityProductVariant } from "types";

const SanityProductContext = createContext<
  {
    cmsProduct: ProductSchema;
    currentVariant: SanityProductVariant;
  } & ProductCtxType
>({
  cmsProduct: (null as unknown) as ProductSchema,
  currentVariant: (null as unknown) as SanityProductVariant,
  ...({} as ProductCtxType),
});

export const useSanityProduct = () => useContext(SanityProductContext);

export const ProductProvider: React.FC<{
  product: Product;
  cmsProduct: ProductSchema;
}> = ({ children, product, cmsProduct }) => {
  return (
    <PackageProductProvider product={product}>
      <SanityHandler cmsProduct={cmsProduct}>{children}</SanityHandler>
    </PackageProductProvider>
  );
};

const SanityHandler: React.FC<{ cmsProduct: ProductSchema }> = ({
  children,
  cmsProduct,
}) => {
  const productCtx = usePackageProduct();
  /**
   * Current CMS product variant
   */
  const currentVariant = cmsProduct.options.variants.find(
    (variant) =>
      variant.id ===
      parseProductVariant(productCtx.productState.currentVariant.id).toString()
  ) as SanityProductVariant;

  return (
    <SanityProductContext.Provider
      value={{ cmsProduct, currentVariant, ...productCtx }}
    >
      {children}
    </SanityProductContext.Provider>
  );
};
