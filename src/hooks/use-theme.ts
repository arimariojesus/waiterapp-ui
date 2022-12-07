import { useContext } from 'react';

import { AppThemeContext } from '@/contexts';

export const useTheme = () => {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error('You must use useTheme inside AppThemeProvider!');
  }

  return context;
};
