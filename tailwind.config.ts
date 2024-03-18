import type { Config } from 'tailwindcss'
import plugin from 'tailwindcss/plugin'

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      minHeight: {
        main: 'calc(100vh - var(--header-h))',
      },

      height: {
        header: 'var(--header-h)',
      },

      textShadow: {
        bounce: `0 1px 0 #CCC,
                 0 2px 0 #CCC,
                 0 3px 0 #CCC,
                 0 4px 0 #CCC,
                 0 5px 0 transparent,
                 0 6px 0 transparent,
                 0 7px 0 transparent,
                 0 8px 0 transparent,
                 0 9px 10px rgba(0, 0, 0, .4)`,

        sm: '1px 1px 2px var(--tw-shadow-color)',
        DEFAULT: '2px 2px 4px var(--tw-shadow-color)',
        lg: '4px 4px 8px var(--tw-shadow-color)',
        xl: '4px 4px 16px var(--tw-shadow-color)',
      },

      animationDelay: {
        1: '1000ms',
        2: '2000ms',
        3: '3000ms',
        4: '4000ms',
        5: '5000ms',
        6: '6000ms',
        7: '7000ms',
        8: '8000ms',
        9: '9000ms',
        10: '10000ms',
      },

      fontFamily: {
        sans: ['var(--font-nanum)'],
        dunggeunmo: ['DungGeunMo'],
      },

      colors: {
        app: {
          'blue-001': 'var(--app-blue-001)',
          'blue-002': 'var(--app-blue-002)',

          'gray-001': 'var(--app-gray-001)',
          'gray-002': 'var(--app-gray-002)',
          'gray-003': 'var(--app-gray-003)',
          'gray-004': 'var(--app-gray-004)',
          'gray-005': 'var(--app-gray-005)',
          'gray-006': 'var(--app-gray-006)',
          'gray-007': 'var(--app-gray-007)',
          'gray-010': 'var(--app-gray-010)',

          'yellow-001': 'var(--app-yellow-001)',
          'yellow-002': 'var(--app-yellow-002)',
          'yellow-003': 'var(--app-yellow-003)',

          'pink-001': 'var(--app-pink-001)',
          'pink-002': 'var(--app-pink-002)',

          red: 'var(--app-red)',
          placeholder: 'var(--app-placeholder)',
        },

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'bounce-bounce': {
          '0%': { top: '0' },
          '100%': {
            top: '-10px',
            'text-shadow': `0 1px 0 #CCC,
            0 2px 0 #CCC,
            0 3px 0 #CCC,
            0 4px 0 #CCC,
            0 5px 0 #CCC,
            0 6px 0 #CCC,
            0 7px 0 #CCC,
            0 8px 0 #CCC,
            0 9px 0 #CCC,
            0 20px 8px rgba(0, 0, 0, .2)`,
          },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'bounce-bounce': 'bounce-bounce 0.3s ease infinite alternate',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),

    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        {
          values: theme('textShadow'),
        },
      )
    }),

    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value,
            }
          },
        },
        {
          values: theme('transitionDelay'),
        },
      )
    }),
  ],
} satisfies Config

export default config
