module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard'],
    overrides: [],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: ['off'],
        quotes: ['error', 'single'],
        semi: ['error', 'never'],
        'no-console': 'warn',
        'space-before-function-paren': ['off'],
        'multiline-ternary': ['off']
    }
}
