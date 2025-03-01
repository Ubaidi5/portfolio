import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [".next", "node_modules", "public"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowTernary: true, allowShortCircuit: true }, // Ternary operator and short circuit evaluation are flagged as unused expressing by typescript that's why we need to allow these to be used in the code. Otherwise eslint will ask to remove these operators.
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-empty-function": "off",
      "react/jsx-uses-react": "off", // Should turned off in React version 17 or higher
      "react/react-in-jsx-scope": "off", // Should turned off in React version 17 or higher
      "react/prop-types": "off", // Disable react prop type checking. Not required because we are using typescript
      "react/no-unescaped-entities": "off", // Allow us to use ' instead of &apos;
      "react-hooks/exhaustive-deps": "off", // When on this rule will enforce to add variables as dependencied that are used inside useEffect
    },
  },
];

export default eslintConfig;
