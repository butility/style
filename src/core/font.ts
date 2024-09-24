import { head as Head, link as Link, style as Style } from '@butility/dom/html';
import type { FontOptions } from '@/types/style';

export function loadWebFont({
    family,
    weight = '400',
    style = 'normal',
    subsets = ['latin'],
    elements = ['body'],
    fallbackFonts = ['sans-serif'],
    display = 'swap',
    lazyLoad = false,
    preload = false,
}: FontOptions): void {
    const formattedFamily = family.replace(/\s+/g, '+');
    const fontUrl = `https://fonts.googleapis.com/css2?family=${formattedFamily}:wght@${weight}&subset=${subsets.join(',')}&display=${display}`;

    if (preload) {
        Head(Link({ rel: preload, href: fontUrl, as: 'style' }));
    }

    // Create and append the <link> element for loading the font
    const link = Link({ rel: 'stylesheet', href: fontUrl });

    // Function to inject CSS for applying the font to elements
    const injectCSS = () => {
        const fontStack = [family, ...fallbackFonts].join(', ');

        const cssRules = elements
            .map(
                (selector) =>
                    `${selector} { font-family: "${fontStack}"; font-style: ${style}; font-weight: ${weight}; }`,
            )
            .join(' ');

        Head(Style({ type: 'text/css' }, document.createTextNode(cssRules)));
    };

    link.onload = () => {
        injectCSS();
    };

    link.onerror = () => {
        console.error(`Failed to load font: ${family}`);
    };

    // Append the <link> element for loading the font unless lazy loading is enabled
    if (!lazyLoad) {
        Head(link);
    }

    // Lazy load the font using IntersectionObserver (if lazyLoad option is enabled)
    if (lazyLoad) {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        Head(link);
                        obs.disconnect(); // Stop observing once the font is loaded
                    }
                });
            },
            { threshold: 0.1 }, // Load the font when 10% of the element is visible
        );

        const firstElement = document.querySelector(elements[0]);
        if (firstElement) {
            observer.observe(firstElement);
        } else {
            console.warn(`No elements found for selector: ${elements[0]}`);
        }
    }

    // Check if the font is already loaded in the browser cache
    if (document.fonts && document.fonts.check(`1em ${family}`)) {
        // console.log(`Font "${family}" is already loaded.`);
        injectCSS(); // Directly apply the font if it's already loaded
    }
}

export function loadWebFontAsync({
    family,
    weight = '400',
    style = 'normal',
    subsets = ['latin'],
    elements = ['body'],
    fallbackFonts = ['sans-serif'],
    display = 'swap',
    lazyLoad = false,
    preload = false,
    timeout = 5000, // Default timeout of 5 seconds
    onLoadSuccess = () => {},
    onLoadError = (error) => {
        console.error(error);
    },
    observerOptions = { threshold: 0.1 }, // Default IntersectionObserver threshold
}: FontOptions): Promise<void> {
    return new Promise((resolve, reject) => {
        const formattedFamily = family.replace(/\s+/g, '+');
        const fontUrl = `https://fonts.googleapis.com/css2?family=${formattedFamily}:wght@${weight}&subset=${subsets.join(',')}&display=${display}`;

        // Preload font if option is set
        if (preload) {
            Head(Link({ rel: 'preload', href: fontUrl, as: 'style' }));
        }

        // Create and append the <link> element for loading the font
        const link = Link({ rel: 'stylesheet', href: fontUrl });

        // Function to inject CSS for applying the font to elements
        const injectCSS = () => {
            const fontStack = [family, ...fallbackFonts].join(', ');
            const cssRules = elements
                .map(
                    (selector) =>
                        `${selector} { font-family: "${fontStack}"; font-style: ${style}; font-weight: ${weight}; }`,
                )
                .join(' ');

            Head(
                Style({ type: 'text/css' }, document.createTextNode(cssRules)),
            );
        };

        // Handle font loading success
        link.onload = () => {
            injectCSS();
            onLoadSuccess(); // Trigger the success callback
            resolve(); // Resolve the promise when the font is successfully loaded
        };

        // Handle font loading failure
        link.onerror = (event) => {
            const error = new Error(`Failed to load font: ${family}`);
            onLoadError(error); // Trigger the error callback
            reject(error); // Reject the promise on error
        };

        // Append the <link> element unless lazy loading is enabled
        if (!lazyLoad) {
            Head(link);
        }

        // Lazy load the font using IntersectionObserver (if lazyLoad is enabled)
        if (lazyLoad) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        Head(link);
                        obs.disconnect(); // Stop observing once the font is loaded
                    }
                });
            }, observerOptions);

            const firstElement = document.querySelector(elements[0]);
            if (firstElement) {
                observer.observe(firstElement);
            } else {
                console.warn(`No elements found for selector: ${elements[0]}`);
            }
        }

        // Check if the font is already loaded in the browser cache
        if (document.fonts && document.fonts.check(`1em ${family}`)) {
            injectCSS(); // Directly apply the font if it's already loaded
            onLoadSuccess();
            resolve(); // Resolve immediately if font is already loaded
            return;
        }

        // Handle timeout for font loading
        const timeoutId = setTimeout(() => {
            const error = new Error(
                `Font loading timed out after ${timeout}ms: ${family}`,
            );
            onLoadError(error);
            reject(error);
        }, timeout);

        // Clear timeout if font loads successfully
        link.onload = () => {
            clearTimeout(timeoutId);
            injectCSS();
            onLoadSuccess();
            resolve();
        };

        link.onerror = (event) => {
            clearTimeout(timeoutId);
            const error = new Error(`Failed to load font: ${family}`);
            onLoadError(error);
            reject(error);
        };

        // Append the link to the document only if lazyLoad is disabled
        if (!lazyLoad) {
            Head(link);
        }
    });
}
