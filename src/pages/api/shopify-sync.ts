import { NextApiRequest, NextApiResponse } from "next";
import sanityClient from "@sanity/client";
import { ProductSchema, SanityProductOption, ShopifyWebhookRes } from "types";
import "node-fetch";
import { clientOptions } from "lib/sanity";
import { Product } from "@tylermcrobert/shopify-react";

/**
 * TODO: Add "Delete" functionality
 * TODO: Add verification code from Shopify
 * TODO: Add imagery for product from Shopify
 */

const options = {
  ...clientOptions,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
};

const sendToSlack = async (text: string) =>
  fetch(process.env.SLACK_WEBHOOK_URL as string, {
    method: "POST",
    body: JSON.stringify({
      text: `\`${new Date().toUTCString()} — ${text}\``,
    }),
  }).then((res) => {
    if (!res.toString) {
      console.error(res);
    }
  });

const client = sanityClient(options);

/**
 * Taken from iamkenvingreen's github gist
 * https://gist.github.com/iamkevingreen/3872f5acbaf5b100a8ebc02e4d95a03e
 */

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const setError = (code: number, message: string, error?: any) => {
    const err = `ERROR ${code}: ${message}`;
    console.error(err);
    sendToSlack(err);
    if (error) {
      console.error(error);
    }
    res.status(code).json({
      error: true,
      statusCode: error?.statusCode || code,
      message,
    });
    return null;
  };

  try {
    /**
     * Validate
     */

    if (req.method !== "POST") setError(400, "Must be POST method");
    if (!req.body) setError(400, "Must include body");

    /**
     * Extract data from body payload
     */

    const data = req.body as ShopifyWebhookRes;

    const incomingOptions: SanityProductOption[] = data.options.map((item) => ({
      _key: item.id.toString(),
      _type: "option",
      name: item.name,
      values: item.values.map((value) => ({
        _key: value,
        _type: "value",
        title: value,
      })),
    }));

    const incomingVariants = data.variants.map((variant) => ({
      id: variant.id.toString(),
      title: variant.title,
      _key: variant.id.toString(),
    }));

    /**
     * Fetch existing product & make sure it isn't a draft
     */

    const existingSanityProducts: ProductSchema[] | null =
      (await client.fetch(`*[_type == "product" && slug.current == $slug]`, {
        slug: data.handle.toString(),
      })) || null;

    if (
      (existingSanityProducts && existingSanityProducts.length > 1) ||
      false
    ) {
      setError(
        503,
        `Sanity document ${data.title} is a draft. Publish the document to update with sync.`
      );
      return null;
    }

    const existingSanityProduct =
      (existingSanityProducts && existingSanityProducts[0]?.options) || null;

    /**
     * Merge variants and Options
     */

    const mergedVariants = incomingVariants.map((newVariant) => ({
      ...newVariant,
      ...existingSanityProduct?.variants?.find(
        (oldVariant) => oldVariant.id === newVariant.id
      ),
    }));

    const mergedOptions = incomingOptions.map((incomingOption) => {
      /** Get data from existing option */
      const existingOption = existingSanityProduct?.categories?.find(
        (existingOption) => existingOption.name === incomingOption.name
      );

      return {
        /** add option from webhook*/
        ...incomingOption,
        /** overwrite webhook option with cms option if it exists */
        ...existingOption,
        /** Update values by deep-merging */
        values: incomingOption.values?.map((incomingVal) => ({
          /** Add value from webhook */
          ...incomingVal,
          /** Overwrite if already exists in CMS */
          ...existingOption?.values?.find(
            (val) => val._key === incomingVal._key
          ),
          _key: incomingVal.title,
        })),
      };
    });

    /**
     * New Product
     */

    const product = {
      _type: "product",
      _id: data.id.toString(),
      title: data.title,
      slug: {
        _type: "slug",
        current: data.handle,
      },
      options: {
        variants: mergedVariants,
        categories: mergedOptions,
      },
      data: {
        price: data.variants[0].price,
      },
    };

    return client
      .transaction()
      .createIfNotExists(product)
      .patch(data.id.toString(), (patch) => patch.set(product))
      .commit()
      .then((resp) => {
        sendToSlack(`Successfully pushed ${data.title} to Sanity`);
        res.status(200).json(resp);
      })
      .catch((err) => {
        setError(400, "Error pushing to Sanity", err);
      });
  } catch (err) {
    setError(500, "Unknown error posting to Sanity", err);
  }
};
