export function rgbToHex(r: number, g: number, b: number): string {
    const toHex = (c: number) => {
        const hex = c.toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };

    return '#' + toHex(r) + toHex(g) + toHex(b);
}

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
        hex,
    ) as RegExpExecArray;
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    };
}

export function rgbaToHex(r: number, g: number, b: number, a: number): string {
    return (
        rgbToHex(r, g, b) +
        Math.round(a * 255)
            .toString(16)
            .padStart(2, '0')
    );
}

export function hexToRgba(hex: string, a: number): string | null {
    const rgb = hexToRgb(hex);
    return rgb ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${a})` : null;
}

export function colorBrightness(color: string): number | null {
    const rgb = hexToRgb(color);
    return rgb ? (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255 : null;
}

export function colorContrast(color1: string, color2: string): number | null {
    const brightness1 = colorBrightness(color1);
    const brightness2 = colorBrightness(color2);

    if (brightness1 !== null && brightness2 !== null) {
        return Math.abs(brightness1 - brightness2);
    }

    return null;
}

export function generateRandomColor(): string {
    const randomColorComponent = (): number => Math.floor(Math.random() * 256);
    return rgbToHex(
        randomColorComponent(),
        randomColorComponent(),
        randomColorComponent(),
    );
}

export function darkenColor(color: string, percentage: number): string {
    const { r, g, b } = hexToRgb(color);
    const factor = 1 - percentage / 100;
    const newR = Math.floor(r * factor);
    const newG = Math.floor(g * factor);
    const newB = Math.floor(b * factor);
    return rgbToHex(newR, newG, newB);
}

export function lightenColor(color: string, percentage: number): string {
    const { r, g, b } = hexToRgb(color);
    const factor = 1 + percentage / 100;
    const newR = Math.min(Math.floor(r * factor), 255);
    const newG = Math.min(Math.floor(g * factor), 255);
    const newB = Math.min(Math.floor(b * factor), 255);
    return rgbToHex(newR, newG, newB);
}

export function calculateLuminance(color: string): number {
    const { r, g, b } = hexToRgb(color);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
}

export function hslToRgb(
    hue: number,
    saturation: number,
    lightness: number,
): object {
    const h = hue / 360;
    const s = saturation / 100;
    const l = lightness / 100;

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    const rgb = {
        r: Math.round(hueToRgb(p, q, h + 1 / 3) * 255),
        g: Math.round(hueToRgb(p, q, h) * 255),
        b: Math.round(hueToRgb(p, q, h - 1 / 3) * 255),
    };

    return rgb;
}

export function hueToRgb(p: number, q: number, t: number): number {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}

export function rgbToHsl(
    red: number,
    green: number,
    blue: number,
): { h: number; s: number; l: number } {
    const r = red / 255;
    const g = green / 255;
    const b = blue / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let h, s, l;

    if (delta === 0) {
        h = 0;
    } else if (max === r) {
        h = ((g - b) / delta) % 6;
    } else if (max === g) {
        h = (b - r) / delta + 2;
    } else {
        h = (r - g) / delta + 4;
    }

    h = Math.round((h * 60 + 360) % 360);

    l = (max + min) / 2;

    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return { h, s, l };
}

export function mixColors(
    color1: string,
    color2: string,
    weight: number,
): string {
    const rgb1 = hexToRgb(color1);
    const rgb2 = hexToRgb(color2);

    const mixedColor = {
        r: Math.round(rgb1.r * weight + rgb2.r * (1 - weight)),
        g: Math.round(rgb1.g * weight + rgb2.g * (1 - weight)),
        b: Math.round(rgb1.b * weight + rgb2.b * (1 - weight)),
    };

    return rgbToHex(mixedColor.r, mixedColor.g, mixedColor.b);
}

export function generateColorGradient(
    startColor: string,
    endColor: string,
    steps: number,
): string[] {
    const gradient: string[] = [];
    for (let i = 0; i < steps; i++) {
        const weight = i / (steps - 1);
        const interpolatedColor = mixColors(startColor, endColor, weight);
        gradient.push(interpolatedColor);
    }
    return gradient;
}

export function invertColor(color: string): string {
    const { r, g, b } = hexToRgb(color);
    const invertedColor = {
        r: 255 - r,
        g: 255 - g,
        b: 255 - b,
    };
    return rgbToHex(invertedColor.r, invertedColor.g, invertedColor.b);
}
