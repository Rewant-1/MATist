/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    // Use the new PostCSS plugin package for Tailwind
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;
