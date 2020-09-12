import { useCart } from "@tylermcrobert/shopify-react";
import React from "react";

const Cart = () => {
  const cart = useCart();
  return (
    <div className="cart">
      Im a cart is cart open: {cart.isCartOpen.toString()}
    </div>
  );
};

export default Cart;
