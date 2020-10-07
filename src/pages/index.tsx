import { Product } from "@tylermcrobert/shopify-react";
import { Layout, ProductGrid } from "../components";
import { client } from "./_app";
import { client as sanityClient } from "lib/sanity";
import { ProductSchema } from "types";

const Index: React.FC<{
  products: Product[];
  sanityProducts: ProductSchema[];
}> = ({ sanityProducts }) => {
  return (
    <Layout>
      <ProductGrid>
        {sanityProducts.map((product) => (
          <div key={product._id}>
            <pre>{JSON.stringify(product, null, 2)}</pre>
          </div>
        ))}
      </ProductGrid>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const products = JSON.parse(JSON.stringify(await client.product.fetchAll()));
  const sanityProducts = await sanityClient.fetch(`*[_type == 'product']`);

  return { props: { products, sanityProducts } };
};

export default Index;
