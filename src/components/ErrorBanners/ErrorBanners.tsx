import { useCart } from "@tylermcrobert/shopify-react";
import React from "react";

const ErrorBanners = () => {
  const cart = useCart();

  return (
    <>
      {cart.errorAdding && <div>There was an error adding to your cart</div>}
      {cart.cartFetchError && <div>There was an error fetching your</div>}
    </>
  );
};

export default ErrorBanners;
