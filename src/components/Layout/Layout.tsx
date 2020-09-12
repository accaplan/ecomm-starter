import React from "react";
import { Cart, ErrorBanners } from "components";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <ErrorBanners />
      <Cart />
      {children}
    </>
  );
};

export default Layout;
