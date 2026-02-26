# Configuração do modo Browser

[Documentação do modo Browser](https://vitest.dev/guide/browser/)

Para alguns sistemas é necessário aplicar alguns outros passos:

```shell
npx playwright install --with-deps chromium
```

> [!warning] Limitações em alguns ambientes
> Não foi possível utilizar o modo browser no [[Fedora Silverblue]], para isso foi necessário criar um container utilizando como base o Ubuntu.

```ts
// vitest.browser.config.ts
import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: "chromium" }],
    },
  },
});
```