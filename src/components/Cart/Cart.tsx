import {
  CheckoutLink,
  CloseCartButton,
  useCart,
} from "@tylermcrobert/shopify-react";
import React from "react";

const Cart = () => {
  const { isCartOpen } = useCart();

  return (
    <div
      className={["cart", isCartOpen && "-visible"]
        .map((item) => item)
        .join(" ")}
    >
      <div>Cart</div>

      <CloseCartButton />
      <CheckoutLink />
    </div>
  );
};

export default Cart;
