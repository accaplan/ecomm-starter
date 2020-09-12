import {
  CheckoutLink,
  CloseCartButton,
  LineItem,
  useCart,
} from "@tylermcrobert/shopify-react";
import React from "react";
import S from "./Cart.Styled";

const Cart = () => {
  const { isCartOpen, shopifyCheckout } = useCart();

  return (
    <S.Cart open={isCartOpen}>
      <div>Cart</div>
      <CloseCartButton />
      <CheckoutLink />
      {shopifyCheckout?.lineItems.map((lineItem) => (
        <S.LineItem data={lineItem}>
          <LineItem.Image />
          <div>
            <LineItem.Title />
            <LineItem.Variant />
            <LineItem.Price />
            <LineItem.Remove />
          </div>
        </S.LineItem>
      ))}
    </S.Cart>
  );
};

export default Cart;
