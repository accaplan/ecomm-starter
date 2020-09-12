import { useCart } from "@tylermcrobert/shopify-react";
import { Layout } from "../components";

const Index = () => {
  const { openCart } = useCart();

  return (
    <Layout>
      <div onClick={openCart}>cart</div>
      Content
    </Layout>
  );
};

export default Index;
