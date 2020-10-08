import { useCart } from "@tylermcrobert/shopify-react";
import Link from "next/link";
import React from "react";
import S from "./Nav.Styled";

const Nav = () => {
  const { openCart } = useCart();

  return (
    <S.Nav>
      <Link href="/">Home</Link>
      <div onClick={openCart}>cart</div>
    </S.Nav>
  );
};

export default Nav;
