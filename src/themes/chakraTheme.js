import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    950: '#172554',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006',
  },
  purple: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#a855f7',
    600: '#9333ea',
    700: '#7e22ce',
    800: '#6b21a8',
    900: '#581c87',
    950: '#3b0764',
  },
  teal: {
    50: '#f0fdfa',
    100: '#ccfbf1',
    200: '#99f6e4',
    300: '#5eead4',
    400: '#2dd4bf',
    500: '#14b8a6',
    600: '#0d9488',
    700: '#0f766e',
    800: '#115e59',
    900: '#134e4a',
    950: '#042f2e',
  },
  gray: {
    50: '#F5F5F5',
    100: '#EEEEEE',
    200: '#E0E0E0',
    300: '#BDBDBD',
    400: '#9E9E9E',
    500: '#757575',
    600: '#616161',
    700: '#424242',
    800: '#303030',
    900: '#212121',
  }
};

const chakraTheme = extendTheme({
  colors,
  fonts: {
    heading: '"Inter var", sans-serif',
    body: '"Inter var", sans-serif',
  },  components: {
    Stat: {
      baseStyle: {
        container: {
        },
        label: {
          color: 'gray.500',
          fontSize: 'sm',
          fontWeight: 'medium',
        },
        number: {
          color: 'gray.900',
          fontSize: '2xl',
          fontWeight: 'bold',
          _dark: {
            color: 'gray.50',
          },
        },
        helpText: {
          color: 'gray.500',
          fontSize: 'xs',
          _dark: {
            color: 'gray.400',
          },
        },
        icon: {
          mr: 1,
          fontSize: 'xs',
        }
      },
    },
  },
  styles: {
    global: (props) => ({
      body: {
        bg: mode('white', 'gray.900')(props),
        color: mode('gray.800', 'whiteAlpha.900')(props),
      },
      '.gradient-blue': {
        backgroundImage: 'linear-gradient(to right, blue.400, blue.600)',
      },
      '.gradient-green': {
        backgroundImage: 'linear-gradient(to right, green.400, green.600)',
      },
      '.gradient-red': {
        backgroundImage: 'linear-gradient(to right, red.400, red.600)',
      },
      '.gradient-purple': {
        backgroundImage: 'linear-gradient(to right, purple.400, purple.600)',
      },
    }),
  },
  styles: {
    global: (props) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.900')(props),
        bg: mode('white', 'gray.900')(props),
      }
    })
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      }
    },
    Stat: {
      baseStyle: {
        container: {
          p: 4,
          borderRadius: 'md',
        }
      }
    }
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }
});

export default chakraTheme;
