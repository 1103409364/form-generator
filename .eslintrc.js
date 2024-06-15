module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
    browser: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', '@vue/eslint-config-prettier'],
  parserOptions: {
    ecmaVersion: '6',
    sourceType: 'module',
    parser: '@babel/eslint-parser', // 使用babel解析器才能支持 jsx
    // "requireConfigFile": false,
    ecmaFeatures: {
      // 支持装饰器
      // "legacyDecorators": true,
      jsx: true, // 支持jsx
    },
  },
  plugins: ['vue'],
  rules: {
    // camelcase: 2, // 驼峰命名
    // 'no-console': 1,
    'no-debugger': 1,
    'prettier/prettier': ['error', { semi: true }],
    'vue/no-v-html': 0,
    'vue/no-mutating-props': 0, // props 不可修改
    'vue/multi-word-component-names': 0,
    'vue/require-prop-types': 0, // props 类型必填
    'vue/component-name-in-template-casing': [
      'error',
      'kebab-case',
      {
        registeredComponentsOnly: false,
        ignores: [],
      },
    ], // dom 模板中组件名 kebab-case
    // "vue/name-property-casing": ["error", "PascalCase"], //组件名PascalCase
    // "vue/match-component-file-name": [
    //   "error",
    //   { "extensions": ["vue"], "shouldMatchCase": true }
    // ], //要求组件name属性匹配其文件名
    'vue/prop-name-casing': ['error', 'camelCase'], //组件内 props camelCase
    'vue/this-in-template': ['error', 'never'], //不要在模版中使用this
    // 'vue/custom-event-name-casing': ['error', 'kebab-case'], //自定义事件名称始终使用kebab-case(短横线命名)
    'vue/attribute-hyphenation': ['error', 'always', { ignore: [] }], //标签属性名称始终使用kebab-case(短横线命名)
    // "vue/html-self-closing": 0, // 标签自动闭合
    'vue/attributes-order': [
      'error',
      {
        order: [
          'DEFINITION',
          'LIST_RENDERING',
          'CONDITIONALS',
          'RENDER_MODIFIERS',
          'GLOBAL',
          'UNIQUE',
          'TWO_WAY_BINDING',
          'OTHER_DIRECTIVES',
          'OTHER_ATTR',
          'EVENTS',
          'CONTENT',
        ],
      },
    ], //标签属性、指令排序
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: { jest: true },
    },
  ],
};
