import { CartProvider, Client } from "@tylermcrobert/shopify-react";

export const client = Client.buildClient({
  domain: "pistils-nursery.myshopify.com",
  storefrontAccessToken: "ffb71a0587c96b47c38e04c33d5b5dd2",
});

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CartProvider client={client}>
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}

export default MyApp;
