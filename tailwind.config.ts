import type { Config } from 'tailwindcss'

const config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
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
      height: {
        header: 'var(--header-h)',
      },

      minHeight: {
        main: 'calc(90vh - var(--header-h))',
      },

      fontFamily: {
        sans: ['var(--font-nanum)'],
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
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config

export default config
