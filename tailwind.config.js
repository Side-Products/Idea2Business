/** @type {import('tailwindcss').Config} */
// const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
	mode: "jit",
	purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/layout/**/*.{js,ts,jsx,tsx}"],
	content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/layout/**/*.{js,ts,jsx,tsx}"],
	theme: {
		// screens: {
		// 	xs: "500px",
		// 	smd: "760px",
		// 	...defaultTheme.screens,
		// },
		extend: {
			animation: {
				text: "text 5s ease infinite",
				bg: "text 4s ease infinite",
				marquee: "marquee 10s linear infinite",
				marquee2: "marquee2 10s linear infinite",
				slowSpin: "slowSpin 100s ease infinite",
			},
			keyframes: {
				text: {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
				bg: {
					"0%, 100%": {
						"background-size": "200% 200%",
						"background-position": "left center",
					},
					"50%": {
						"background-size": "200% 200%",
						"background-position": "right center",
					},
				},
				marquee: {
					"0%": { transform: "translateX(0%)" },
					"100%": { transform: "translateX(-100%)" },
				},
				marquee2: {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0%)" },
				},
				slowSpin: {
					to: { transform: "rotate(360deg)" },
				},
			},
			colors: {
				primary: {
					100: "#e0f2f1",
					200: "#b2dfdb",
					300: "#80cbc4",
					400: "#4db6ac",
					500: "#26a69a",
					600: "#009688",
					700: "#00897b",
					800: "#00796b",
					900: "#00695c",
				},
				// Deep Orange
				// primary: {
				// 	100: "#ffccbc",
				// 	200: "#ffab91",
				// 	300: "#ff8a65",
				// 	400: "#ff7043",
				// 	500: "#ff5722",
				// 	600: "#f4511e",
				// 	700: "#e64a19",
				// 	800: "#d84315",
				// 	900: "#bf360c",
				// },
				// MXV Green
				// primary: {
				// 	100: "#E2F0D9",
				// 	200: "#C3DFAC",
				// 	300: "#79CA25",
				// 	400: "#68BE0F",
				// 	500: "#5AB510",
				// 	600: "#479E00",
				// 	700: "#1E7F2D",
				// 	800: "#1D7321",
				// 	900: "#165E20",
				// },
				light: {
					100: "#FFFFFF",
					200: "#F6F6F6",
					300: "#D7E0DF",
					400: "#D9D9D9",
					500: "#BFBFBF",
					600: "#A6A6A6",
					700: "#7F7F7F",
					800: "#595959",
					900: "#404040",
				},
				dark: {
					100: "#7F7F7F",
					200: "#595959",
					300: "#404040",
					400: "#363636",
					500: "#2A2A2A",
					600: "#1D1D1D",
					700: "#181818",
					800: "#131313",
					900: "#0e0e0e",
					1000: "#080808",
				},
				info: {
					100: "#C2D0F2",
					200: "#89A5E3",
					300: "#3F6FD9",
					400: "#2C5ECD",
					500: "#144CC7",
				},
				warning: {
					100: "#FFF2CC",
					200: "#FFE699",
					300: "#FFD966",
					400: "#FFC000",
					500: "#F79A11",
				},
				success: {
					100: "#E6F9F1",
					200: "#83E0B8",
					300: "#4FE3A3",
					400: "#1FC87F",
					500: "#06C270",
				},
				error: {
					100: "#FCE2DD",
					200: "#F6A69B",
					300: "#F47564",
					400: "#F05E4B",
					500: "#EE4D37",
					600: "#e33720",
					700: "#d92911",
				},
				nav: {
					light: "rgba(255, 255, 255, 0.4)",
					dark: "rgba(19, 19, 19, 0.4)",
				},
				search: {
					100: "#E8E8E8",
					200: "#292929",
					300: "#B2B2B2",
				},
			},
			fontFamily: {
				primary: ["Inter", "sans-serif"],
				secondary: ["Poppins", "sans-serif"],
				tertiary: ["Roboto", "sans-serif"],
				plaster: ["Plaster", "sans-serif"],
				ter2: ["Manrope", "sans-serif"],
			},
			fontSize: {
				countdownHeroMobileHeading: "clamp(2rem, -0.5rem + 12.5vw, 2.5rem)",
			},
		},
	},
	plugins: [],
};
