import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';

const colors = {
  gray: {
    850: '#1A1F2B',
  },
};

const theme = extendTheme(
  {
    config: {
      initialColorMode: 'dark',
      useSystemColorMode: false,
    },
    styles: {
      global: {
        body: {
          bg: 'gray.900',
          color: 'gray.50',
        },
        '.markdown-body code': {
          padding: '0.2rem 0.3rem',
          background: 'rgba(255,255,255,0.06)',
          borderRadius: '6px',
          fontSize: '0.95em',
        },
        '.markdown-body pre': {
          background: '#111827',
          padding: '1rem',
          borderRadius: '10px',
          overflowX: 'auto',
        },
      },
    },
    fonts: {
      heading: 'Inter, system-ui, -apple-system, sans-serif',
      body: 'Inter, system-ui, -apple-system, sans-serif',
    },
    colors,
  },
  withDefaultColorScheme({ colorScheme: 'cyan' }),
);

export default theme;
