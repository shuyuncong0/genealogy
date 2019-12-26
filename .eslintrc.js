// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  // required to lint *.vue files
  plugins: ['vue', 'html'],
  // add your custom rules here
  rules: {
    'no-extra-parens': 'error', //禁止不必要的括号
    'no-extra-semi': 'error', //禁止不必要的分号
    eqeqeq: 'error', //要求使用 === 和 !==
    'no-multi-spaces': 'error', //禁止使用多个空格
    'no-undef': 'off', // 不能有未定义的变量
    'no-console': 'off', // 使用console
    quotes: ['error', 'single'], //强制使用单引号
    semi: ['error', 'never'], //强制不使用分号结尾
    'no-unused-expressions': 'off', // 禁止无用的表达式
    'generator-star-spacing': 'off', // 生成器函数*的前后空格
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off' // 禁止使用debugger
  }
}
