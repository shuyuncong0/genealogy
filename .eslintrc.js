// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: "babel-eslint"
  },
  env: {
    browser: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  // required to lint *.vue files
  plugins: ["vue", "html"],
  // add your custom rules here
  rules: {
    "eslintIntegration": true,
    "no-console": "off"
  }
};