import { MdShoppingCart } from "react-icons/lib/md";

const SHOPIFY_MOD_MSG = "From Shopify and cannot be modified here";

export default {
  name: "product",
  title: "Shopify Product",
  type: "document",
  icon: MdShoppingCart,

  fields: [
    {
      title: "Title",
      name: "title",
      type: "string",
      description: SHOPIFY_MOD_MSG,
      readOnly: true,
    },
    {
      title: "Slug",
      name: "slug",
      type: "slug",
      description: SHOPIFY_MOD_MSG,
      readOnly: true,
    },
    {
      name: "image",
      type: "image",
      description: "Main image of product",
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    },
    {
      name: "variants",
      title: "Variant Images",
      description:
        "Add images for Shopify variants. This list is auto-populated by Shopify.",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              type: "string",
              readOnly: true,
            },
            {
              name: "title",
              type: "string",
              readOnly: true,
            },
            {
              name: "image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
    {
      name: "options",
      type: "array",
      of: [
        {
          type: "object",
          name: "option",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "values",
              type: "array",
              of: [
                {
                  name: "value",
                  type: "object",
                  fields: [
                    {
                      name: "title",
                      type: "string",
                    },

                    {
                      title: "Color Value",
                      type: "color",
                      name: "optionColors",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
