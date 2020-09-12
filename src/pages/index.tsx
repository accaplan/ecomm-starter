import {
  Product,
  ProductProvider,
  useCart,
} from "@tylermcrobert/shopify-react";
import ProductCard from "components/ProductCard/ProductCard";
import { Layout, ProductGrid } from "../components";
import { client } from "./_app";

const Index: React.FC<{ products: Product[] }> = ({ products }) => {
  const { openCart } = useCart();

  return (
    <Layout>
      <div onClick={openCart}>cart</div>
      <ProductGrid>
        {products.map((product) => (
          <ProductProvider product={product} key={product.id}>
            <ProductCard />
          </ProductProvider>
        ))}
      </ProductGrid>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const products = JSON.parse(JSON.stringify(await client.product.fetchAll()));
  return { props: { products } };
};

export default Index;
