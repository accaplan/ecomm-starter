import { CartProvider, Client } from "@tylermcrobert/shopify-react";
import { AppProps } from "next/dist/next-server/lib/router/router";
import "../TEMP_STYLE.css";

const stores = {
  airsign: {
    domain: "airsign-co.myshopify.com",
    storefrontAccessToken: "84aaa88f572f6ffabb3c83b0bfbc7365",
  },
  highTide: {
    domain: "hightidenyc.myshopify.com",
    storefrontAccessToken: "9395d0399ded34d4a90d8e45db500a76",
  },
  pistils: {
    domain: "pistils-nursery.myshopify.com",
    storefrontAccessToken: "ffb71a0587c96b47c38e04c33d5b5dd2",
  },
  testStore: {
    storefrontAccessToken: "7b6d57462efa8482c96361a9e9f9045d",
    domain: "202003-tm.myshopify.com",
  },
};

export const client = Client.buildClient(stores.pistils);

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
