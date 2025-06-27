
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'gradient-x': {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center'
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.3s ease-out',
				'gradient-x': 'gradient-x 15s ease infinite'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			typography: {
				DEFAULT: {
					css: {
						maxWidth: 'none',
						color: 'hsl(var(--muted-foreground))',
						'[class~="lead"]': {
							color: 'hsl(var(--muted-foreground))',
						},
						a: {
							color: 'hsl(var(--primary))',
							textDecoration: 'underline',
							fontWeight: '500',
						},
						strong: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600',
						},
						'ol[type="A"]': {
							'--list-counter-style': 'upper-alpha',
						},
						'ol[type="a"]': {
							'--list-counter-style': 'lower-alpha',
						},
						'ol[type="A" s]': {
							'--list-counter-style': 'upper-alpha',
						},
						'ol[type="a" s]': {
							'--list-counter-style': 'lower-alpha',
						},
						'ol[type="I"]': {
							'--list-counter-style': 'upper-roman',
						},
						'ol[type="i"]': {
							'--list-counter-style': 'lower-roman',
						},
						'ol[type="I" s]': {
							'--list-counter-style': 'upper-roman',
						},
						'ol[type="i" s]': {
							'--list-counter-style': 'lower-roman',
						},
						'ol[type="1"]': {
							'--list-counter-style': 'decimal',
						},
						'ol > li': {
							position: 'relative',
						},
						'ol > li::marker': {
							fontWeight: '400',
							color: 'hsl(var(--muted-foreground))',
						},
						'ul > li': {
							position: 'relative',
						},
						'ul > li::marker': {
							color: 'hsl(var(--muted-foreground))',
						},
						hr: {
							borderColor: 'hsl(var(--border))',
							borderTopWidth: 1,
						},
						blockquote: {
							fontWeight: '500',
							fontStyle: 'italic',
							color: 'hsl(var(--foreground))',
							borderLeftWidth: '0.25rem',
							borderLeftColor: 'hsl(var(--border))',
							quotes: '"\\201C""\\201D""\\2018""\\2019"',
						},
						h1: {
							color: 'hsl(var(--foreground))',
							fontWeight: '800',
						},
						h2: {
							color: 'hsl(var(--foreground))',
							fontWeight: '700',
						},
						h3: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600',
						},
						h4: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600',
						},
						'figure figcaption': {
							color: 'hsl(var(--muted-foreground))',
						},
						code: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600',
						},
						'a code': {
							color: 'hsl(var(--foreground))',
						},
						pre: {
							color: 'hsl(var(--muted-foreground))',
							backgroundColor: 'hsl(var(--muted))',
							overflowX: 'auto',
						},
						'pre code': {
							backgroundColor: 'transparent',
							borderWidth: '0',
							borderRadius: '0',
							padding: '0',
							fontWeight: '400',
							color: 'inherit',
							fontSize: 'inherit',
							fontFamily: 'inherit',
							lineHeight: 'inherit',
						},
						table: {
							width: '100%',
							tableLayout: 'auto',
							textAlign: 'left',
							marginTop: '2em',
							marginBottom: '2em',
							fontSize: '0.875em',
							lineHeight: '1.7142857',
						},
						thead: {
							color: 'hsl(var(--foreground))',
							fontWeight: '600',
							borderBottomWidth: '1px',
							borderBottomColor: 'hsl(var(--border))',
						},
						'thead th': {
							verticalAlign: 'bottom',
							paddingRight: '0.5714286em',
							paddingBottom: '0.5714286em',
							paddingLeft: '0.5714286em',
						},
						'tbody tr': {
							borderBottomWidth: '1px',
							borderBottomColor: 'hsl(var(--border))',
						},
						'tbody tr:last-child': {
							borderBottomWidth: '0',
						},
						'tbody td': {
							verticalAlign: 'baseline',
						},
						tfoot: {
							borderTopWidth: '1px',
							borderTopColor: 'hsl(var(--border))',
						},
						'tfoot td': {
							verticalAlign: 'top',
						},
					},
				},
			}
		}
	},
	plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
