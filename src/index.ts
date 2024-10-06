export * from '@/modules/color';
export * from '@/modules/css';
export * from '@/modules/font';
export * from '@/modules/state';
export * from '@/modules/theme';

import Color, {
    calculateLuminance,
    colorBrightness,
    colorContrast,
    darkenColor,
    generateColorGradient,
    generateRandomColor,
    hexToRgb,
    hexToRgba,
    hslToRgb,
    hueToRgb,
    invertColor,
    lightenColor,
    mixColors,
    rgbToHex,
    rgbToHsl,
    rgbaToHex,
} from '@/modules/color';
import Font, { loadWebFont, loadWebFontAsync } from '@/modules/font';
import CSS, {
    addStyles,
    removeStylesByProps,
    resetStyles,
    load,
    loadAsync,
    getAllStyles,
} from '@/modules/css';
import ThemeManager from '@/modules/theme';
import setStateBasedStyle from '@/modules/state';

const Style = {
    calculateLuminance,
    colorBrightness,
    colorContrast,
    darkenColor,
    generateColorGradient,
    generateRandomColor,
    hexToRgb,
    hexToRgba,
    hslToRgb,
    hueToRgb,
    invertColor,
    lightenColor,
    mixColors,
    rgbToHex,
    rgbToHsl,
    rgbaToHex,
    loadWebFont,
    loadWebFontAsync,
    addStyles,
    removeStylesByProps,
    resetStyles,
    load,
    loadAsync,
    getAllStyles,
    ThemeManager,
    setStateBasedStyle,
};

export { Style as default, Color, Font, CSS };
