import { createContext, useContext } from "react";
import { Product, ProductProvider } from "@tylermcrobert/shopify-react";
import { Layout } from "components";
import ProductHead from "components/ProductHead/ProductHead";
import { fetchProduct } from "lib/sanity";
import { NextPage } from "next";
import { client } from "pages/_app";
import React from "react";
import { ProductSchema } from "types";
import Error from "next/error";

const SanityProductContext = createContext<ProductSchema>(
  (null as unknown) as ProductSchema
);

export const useSanityProduct = () => useContext(SanityProductContext);

const PDP: NextPage<{ product: Product; cmsProduct: ProductSchema }> = ({
  product,
  cmsProduct,
}) => {
  if (!product || !cmsProduct) {
    if (!product) console.error("Cannot find Product from Shopify Buy SDK.");
    if (!cmsProduct) console.error("Cannot find Product from Sanity.");
    return <Error statusCode={404} />;
  }
  return (
    <Layout>
      <SanityProductContext.Provider value={cmsProduct}>
        <ProductProvider product={product}>
          <ProductHead />
        </ProductProvider>
      </SanityProductContext.Provider>
    </Layout>
  );
};

PDP.getInitialProps = async (ctx) => {
  const product = await client.product.fetchByHandle(
    ctx.query.handle?.toString()
  );

  const cmsProduct = await fetchProduct(
    ctx.query.handle?.toString() || "",
    false
  );
  return { product, cmsProduct };
};

export default PDP;
