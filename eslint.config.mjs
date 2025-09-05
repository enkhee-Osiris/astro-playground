import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import astroEslintParser from "astro-eslint-parser";
import astro from "eslint-plugin-astro";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import importPlugin from "eslint-plugin-import";

export default [
  // Base ESLint recommended rules
  eslint.configs.recommended,

  // TypeScript ESLint recommended rules
  ...tsEslint.configs.recommended,

  // Astro recommended rules
  ...astro.configs.recommended,

  // Prettier config (must be last to override other formatting rules)
  prettierConfig,

  {
    // Global configuration
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      import: importPlugin,
      prettier,
    },
    rules: {
      // Prettier integration
      "prettier/prettier": "error",

      // TypeScript recommended rules
      ...tsEslint.configs.recommended.rules,
      ...tsEslint.configs["recommendedTypeCheckedOnly"].rules,

      // TypeScript specific rules
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-var-requires": "error",
      "@typescript-eslint/consistent-type-imports": "error",

      ...importPlugin.configs.recommended.rules,
      ...importPlugin.configs.typescript.rules,
      // Import ordering and organization
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-in modules
            "external", // npm packages
            "internal", // Internal modules (using tsconfig paths)
            "parent", // Parent directories
            "sibling", // Same directory
            "index", // Index files
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "import/no-unresolved": "off", // Turn off as it conflicts with Astro
      "import/no-unused-modules": "warn",
      "import/no-cycle": "error",
      "import/no-self-import": "error",

      // General JavaScript/TypeScript rules
      "no-console": "warn",
      "no-debugger": "error",
      "no-unused-vars": "off", // Turn off base rule
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],

      // Style rules (some will be handled by Prettier)
      "prefer-const": "error",
      "no-var": "error",
      "object-shorthand": "error",
      "prefer-template": "error",
    },
  },

  {
    // Configuration for TypeScript files
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsEslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    rules: {
      // TypeScript-specific rules for .ts/.tsx files
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },

  {
    // Configuration for Astro files
    files: ["**/*.astro"],
    languageOptions: {
      parser: astroEslintParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
        project: "./tsconfig.json",
      },
    },
    rules: {
      // Astro-specific rules
      "astro/no-conflict-set-directives": "error",
      "astro/no-unused-define-vars-in-style": "error",
      "astro/no-set-html-directive": "warn",
      "astro/semi": "off", // Let Prettier handle this

      // Prettier integration for Astro files
      "prettier/prettier": "error",

      // Disable some rules that don't work well with Astro
      "no-undef": "off",

      // Import rules for Astro files
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },

  {
    // Configuration for JavaScript files
    files: ["**/*.js", "**/*.mjs"],
    rules: {
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
    },
  },

  {
    // Ignore patterns
    ignores: [
      "dist/**",
      "node_modules/**",
      ".astro/**",
      "public/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
];
