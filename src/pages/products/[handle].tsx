import { Product } from "@tylermcrobert/shopify-react";
import { Layout } from "components";
import ProductHead from "components/ProductHead/ProductHead";
import { fetchProduct } from "lib/sanity";
import { NextPage } from "next";
import { client } from "pages/_app";
import React from "react";
import { ProductSchema } from "types";
import Error from "next/error";
import { ProductProvider } from "providers";

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
      <ProductProvider cmsProduct={cmsProduct} product={product}>
        <ProductHead />
      </ProductProvider>
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
