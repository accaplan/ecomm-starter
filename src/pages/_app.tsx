import { CartProvider, Client } from "@tylermcrobert/shopify-react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "../TEMP_STYLE.css";

export const client = Client.buildClient({
  storefrontAccessToken: "7b6d57462efa8482c96361a9e9f9045d",
  domain: "202003-tm.myshopify.com",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <CartProvider client={client}>
        <Component {...pageProps} />
      </CartProvider>
    </>
  );
}

export default MyApp;
