import { Request } from '@butility/network';
import { parseCss } from '@/utils/parse-css';
import type { StyleResult } from '@/types/style';

export function addStyles(
    elements: HTMLElement[] | HTMLElement,
    styles: CSSStyleDeclaration,
): void {
    if (Array.isArray(elements)) {
        elements.forEach((element) => style(element, styles));
    } else {
        style(elements, styles);
    }

    function style(element: HTMLElement, styles: CSSStyleDeclaration): void {
        for (const property in styles) {
            if (styles.hasOwnProperty(property)) {
                element.style[property as any] = styles[property];
            }
        }
    }
}

export function removeStylesByProps(
    element: HTMLElement,
    ...properties: string[]
): void {
    for (const property of properties) {
        element.style[property as any] = '';
    }
}

export function resetStyles(
    element: HTMLElement,
    styles: CSSStyleDeclaration,
): void {
    for (const property in styles) {
        if (styles.hasOwnProperty(property)) {
            element.style[property] = '';
        }
    }
}

export function getAllStyles(element: HTMLElement): CSSStyleDeclaration {
    const styles: any = {};
    for (let i = 0; i < element.style.length; i++) {
        const property: any = element.style[i];
        styles[property] = element.style[property];
    }
    return styles;
}

export async function loadAsync(url: string): Promise<StyleResult> {
    return new Promise((resolve, reject) => {
        Request.get(
            url,
            {},
            {
                useFetch: true,
                success: (cssText: string) => {
                    resolve(parseCss(cssText));
                },
                error: (error) => {
                    reject(error);
                },
            },
        );
    });
}

export function load(url: string): StyleResult {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);

    if (xhr.status !== 200) {
        throw new Error(`Failed to load CSS: ${xhr.status}`);
    }

    const cssText = xhr.responseText;
    return parseCss(cssText);
}
