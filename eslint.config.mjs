import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Next.js 15 config in ESLint 9 flat format (`next lint` reads this file)
const compat = new FlatCompat({ baseDirectory: dirname(fileURLToPath(import.meta.url)) });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Brand copy uses plain apostrophes and quotes (e.g. BrandStory.tsx, kept as is by decision); React renders them fine
      "react/no-unescaped-entities": "off",
    },
  },
  {
    ignores: ["node_modules/**", ".next/**", "out/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
