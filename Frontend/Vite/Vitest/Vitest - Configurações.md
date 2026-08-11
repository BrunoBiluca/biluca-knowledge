# Vitest - Configurações

- [[Configuração do modo Browser]]

Para mais informações sobre problemas na configuração do [[Frontend/Vite/Vitest/Vitest|Vitest]] seguir a documentação [Common Errors](https://vitest.dev/guide/common-errors).

## Caminhos absolutos

Por padrão o [[Vite]] não utiliza a configuração para caminhos absolutos definida no `tsconfig.json`, para isso é necessário definir essa mesma configuração no `vite.config.ts`.

Uma forma de fazer essa configuração é utilizando a biblioteca [vite-tsconfig-paths](https://www.npmjs.com/package/vite-tsconfig-paths).

## Extensão Vitest (VSCode) dentro de containers

A extensão do Vitest ([link](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)) precisa de estar no mesmo ambiente que o projeto para conseguir encontrar os testes.

Quando utilizamos ferramentas de conteinerização como Toolbox, Podman ou Docker é necessário executar o [[VSCode]] dentro do ambiente do container para que ele encontre os testes.

## Exemplo de `vitest.config.ts`

Esse é um exemplo utilizado no projeto [[Projeto - Biblioteca de Jogos]].

```js
// vitest.config.ts
/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [angular(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
  },
});

```

Ele já está definindo a utilização dos caminhos absolutos definido no `tsconfig.json`.

Ele define também o caminho para o script que irá configurar todos os arquivos de testes na propriedade `setupFiles`.

```js
// test-setup.ts
import '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

TestBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting());
```