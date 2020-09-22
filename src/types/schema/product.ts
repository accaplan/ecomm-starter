export type SanityProduct = {
  _type: string;
  _id: string;
  slug: {
    current: string;
  };
  title: string;
  shopify: {
    productId: number;
    title: string;
    defaultPrice: string;
    defaultVariant: {
      title: string;
      price: string;
      sku: string;
      variantId: number;
      taxable: boolean;
      inventoryQuantity: number;
      inventoryPolicy: string;
      barcode: unknown;
    };
  };
};
