import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const clientOptions = {
  dataset: "production",
  projectId: "n7a0421f",
  useCdn: process.env.NODE_ENV === "production",
};

/**
 * Sanity JavaScript Client
 */

export const client = sanityClient(clientOptions);

/**
 * Draft preview client
 */

export const previewClient = sanityClient({
  ...clientOptions,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

/**
 * Build Sanity Image Url
 */

export const urlFor = (source: any) => {
  return imageUrlBuilder(client).image(source);
};
