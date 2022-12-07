import 'styled-components';

import theme from '../src/styles/theme';

export type ThemeMode = 'light' | 'dark';
export type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Omit<Theme, 'colors'> {}
}
