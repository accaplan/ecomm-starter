import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const clientOptions = {
  dataset: "production",
  projectId: "n7a0421f",
  useCdn: process.env.NODE_ENV === "production",
};

const client = sanityClient(clientOptions);

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => {
  return builder.image(source);
};

export default client;
