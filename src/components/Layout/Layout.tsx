import React from "react";
import { Cart, ErrorBanners } from "components";
import GlobalStyle from "style/GlobalStyle";
import { useCart } from "@tylermcrobert/shopify-react";

const Layout: React.FC = ({ children }) => {
  const { openCart } = useCart();

  return (
    <>
      <GlobalStyle />
      <ErrorBanners />
      <div onClick={openCart}>cart</div>
      <Cart />
      {children}
    </>
  );
};

export default Layout;
