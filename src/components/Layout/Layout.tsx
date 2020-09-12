import React from "react";
import { Cart } from "../";

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Cart />
      {children}
    </>
  );
};

export default Layout;
