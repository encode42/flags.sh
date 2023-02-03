module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "tsconfigRootDir": __dirname,
        "project": ["./tsconfig.json"],
        "ecmaVersion": 2021,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "plugins": [
        "@typescript-eslint",
        "eslint-plugin-tsdoc",
        "html",
        "@html-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsonc/auto-config",
        "plugin:markdown/recommended",
        "plugin:security/recommended",
        "plugin:sonarjs/recommended",
        "plugin:unicorn/recommended",
        "plugin:promise/recommended",
        "plugin:import/recommended",
        "plugin:react/recommended",
        "plugin:qwik/recommended",
        "plugin:jsx-secure-form/recommended",
        "plugin:xss/recommended"
    ],
    "rules": {
        "arrow-parens": ["error", "as-needed"],
        "block-spacing": ["error", "never"],
        "brace-style": "off",
        "curly": "off",
        "complexity": "off",
        "eol-last": ["error", "always"],
        "eqeqeq": "warn",
        "func-call-spacing": ["error", "never"],
        "handle-callback-err": "off",
        "indent": ["error", 4, {
            "SwitchCase": 1,
            "MemberExpression": "off",
            "flatTernaryExpressions": true
        }],
        "key-spacing": "off",
        "multiline-ternary": "off",
        "no-case-declarations": "off",
        "no-console": "off",
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "no-multi-spaces": "off",
        "no-prototype-builtins": "off",
        "no-return-assign": "off",
        "no-self-assign": "off",
        "no-tabs": "off",
        "no-undef": "warn",
        "no-unused-expressions": "warn",
        "no-unused-vars": "off",
        "one-var": "off",
        "quote-props": ["error", "consistent"],
        "quotes": ["error", "double", {
            "allowTemplateLiterals": true
        }],
        "prefer-spread": 'off',
        "security/detect-non-literal-fs-filename": "off",
        "security/detect-non-literal-regexp": "off",
        "security/detect-non-literal-require": "off",
        "security/detect-object-injection": "off",
        "security/detect-unsafe-regex": "off",
        "semi-spacing": ["error", {
            "before": false,
            "after": true
        }],
        "semi-style": ["error", "last"],
        "semi": ["error", "always", {
            "omitLastInOneLineBlock": true
        }],
        "space-before-function-paren": ["off"],
        "import/named": "off",
        "import/no-unresolved": "off",
        "sonarjs/cognitive-complexity": "off",
        "sonarjs/no-duplicate-string": ["error", 5],
        "sonarjs/no-nested-template-literals": "off",
        "unicorn/catch-error-name": "off",
        "unicorn/filename-case": "off",
        "unicorn/no-array-for-each": "off",
        "unicorn/no-nested-ternary": "off",
        "unicorn/no-null": "off",
        "unicorn/no-process-exit": "off",
        "unicorn/numeric-separators-style": "off",
        "unicorn/prefer-node-protocol": "off",
        "unicorn/prefer-number-properties": "off",
        "unicorn/prefer-query-selector": "off",
        "unicorn/prefer-ternary": "warn",
        "unicorn/prevent-abbreviations": "off",
        "unicorn/no-static-only-class": "off",
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-imports": "error",
        "react/no-unknown-property": ["error", {
            "ignore": [
                "class",
                "onChange$",
                "onInput$",
                "onClick$"
            ]
        }],
        "react/react-in-jsx-scope": "off",
        "react/no-unescaped-entities": "warn",
        "react/destructuring-assignment": "error",
        "react/no-access-state-in-setstate": "warn",
        "react/no-danger": "warn",
        "react/hook-use-state": "off",
        "react/no-invalid-html-attribute": "error",
        "react/no-namespace": "error",
        "react/no-this-in-sfc": "error",
        "react/no-unsafe": "error",
        "react/sort-comp": "error",
        "react/jsx-boolean-value": ["error", "never"],
        "react/jsx-child-element-spacing": "warn",
        "react/jsx-closing-bracket-location": ["error", "after-props"],
        "react/jsx-curly-brace-presence": ["error", "never"],
        "react/jsx-curly-newline": "error",
        "react/jsx-curly-spacing": "error",
        "react/jsx-equals-spacing": ["error", "never"],
        "react/jsx-filename-extension": ["error", {
            "extensions": [".jsx", ".tsx"]
        }],
        "react/jsx-first-prop-new-line": ["error", "never"],
        "react/jsx-handler-names": "error",
        "react/jsx-indent": "error",
        "react/jsx-newline": ["error", {
            "prevent": true
        }],
        "react/jsx-no-constructed-context-values": "error",
        "react/jsx-one-expression-per-line": "off",
        "react/jsx-pascal-case": "error",
        "react/jsx-props-no-multi-spaces": "error",
        "react/jsx-tag-spacing": ["error", {
            "closingSlash": "never",
            "beforeSelfClosing": "never",
            "afterOpening": "never",
            "beforeClosing": "never"
        }],
        "react/jsx-wrap-multilines": "error"
    },
    "settings": {
        "import/parsers": {
            "@typescript-eslint/parser": [".ts"]
        },
        "import/resolver": {
            "node": {
                "extensions": [".js", ".ts"]
            }
        }
    },
    "overrides": [{
        "files": ["*.html"],
        "parser": "@html-eslint/parser",
        "extends": ["plugin:@html-eslint/recommended"]
    }],
    "ignorePatterns": ["!.*", "!node_modules/*"]
}
