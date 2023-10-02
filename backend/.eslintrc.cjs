module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:prettier/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "plugins": [
        "prettier",
        "@typescript-eslint"
    ],
    "overrides": [
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    ignorePatterns: ["node_modules", "build", "dist", "public", ".eslintrc.cjs"],
    "rules": {
        "no-undef": "off",
        "prettier/prettier": "error",
        "no-unused-vars": "off",
        "no-console": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-explicit-any": "error",
        "@typescript-eslint/no-unused-vars": "warn"
    }
}