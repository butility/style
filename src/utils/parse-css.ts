import type { StyleResult } from '@/types/style';

export function parseCss(cssText: string): StyleResult {
    const styleObject: { [selector: string]: { [property: string]: string } } =
        {};

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
        for (const rule of rules) {
            const [property, value] = rule
                .split(':')
                .map((part) => part.trim());
            if (property && value) {
                properties[property] = value;
            }
        }

        styleObject[selector] = properties;
    }

    return {
        cssText,
        styleObject,
    };
}
