import { Product, ProductProvider } from "@tylermcrobert/shopify-react";
import { Layout } from "components";
import ProductHead from "components/ProductHead/ProductHead";
import { NextPage } from "next";
import { client } from "pages/_app";
import React from "react";

const PDP: NextPage<{ product: Product }> = ({ product }) => {
  return (
    <Layout>
      <ProductProvider product={product}>
        <ProductHead />
      </ProductProvider>
    </Layout>
  );
};

PDP.getInitialProps = async (ctx) => {
  const product: Product = JSON.parse(
    JSON.stringify(
      await client.product.fetchByHandle(ctx.query.handle?.toString())
    )
  );
  return { product };
};

export default PDP;
