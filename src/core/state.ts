import { addStyles, resetStyles } from '@/core/css';
import type { StateStyleConfig, CustomEvent, State } from '@/types/style';

export function setStateBasedStyle(
    element: HTMLElement,
    config: StateStyleConfig,
) {
    for (const state in config) {
        const value = config[state as State];

        if (typeof value === 'object' && !Array.isArray(value)) {
            // Handle standard states
            const styles = value as CSSStyleDeclaration;

            switch (state) {
                case 'hover':
                    element.addEventListener('mouseover', () =>
                        addStyles(element, styles),
                    );
                    element.addEventListener('mouseout', () =>
                        resetStyles(element, styles),
                    );
                    break;

                case 'active':
                    element.addEventListener('mousedown', () =>
                        addStyles(element, styles),
                    );
                    element.addEventListener('mouseup', () =>
                        resetStyles(element, styles),
                    );
                    break;

                case 'focus':
                    element.addEventListener('focus', () =>
                        addStyles(element, styles),
                    );
                    element.addEventListener('blur', () =>
                        resetStyles(element, styles),
                    );
                    break;

                case 'click':
                    element.addEventListener('click', () =>
                        addStyles(element, styles),
                    );
                    break;

                default:
                    console.warn(`Unsupported state: ${state}`);
                    break;
            }
        } else if (typeof value === 'object' && 'eventName' in value) {
            const { eventName, styles } = value as CustomEvent;
            element.addEventListener(eventName, () =>
                addStyles(element, styles),
            );
            element.addEventListener('mouseleave', () =>
                resetStyles(element, styles),
            ); // Reset on mouse leave
        }
    }
}
