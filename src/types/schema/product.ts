import { SanityDocument } from "@sanity/client";
import { SanitySlug, SanityImage, SanityColor } from "types";

export type ProductSchema = {
  title: string;
  slug: SanitySlug;
  colors?: [
    {
      _key: string;
      _type: string;
      optionColors: SanityColor;
      title: string;
    }
  ];
  variants?: {
    _key: string;
    id: string;
    image: SanityImage;
    title: string;
  }[];
  options?: SanityProductOption[];
} & SanityDocument;

export type SanityProductOption = {
  _key: string;
  _type: "option";
  name: string;
  values?: SanityProductOptionValue[];
};

export type SanityProductOptionValue = {
  _key: string;
  _type: "value";
  optionColors?: SanityColor;
  title?: string;
};
