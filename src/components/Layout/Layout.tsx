import React from "react";
import { Cart, ErrorBanners } from "components";
import GlobalStyle from "style/GlobalStyle";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ErrorBanners />
      <Cart />
      {children}
    </>
  );
};

export default Layout;
