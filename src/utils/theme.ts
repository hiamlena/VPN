import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

import { ThemePreference } from '../types/app';

export const getPaperTheme = (theme: ThemePreference): MD3Theme =>
  theme === 'dark'
    ? {
        ...MD3DarkTheme,
        colors: {
          ...MD3DarkTheme.colors,
          primary: '#2f80ed',
          secondary: '#0f0f0f',
        },
      }
    : {
        ...MD3LightTheme,
        colors: {
          ...MD3LightTheme.colors,
          primary: '#2f80ed',
          secondary: '#f5f5f5',
        },
      };
