import { Product } from "@tylermcrobert/shopify-react";
import { Layout, ProductGrid } from "../components";
import { client } from "./_app";
import { client as sanityClient, urlFor } from "lib/sanity";
import { ProductSchema } from "types";
import Link from "next/link";

const Index: React.FC<{
  products: Product[];
  sanityProducts: ProductSchema[];
}> = ({ sanityProducts }) => {
  return (
    <Layout>
      <ProductGrid>
        {sanityProducts.map((product) => (
          <Link
            as={`/products/${product.slug.current}`}
            href="/products/[handle]"
            key={product._id}
          >
            <a>
              <div>
                <img src={urlFor(product.image).url() || ""} />
                <h2>{product.title}</h2>
              </div>
            </a>
          </Link>
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
