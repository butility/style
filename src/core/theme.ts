import { Theme, ThemeConfig } from '@/types/style';

export class ThemeManager {
    private themes: ThemeConfig = {};
    private currentTheme: string | null = null;

    constructor(initialThemes?: ThemeConfig) {
        if (initialThemes) {
            this.themes = initialThemes;
        }

        this.loadThemeFromStorage(); // Load user preference
        this.detectSystemTheme(); // Set initial theme based on system preference
        this.watchSystemTheme(); // Listen for system theme changes
    }

    // Create a new theme
    public createTheme(name: string, theme: Theme) {
        this.themes[name] = theme;
    }

    // Set a theme by name
    public setTheme(name: string) {
        const theme = this.themes[name];
        if (!theme) {
            console.warn(`Theme ${name} does not exist.`);
            return;
        }

        Object.entries(theme).forEach(([key, value]) => {
            document.documentElement.style.setProperty(`--${key}`, value);
        });

        this.currentTheme = name;
        localStorage.setItem('theme', name);
    }

    public getCurrentTheme(): string | null {
        return this.currentTheme;
    }

    // Load theme from local storage
    private loadThemeFromStorage() {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme && this.themes[storedTheme]) {
            this.setTheme(storedTheme);
        }
    }

    // Detect system theme (light/dark) and set it
    private detectSystemTheme() {
        const prefersDarkScheme = window.matchMedia(
            '(prefers-color-scheme: dark)',
        ).matches;
        this.setTheme(prefersDarkScheme ? 'dark' : 'light');
    }

    // Watch for system theme changes and update theme
    private watchSystemTheme() {
        window
            .matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', (event) => {
                this.setTheme(event.matches ? 'dark' : 'light');
            });
    }
}
