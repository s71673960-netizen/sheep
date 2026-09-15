import deepmerge from '@mui/utils/deepmerge';
import typographyTokens from '../tokens/generated/typography';

function round(value) {
  return Math.round(value * 1e5) / 1e5;
}

const caseAllCaps = {
  textTransform: 'uppercase',
};
const defaultFontFamily = typographyTokens.fontFamily;

/**
 * @see @link{https://m2.material.io/design/typography/the-type-system.html}
 * @see @link{https://m2.material.io/design/typography/understanding-typography.html}
 */
export default function createTypography(palette, typography) {
  const {
    fontFamily = defaultFontFamily,
    fontSize = typographyTokens.fontSize,
    fontWeightRegular = typographyTokens.fontWeightRegular,
    fontWeightMedium = typographyTokens.fontWeightMedium,
    fontWeightBold = typographyTokens.fontWeightBold,
    htmlFontSize = typographyTokens.htmlFontSize,
    allVariants,
    pxToRem: pxToRem2,
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography;

  if (process.env.NODE_ENV !== 'production') {
    if (typeof fontSize !== 'number') {
      console.error('MUI: `fontSize` is required to be a number.');
    }

    if (typeof htmlFontSize !== 'number') {
      console.error('MUI: `htmlFontSize` is required to be a number.');
    }
  }

  const coef = fontSize / 14;
  const pxToRem = pxToRem2 || ((size) => `${(size / htmlFontSize) * coef}rem`);
  const buildVariant = (fontWeight, size, lineHeight, letterSpacing, casing) => ({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    lineHeight,
    letterSpacing: `${round(letterSpacing)}em`,
    ...casing,
    ...allVariants,
  });

  const tv = typographyTokens.variants;
  const variants = {
    h1: buildVariant(tv.h1.fontWeight, tv.h1.fontSize, tv.h1.lineHeight, tv.h1.letterSpacing),
    h2: buildVariant(tv.h2.fontWeight, tv.h2.fontSize, tv.h2.lineHeight, tv.h2.letterSpacing),
    h3: buildVariant(tv.h3.fontWeight, tv.h3.fontSize, tv.h3.lineHeight, tv.h3.letterSpacing),
    h4: buildVariant(tv.h4.fontWeight, tv.h4.fontSize, tv.h4.lineHeight, tv.h4.letterSpacing),
    h5: buildVariant(tv.h5.fontWeight, tv.h5.fontSize, tv.h5.lineHeight, tv.h5.letterSpacing),
    h6: buildVariant(tv.h6.fontWeight, tv.h6.fontSize, tv.h6.lineHeight, tv.h6.letterSpacing),
    subtitle1: buildVariant(tv.subtitle1.fontWeight, tv.subtitle1.fontSize, tv.subtitle1.lineHeight, tv.subtitle1.letterSpacing),
    subtitle2: buildVariant(tv.subtitle2.fontWeight, tv.subtitle2.fontSize, tv.subtitle2.lineHeight, tv.subtitle2.letterSpacing),
    body1: buildVariant(tv.body1.fontWeight, tv.body1.fontSize, tv.body1.lineHeight, tv.body1.letterSpacing),
    body2: buildVariant(tv.body2.fontWeight, tv.body2.fontSize, tv.body2.lineHeight, tv.body2.letterSpacing),
    button: buildVariant(tv.button.fontWeight, tv.button.fontSize, tv.button.lineHeight, tv.button.letterSpacing),
    caption: buildVariant(tv.caption.fontWeight, tv.caption.fontSize, tv.caption.lineHeight, tv.caption.letterSpacing),
    overline: buildVariant(tv.overline.fontWeight, tv.overline.fontSize, tv.overline.lineHeight, tv.overline.letterSpacing, caseAllCaps),
    inherit: {
      fontFamily: 'inherit',
      fontWeight: 'inherit',
      fontSize: 'inherit',
      lineHeight: 'inherit',
      letterSpacing: 'inherit',
    },
  };

  return deepmerge(
    {
      htmlFontSize,
      pxToRem,
      fontFamily,
      fontSize,
      fontWeightRegular,
      fontWeightMedium,
      fontWeightBold,
      ...variants,
    },
    other,
    {
      clone: false,
    },
  );
}
