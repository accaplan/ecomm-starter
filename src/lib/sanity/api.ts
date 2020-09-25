import { client as staticClient, previewClient } from "lib/sanity";
import { ProductSchema } from "types";

export const getClient = (isPreview: boolean) =>
  isPreview ? previewClient : staticClient;

export const fetchQuery = (query: string, isPreview: boolean = false) => {
  return getClient(isPreview)
    .fetch(query)
    .then((res) => {
      return (
        res.filter((item: any) => {
          const isDraft = item._id.startsWith("drafts.");
          return isPreview ? isDraft : !isDraft;
        })[0] || res[0]
      );
    });
};

export const fetchProduct = (
  slug: string,
  isPreview: boolean = false
): Promise<ProductSchema> => {
  return getClient(isPreview).fetch(
    `*[_type == 'product' && slug.current == $slug]`,
    {
      slug: "airsign-vacuum-test",
    }
  );
};
