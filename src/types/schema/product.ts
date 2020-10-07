import { SanityDocument } from "@sanity/client";
import { SanitySlug, SanityImage, SanityColor } from "types";

export type ProductSchema = {
  title: string;
  slug: SanitySlug;
  options: {
    variants: SanityProductVariant[];
    categories: SanityProductOption[];
  };
  data: {
    price: string;
  };
} & SanityDocument;

export type SanityProductVariant = {
  _key: string;
  id: string;
  image: SanityImage;
  title: string;
};

export type SanityProductOption = {
  _key: string;
  _type: "option";
  name: string;
  values: SanityProductOptionValue[];
};

export type SanityProductOptionValue = {
  _key: string;
  _type: "value";
  optionColors?: SanityColor;
  title: string;
};
