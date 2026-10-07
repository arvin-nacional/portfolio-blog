import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import tailwindcss from "eslint-plugin-tailwindcss";
import prettier from "eslint-config-prettier";
import { fixupPluginRules } from "@eslint/compat";

export default defineConfig([
  ...nextVitals,
  {
    plugins: { tailwindcss: fixupPluginRules(tailwindcss) },
    rules: tailwindcss.configs.recommended.rules,
  },
  {
    // Keep new compiler diagnostics visible while migrating existing components.
    // The React Compiler is not enabled in this project.
    files: ["**/*.{js,jsx,mjs,ts,tsx,mts,cts}"],
    rules: {
      "react-hooks/refs": "warn",
      "react-hooks/immutability": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  prettier,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);
