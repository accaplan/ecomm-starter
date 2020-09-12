import {
  CheckoutLink,
  CloseCartButton,
  useCart,
} from "@tylermcrobert/shopify-react";
import React from "react";
import S from "./Cart.Styled";

const Cart = () => {
  const { isCartOpen } = useCart();

  return (
    <S.Cart open={isCartOpen}>
      <div>Cart</div>
      <CloseCartButton />
      <CheckoutLink />
    </S.Cart>
  );
};

export default Cart;
