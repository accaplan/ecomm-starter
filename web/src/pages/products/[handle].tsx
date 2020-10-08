import { Layout } from "components";
import ProductHead from "components/ProductHead/ProductHead";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { client } from "lib/sanity";
import React from "react";
import { ProductSchema } from "types";
import Error from "next/error";
import { ProductProvider } from "providers";

const PDP: NextPage<{ cmsProduct: ProductSchema }> = ({ cmsProduct }) => {
  if (!cmsProduct) {
    if (!cmsProduct) console.error("Cannot find Product from Sanity.");
    return <Error statusCode={404} />;
  }
  return (
    <Layout>
      <ProductProvider cmsProduct={cmsProduct}>
        <ProductHead />
      </ProductProvider>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const cmsProduct = await client.fetch(
    `*[_type == 'product' && slug.current == '${params?.handle}'][0]`
  );

  return {
    props: { cmsProduct: cmsProduct || null },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await client.fetch(`*[_type == 'product']{ slug }`);
  const uids = products.map((product: any) => product.slug.current);

  return {
    paths: [
      ...uids.map((uid: string) => ({
        params: { handle: uid },
      })),
    ],
    fallback: true,
  };
};

export default PDP;
