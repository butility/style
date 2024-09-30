// Font
type FontDisplayType = 'swap' | 'block' | 'fallback' | 'optional';

export interface FontOptions {
    family: string;
    weight?: string;
    style?: string;
    subsets?: string[];
    elements?: string[];
    fallbackFonts?: string[];
    display?: FontDisplayType;
    lazyLoad?: boolean;
    preload?: boolean;
    timeout?: number;
    onLoadSuccess?: () => void;
    onLoadError?: (error: Error) => void;
    observerOptions?: IntersectionObserverInit;
}

// Theme
export interface Theme {
    [key: string]: string; // Key-value pairs for CSS variables
}

export interface ThemeConfig {
    [themeName: string]: Theme; // Theme name mapping to theme variables
}

// State
export type State = 'hover' | 'active' | 'focus' | 'click' | 'custom'; // Add more states as needed
export type StateStyleConfig = {
    [key in State]: CSSStyleDeclaration | CustomEvent;
};

export interface CustomEvent {
    eventName: string;
    styles: CSSStyleDeclaration;
}

// css
export interface StyleResult {
    cssText: string; // The original CSS text
    styleObject: { [selector: string]: { [property: string]: string } }; // Original parsed object with hyphenated properties
    inlineCss: { [selector: string]: string }; // Inline CSS string format
    camelCaseObject: { [selector: string]: { [property: string]: string } }; // Parsed object with camelCase properties
    hyphenatedObject: { [selector: string]: { [property: string]: string } }; // Parsed object with hyphenated properties
}
