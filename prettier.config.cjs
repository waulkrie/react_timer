/** @type {import("prettier").Config} */
const config = {
  printWidth: 120,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  plugins: [require.resolve('prettier-plugin-tailwindcss')],
};

module.exports = config;
