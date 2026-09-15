import deepmerge from '@mui/utils/deepmerge';
import { darken, getContrastRatio, lighten } from '@mui/system/colorManipulator';
import common from '../colors/common';
import grey from '../colors/grey';
import paletteLight from '../tokens/generated/paletteLight';
import paletteDark from '../tokens/generated/paletteDark';
import { label } from '../tokens/generated/extensions';

function getLight() {
  return {
    text: paletteLight.text,
    divider: paletteLight.divider,
    background: paletteLight.background,
    action: paletteLight.action,
  };
}

export const light = getLight();

function getDark() {
  return {
    text: paletteDark.text,
    divider: paletteDark.divider,
    background: paletteDark.background,
    action: paletteDark.action,
  };
}

export const dark = getDark();

function addLightOrDark(intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;

  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = lighten(intent.main, tonalOffsetLight);
    } else if (direction === 'dark') {
      intent.dark = darken(intent.main, tonalOffsetDark);
    }
  }
}

function mixLightOrDark(colorSpace, intent, direction, shade, tonalOffset) {
  const tonalOffsetLight = tonalOffset.light || tonalOffset;
  const tonalOffsetDark = tonalOffset.dark || tonalOffset * 1.5;

  if (!intent[direction]) {
    if (intent.hasOwnProperty(shade)) {
      intent[direction] = intent[shade];
    } else if (direction === 'light') {
      intent.light = `color-mix(in ${colorSpace}, ${intent.main}, #fff ${(tonalOffsetLight * 100).toFixed(0)}%)`;
    } else if (direction === 'dark') {
      intent.dark = `color-mix(in ${colorSpace}, ${intent.main}, #000 ${(tonalOffsetDark * 100).toFixed(0)}%)`;
    }
  }
}

function getDefaultPrimary(mode = 'light') {
  if (mode === 'dark') {
    return paletteDark.primary;
  }
  return paletteLight.primary;
}

function getDefaultSecondary(mode = 'light') {
  if (mode === 'dark') {
    return paletteDark.secondary;
  }
  return paletteLight.secondary;
}

function getDefaultError(mode = 'light') {
  if (mode === 'dark') {
    return paletteDark.error;
  }
  return paletteLight.error;
}

function getDefaultInfo(mode = 'light') {
  if (mode === 'dark') {
    return paletteDark.info;
  }
  return paletteLight.info;
}

function getDefaultSuccess(mode = 'light') {
  if (mode === 'dark') {
    return paletteDark.success;
  }
  return paletteLight.success;
}

function getDefaultWarning(mode = 'light') {
  if (mode === 'dark') {
    return paletteDark.warning;
  }
  return paletteLight.warning;
}

// Use the same name as the experimental CSS `contrast-color` function.
export function contrastColor(background) {
  return `oklch(from ${background} var(--__l) 0 h / var(--__a))`;
}

export default function createPalette(palette) {
  const {
    mode = 'light',
    contrastThreshold = 3,
    tonalOffset = 0.2,
    colorSpace,
    ...other
  } = palette;

  const primary = palette.primary || getDefaultPrimary(mode);
  const secondary = palette.secondary || getDefaultSecondary(mode);
  const error = palette.error || getDefaultError(mode);
  const info = palette.info || getDefaultInfo(mode);
  const success = palette.success || getDefaultSuccess(mode);
  const warning = palette.warning || getDefaultWarning(mode);

  // Use the same logic as
  // Bootstrap: https://github.com/twbs/bootstrap/blob/1d6e3710dd447de1a200f29e8fa521f8a0908f70/scss/_functions.scss#L59
  // and material-components-web https://github.com/material-components/material-components-web/blob/ac46b8863c4dab9fc22c4c662dc6bd1b65dd652f/packages/mdc-theme/_functions.scss#L54
  function getContrastText(background) {
    if (colorSpace) {
      return contrastColor(background);
    }
    const contrastText =
      getContrastRatio(background, dark.text.primary) >= contrastThreshold
        ? dark.text.primary
        : light.text.primary;

    if (process.env.NODE_ENV !== 'production') {
      const contrast = getContrastRatio(background, contrastText);
      if (contrast < 3) {
        console.error(
          [
            `MUI: The contrast ratio of ${contrast}:1 for ${contrastText} on ${background}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join('\n'),
        );
      }
    }

    return contrastText;
  }

  const augmentColor = ({ color, name, mainShade = 500, lightShade = 300, darkShade = 700 }) => {
    color = { ...color };
    if (!color.main && color[mainShade]) {
      color.main = color[mainShade];
    }

    if (!color.hasOwnProperty('main')) {
      throw /* minify-error */ new Error(
        `MUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.\n` +
          `The color object needs to have a \`main\` property or a \`${mainShade}\` property.`,
      );
    }

    if (typeof color.main !== 'string') {
      throw /* minify-error */ new Error(
        `MUI: The color${name ? ` (${name})` : ''} provided to augmentColor(color) is invalid.\n` +
          `\`color.main\` should be a string, but \`${JSON.stringify(color.main)}\` was provided instead.\n` +
          '\n' +
          'Did you intend to use one of the following approaches?\n' +
          '\n' +
          'import { green } from "@mui/material/colors";\n' +
          '\n' +
          'const theme1 = createTheme({ palette: {\n' +
          '  primary: green,\n' +
          '} });\n' +
          '\n' +
          'const theme2 = createTheme({ palette: {\n' +
          '  primary: { main: green[500] },\n' +
          '} });',
      );
    }

    if (colorSpace) {
      mixLightOrDark(colorSpace, color, 'light', lightShade, tonalOffset);
      mixLightOrDark(colorSpace, color, 'dark', darkShade, tonalOffset);
    } else {
      addLightOrDark(color, 'light', lightShade, tonalOffset);
      addLightOrDark(color, 'dark', darkShade, tonalOffset);
    }
    if (!color.contrastText) {
      color.contrastText = getContrastText(color.main);
    }

    return color;
  };

  let modeHydrated;
  if (mode === 'light') {
    modeHydrated = getLight();
  } else if (mode === 'dark') {
    modeHydrated = getDark();
  }

  if (process.env.NODE_ENV !== 'production') {
    if (!modeHydrated) {
      console.error(`MUI: The palette mode \`${mode}\` is not supported.`);
    }
  }

  const paletteOutput = deepmerge(
    {
      // A collection of common colors.
      common: { ...common }, // prevent mutable object.
      // The palette mode, can be light or dark.
      mode,
      // The colors used to represent primary interface elements for a user.
      primary: augmentColor({ color: primary, name: 'primary' }),
      // The colors used to represent secondary interface elements for a user.
      secondary: augmentColor({
        color: secondary,
        name: 'secondary',
        mainShade: 'A400',
        lightShade: 'A200',
        darkShade: 'A700',
      }),
      // The colors used to represent interface elements that the user should be made aware of.
      error: augmentColor({ color: error, name: 'error' }),
      // The colors used to represent potentially dangerous actions or important messages.
      warning: augmentColor({ color: warning, name: 'warning' }),
      // The colors used to present information to the user that is neutral and not necessarily important.
      info: augmentColor({ color: info, name: 'info' }),
      // The colors used to indicate the successful completion of an action that user triggered.
      success: augmentColor({ color: success, name: 'success' }),
      // The grey colors.
      grey: (mode === 'dark' ? paletteDark.grey : paletteLight.grey) || grey,
      // Used by `getContrastText()` to maximize the contrast between
      // the background and the text.
      contrastThreshold,
      // Takes a background color and returns the text color that maximizes the contrast.
      getContrastText,
      // Generate a rich color object.
      augmentColor,
      // Used by the functions below to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset,
      // Additional design token extensions
      label,
      // The light and dark mode object.
      ...modeHydrated,
    },
    other,
  );

  return paletteOutput;
}
