import {
  CheckoutLink,
  CloseCartButton,
  LineItem,
  useCart,
} from "@tylermcrobert/shopify-react";
import React from "react";
import S from "./Cart.Styled";

const Cart = () => {
  const { isCartOpen, shopifyCheckout, closeCart } = useCart();

  return (
    <>
      <S.Shadow open={isCartOpen} onClick={closeCart} />
      <S.Cart open={isCartOpen}>
        <div>Cart</div>
        <CloseCartButton />
        {shopifyCheckout?.lineItems.map((lineItem) => (
          <S.LineItem data={lineItem} key={lineItem.id}>
            <LineItem.Image />
            <div>
              <LineItem.Title />
              <LineItem.Variant />
              <LineItem.Price />
              <LineItem.Remove />
              <LineItem.Quantity />
            </div>
          </S.LineItem>
        ))}
        <CheckoutLink />
      </S.Cart>
    </>
  );
};

export default Cart;
