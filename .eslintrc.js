module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
    },
    overrides: [
        {
            files: ['*.js'],
            env: {
                node: true,
                jest: true,
            },
        },
        {
            files: ['**/__tests__/*.*'],
            rules: {
                // safely ignore all the a11y rules in tests
                'jsx-a11y/no-autofocus': 'off',
                'jsx-a11y/aria-role': 'off',
            },
        },
    ],
    extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended', 'prettier', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ['react', 'jsx-a11y', 'prettier'],
    settings: {
        react: {
            pragma: 'React',
            version: '16.14.0',
        },
    },
    rules: {
        // custom
        eqeqeq: ['error', 'always', { null: 'ignore' }],
        'no-invalid-this': 'error',

        // a11y
        'jsx-a11y/no-static-element-interactions': 'off', // 18
        'jsx-a11y/click-events-have-key-events': 'off', // 16
        'jsx-a11y/no-autofocus': 'off', // 11
        'jsx-a11y/anchor-is-valid': 'off', // 6
        'jsx-a11y/no-noninteractive-tabindex': 'off', // 4
        'jsx-a11y/role-has-required-aria-props': 'off', // 3
        'jsx-a11y/aria-activedescendant-has-tabindex': 'off', // 2
        'jsx-a11y/mouse-events-have-key-events': 'off', // 2
        'jsx-a11y/interactive-supports-focus': 'off', // 1

        'react/no-unsafe': ['warn', { checkAliases: true }],
    },
};
