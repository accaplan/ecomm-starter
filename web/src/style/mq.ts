export type SizeKey = 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs'
export type ResponsiveSizes = { [key in SizeKey]: number }
export type ResponsiveImgSizeBlock = { [key in keyof ResponsiveSizes]?: string }

export const SIZES: ResponsiveSizes = {
  xl: 1900,
  lg: 1440,
  md: 1024,
  sm: 768,
  xs: 576,
  xxs: 0,
}

export type Size = keyof typeof SIZES

export type Sizes = {
  [item in Size]: number
}

export type MediaQuery = {
  [item in Size]: string
}

export const mq = Object.keys(SIZES).reduce(
  (acc, current) => ({
    ...acc,
    [current as Size]: `(min-width: ${Reflect.get(SIZES, current)}px)`,
  }),
  {}
) as MediaQuery


