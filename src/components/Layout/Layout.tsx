import React from "react";
import { Cart, ErrorBanners, Nav } from "components";
import GlobalStyle from "style/GlobalStyle";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <ErrorBanners />
      <Nav />
      <Cart />
      {children}
    </>
  );
};

export default Layout;
