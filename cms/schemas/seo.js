export const seoDescription = {
  name: "description",
  title: "Description",
  type: "text",
  rows: 2,
  description:
    "Enter a description to get a better ranking on search engines like Google. 50–160 characters reccommended",

  validation: (Rule) =>
    Rule.max(160).warning(
      "Descriptions between 50–160 characters reccommended for SEO purposes"
    ),
};

export const seoTitle = {
  name: "title",
  title: "Page Title",
  type: "string",

  description:
    "The page displays in the browser's tab and when the page is shared on social media.",
};

export const seoImage = {
  title: "Social sharing image",
  description:
    "When you share a link to your store on social media, an image is usually shown in your post.",
  name: "metaImage",
  type: "image",
  options: {
    hotspot: true,
  },
};

export default {
  validation: (Rule) => Rule.required(),
  name: "seo",
  title: "Page Meta",
  type: "object",
  fields: [seoTitle, seoDescription, seoImage],
  description: "Shows up in search previews, social media, and share links. ",
  options: {
    collapsable: true,
    collapsed: false,
  },
};
