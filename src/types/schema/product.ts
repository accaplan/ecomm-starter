import { SanityDocument } from "@sanity/client";
import {
  ProductSchemaBasicInfo,
  ProductSchemaOptions,
  ProductSchemaShopifyData,
} from "sanity-shopify-toolkit";

export type ProductSchema = {} & SanityDocument &
  ProductSchemaBasicInfo &
  ProductSchemaOptions &
  ProductSchemaShopifyData;
