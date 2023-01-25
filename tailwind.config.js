/** @type {import('tailwindcss').Config} */
module.exports = {
	purge: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/layout/**/*.{js,ts,jsx,tsx}"],
	content: ["./src/pages/**/*.{js,ts,jsx,tsx}", "./src/components/**/*.{js,ts,jsx,tsx}", "./src/layout/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				primary: ["Poppins", "sans-serif"],
				secondary: ["Roboto", "sans-serif"],
				tertiary: ["Manrope", "sans-serif"],
			},
		},
	},
	plugins: [],
};
