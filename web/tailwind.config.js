/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Roboto', 'sans-serif'], // Padrão do texto
                poppins: ['Poppins', 'sans-serif'], // Para títulos
                montserrat: ['Montserrat', 'sans-serif'], // Para destaques
            },
            colors: {
                brand: {
                    primary: '#00ADB5',
                    secondary: '#0A0F29',
                    accent: '#FF5722',
                    neutral: '#EEEEEE',
                },
            },
        },
    },
    plugins: [],
};
