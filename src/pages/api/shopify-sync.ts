/* eslint-disable no-console */
import sanityClient from "@sanity/client";
import { Product } from "@tylermcrobert/shopify-react";
import { clientOptions } from "lib/sanity";
import { NextApiRequest, NextApiResponse } from "next";
import { SanityProduct, ShopifyWebhookRes } from "types";

export const client = sanityClient({
  ...clientOptions,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

// TODO: verify webhook
//https://shopify.dev/tutorials/manage-webhooks#verify-webhook

export default async (req: NextApiRequest, res: NextApiResponse) => {
  new ShopifySyncClass(req, res).init();
};

class ShopifySyncClass {
  req: NextApiRequest;
  res: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.req = req;
    this.res = res;
  }

  /**
   * Initialize
   */

  init() {
    this.validateRequest();
    this.doSanityTransaction();
  }

  /**
   * Standardizes error responses
   * @param code Status code
   * @param message Error message in your own words
   * @param err Error object
   */

  setErr = (code: number, message: string, err: any | null) => {
    console.error(err);
    this.res.status(code).json({ error: true, message: message });
    return null;
  };

  /**
   * Check for correct method
   */
  validateRequest() {
    if (this.req.method !== "POST" || !this.req.body) {
      this.setErr(400, "Method must be POST and have body", null);
    }
  }

  /**
   * Format for Sanity
   */
  getFormattedData() {
    const webhookData: ShopifyWebhookRes = this.req.body;

    const sanityProduct = {
      _type: "product",
      _id: webhookData.id.toString(),
      slug: { current: webhookData.handle },
      title: webhookData.title,
      shopify: {
        productId: webhookData.id,
        title: webhookData.title,
        defaultPrice: webhookData.variants[0].price,
        defaultVariant: {
          title: webhookData.variants[0].title,
          price: webhookData.variants[0].price,
          sku: webhookData.variants[0].sku,
          variantId: webhookData.variants[0].id,
          taxable: webhookData.variants[0].taxable,
          inventoryQuantity: webhookData.variants[0].inventory_quantity,
          inventoryPolicy: webhookData.variants[0].inventory_policy,
          barcode: webhookData.variants[0].barcode,
        },
      },
    };

    const productVariants = webhookData.variants.map((variant) => ({
      _type: "productVariant",
      _id: variant.id.toString(),
      title: webhookData.title,
      shopify: {
        productId: webhookData.id,
        variantId: variant.id,
        title: webhookData.title,
        variantTitle: variant.title,
        sku: variant.sku,
        price: variant.price,
      },
    }));

    return {
      sanityProduct,
      productVariants,
      webhookData,
    };
  }

  /**
   * Merge data into sanity
   */

  async doSanityTransaction() {
    const { webhookData } = this.getFormattedData();

    const existingSanityProduct: SanityProduct = await client.fetch(
      `*[_type == "product" && _id == $id][0]`,
      { id: webhookData.id.toString() }
    );

    if (!!existingSanityProduct) {
      // Check if product updates have happened that matter
      const isTopLevelChange =
        existingSanityProduct.title !== webhookData.title ||
        existingSanityProduct.slug.current !== webhookData.handle;

      if (isTopLevelChange) {
        this.updateEverything();
      } else {
        this.partialUpdate(existingSanityProduct, webhookData);
      }
    } else {
      this.updateEverything();
    }
  }

  /**
   * Perform complete update
   */

  async updateEverything() {
    const {
      sanityProduct,
      productVariants,
      webhookData,
    } = this.getFormattedData();

    let tx = client.transaction();

    /**
     * Update product
     */

    try {
      tx = tx.createIfNotExists(sanityProduct);
      tx = tx.patch(sanityProduct._id.toString(), (patch) =>
        patch.set(sanityProduct)
      );

      console.log(
        `Successfully updated/patched Product ${sanityProduct._id} in Sanity`
      );
    } catch (err) {
      this.setErr(400, "Could not create new product", err);
    }

    /**
     * Update variants
     */

    try {
      productVariants.forEach((variant) => {
        tx = tx.createIfNotExists(variant);
        tx = tx.patch(variant._id, (p) => p.set(variant));
      });
    } catch (err) {
      this.setErr(400, "Could not create new variants", err);
    }

    console.log(
      `Updating/patching Variants ${webhookData.variants
        .map((v) => v.id)
        .join(", ")} in Sanity`
    );

    /**
     * Include variants on product document
     */

    tx = tx.patch(webhookData.id.toString(), (p) =>
      p.set({
        "shopify.variants": webhookData.variants.map((variant) => ({
          _type: "reference",
          _ref: variant.id.toString(),
          _key: variant.id.toString(),
        })),
      })
    );

    /**
     * Commit
     */

    const result = await tx.commit();
    this.res.json({ result });
  }

  /**
   * Selectively update
   */

  partialUpdate(
    existingSanityProduct: SanityProduct,
    webhookData: ShopifyWebhookRes
  ) {
    console.log(existingSanityProduct, webhookData);
  }
}
