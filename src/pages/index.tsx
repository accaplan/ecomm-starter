import {
  Product,
  ProductProvider,
  useCart,
} from "@tylermcrobert/shopify-react";
import { Layout, ProductCard } from "../components";
import { client } from "./_app";

const Index: React.FC<{ products: Product[] }> = ({ products }) => {
  const { openCart, ...props } = useCart();

  return (
    <Layout>
      <div onClick={openCart}>cart</div>
      {products.map((product) => (
        <ProductProvider product={product} key={product.id}>
          <ProductCard />
        </ProductProvider>
      ))}
    </Layout>
  );
};

export const getStaticProps = async () => {
  const products = JSON.parse(JSON.stringify(await client.product.fetchAll()));
  return { props: { products } };
};

export default Index;
