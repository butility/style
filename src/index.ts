export * from '@/modules/color';
export * from '@/modules/css';
export * from '@/modules/font';
export * from '@/modules/state';
export * from '@/modules/theme';

import Color, * as ColorModule from '@/modules/color';
import Font, * as FontModules from '@/modules/font';
import CSS, * as CSSModules from '@/modules/css';
import ThemeManager from '@/modules/theme';
import setStateBasedStyle from '@/modules/state';

const StyleModule = {
    ...ColorModule,
    ...FontModules,
    ...CSSModules,
    ThemeManager,
    setStateBasedStyle,
};

const removeProperty = <T extends object, K extends keyof T>(
    obj: T,
    key: K,
): Omit<T, K> => {
    const { [key]: _, ...rest } = obj;
    return rest;
};

const Style = removeProperty(StyleModule, 'default');

export default Style;
export { Color, Font, CSS };
