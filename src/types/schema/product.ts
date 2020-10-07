import { SanityDocument } from "@sanity/client";
import {
  ProductSchemaBasicInfo,
  ProductSchemaOptions,
  ProductSchemaShopifyData,
} from "@tylermcrobert/sanity-schemas";

export type ProductSchema = {} & SanityDocument &
  ProductSchemaBasicInfo &
  ProductSchemaOptions &
  ProductSchemaShopifyData;
