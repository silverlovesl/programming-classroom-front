module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true
  },
  // add your custom rules here
  'rules': {
    'space-before-function-paren': 'off',
    // allow async-await
    'generator-star-spacing': 'off',

    // allow paren-less arrow functions
    "spaced-comment": 0,
    "no-trailing-spaces": 0,
    'eol-last': 0,
    'func-call-spacing': 0,
    'no-spaced-func': 0,
    'indent': 0,
    'arrow-parens': 0,
    'one-var': 0,
    "quotes": 0,
    "semi": 0,
    'eqeqeq': 0,
    'no-extra-boolean-cast': 0,
    "no-unused-vars": 0,
    "no-multiple-empty-lines": 0,
    'no-parsing-error': 0,
    'import/first': 0,
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/extensions': 0,
    'import/no-unresolved': 0,
    'import/no-extraneous-dependencies': 0,

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
