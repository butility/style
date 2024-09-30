import type { StyleResult } from '@/types/style';

// Utility function to convert hyphenated properties to camelCase
function toCamelCase(property: string): string {
    return property.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function parseCss(cssText: string): StyleResult {
    const styleObject: StyleResult['styleObject'] = {};
    const inlineCss: StyleResult['inlineCss'] = {};
    const camelCaseObject: StyleResult['camelCaseObject'] = {};
    const hyphenatedObject: StyleResult['hyphenatedObject'] = {};

    const ruleRegex = /([^{]+)\s*{\s*([^}]+)\s*}/g;
    let match: RegExpExecArray | null;

    // Iterate over all matches of the regex
    while ((match = ruleRegex.exec(cssText)) !== null) {
        const selector = match[1].trim();
        const rules = match[2]
            .trim()
            .split(';')
            .map((rule) => rule.trim())
            .filter(Boolean);

        const properties: { [property: string]: string } = {};
        const camelCaseProperties: { [property: string]: string } = {};
        const hyphenatedProperties: { [property: string]: string } = {};
        let inlineStyle = '';

        for (const rule of rules) {
            const [property, value] = rule
                .split(':')
                .map((part) => part.trim());
            if (property && value) {
                properties[property] = value;
                camelCaseProperties[toCamelCase(property)] = value;
                hyphenatedProperties[property] = value;

                // Append to inline CSS string
                inlineStyle += `${property}: ${value}; `;
            }
        }

        // Remove trailing space in inline style
        inlineCss[selector] = inlineStyle.trim();

        // Set values for each format
        styleObject[selector] = properties;
        camelCaseObject[selector] = camelCaseProperties;
        hyphenatedObject[selector] = hyphenatedProperties;
    }

    return {
        cssText,
        styleObject,
        inlineCss,
        camelCaseObject,
        hyphenatedObject,
    };
}
