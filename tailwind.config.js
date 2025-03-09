import {heroui} from "@heroui/react";
/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",

		// Or if using `src` directory:
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
		"./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}"
	],
	theme: {
		extend: {
			fontFamily: {
				'cera': ['"Cera Pro Regular"', 'sans-serif'],
			},
			colors: {
				primary: '#1aa683',
				secondary: '#ccc',
			},
			screens: {
				xs: '480px',
				md: '768px',
				xl: '1000px',
				"2xl": '1200px',
			},
		},
	},
	darkMode: "class",
	plugins: [heroui()]
}

