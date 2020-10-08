import modularScale from "@tylermcrobert/modularscale";

export const scale = modularScale({ scale: 1.2 });

export const size = {
  xs: `0.25rem`,
  sm: `0.5rem`,
  ...scale.sizeForTemplate,
};

export const color = {
  primary: "blue",
};
