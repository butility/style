export * from '@/core/color';

import {
    calculateLuminance,
    colorBrightness as brightness,
    colorContrast as contrast,
    darkenColor as darken,
    generateColorGradient as generateGradient,
    generateRandomColor as generateRandom,
    hexToRgb,
    hexToRgba,
    hslToRgb,
    hueToRgb,
    invertColor as invert,
    lightenColor as lighten,
    mixColors as mix,
    rgbToHex,
    rgbToHsl,
    rgbaToHex,
} from '@/core/color';

const Color = {
    calculateLuminance,
    brightness,
    contrast,
    darken,
    generateGradient,
    generateRandom,
    hexToRgb,
    hexToRgba,
    hslToRgb,
    hueToRgb,
    invert,
    lighten,
    mix,
    rgbToHex,
    rgbToHsl,
    rgbaToHex,
};

export default Color;
