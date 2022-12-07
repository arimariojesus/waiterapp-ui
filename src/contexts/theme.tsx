import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';

import { GlobalStyles } from '@/styles/GlobalStyles';
import theme from '@/styles/theme';
import { ThemeMode } from '@/@types/styled';

export type AppThemeContextData = {
  theme: DefaultTheme;
  currentTheme: ThemeMode;
  toggleTheme: () => void;
};

export const AppThemeContext = createContext<AppThemeContextData | null>(null);

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(() => {
    const storedTheme = localStorage.getItem('waiterapp@theme') as ThemeMode;
    if (storedTheme) return storedTheme;
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  const toggleTheme = React.useCallback(() => {
    setCurrentTheme(_theme => {
      const newTheme = _theme === 'light' ? 'dark' : 'light';
      localStorage.setItem('waiterapp@theme', newTheme);
      return newTheme;
    });
  }, []);

  const memorizedValue = React.useMemo(
    () => ({
      currentTheme,
      toggleTheme,
      theme: {
        ...theme,
        mode: currentTheme,
        color: theme.colors[currentTheme],
      },
    }),
    [currentTheme, toggleTheme],
  );

  useEffect(() => {
    if (!window.matchMedia) return;

    const query = '(prefers-color-scheme: dark)';
    const matchMediaThemeDark = window.matchMedia(query);
    const handleChangeThemeInSystem = (event: MediaQueryListEvent) => {
      setCurrentTheme(event.matches ? 'dark' : 'light');
    };

    matchMediaThemeDark.addEventListener('change', handleChangeThemeInSystem);

    return () => {
      matchMediaThemeDark.removeEventListener(
        'change',
        handleChangeThemeInSystem,
      );
    };
  }, []);

  useEffect(() => {
    document.body.dataset.theme = currentTheme;
    localStorage.setItem('waiterapp@theme', currentTheme);
  }, [currentTheme]);

  return (
    <ThemeProvider theme={memorizedValue.theme}>
      <AppThemeContext.Provider value={null}>
        {children}
      </AppThemeContext.Provider>
      <GlobalStyles />
    </ThemeProvider>
  );
};
