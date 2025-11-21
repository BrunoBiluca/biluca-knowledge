# Vitest - Configurações

## Caminhos absolutos

Por padrão o Vite não utiliza a configuração para caminhos absolutos definida no `tsconfig.json`, para isso é necessário definir essa mesma configuração no `vite.config.ts`.

Uma forma de fazer essa configuração é utilizando a biblioteca [vite-tsconfig-paths](https://www.npmjs.com/package/vite-tsconfig-paths).

## Extensão Vitest (VSCode) dentro de containers

A extensão do Vitest precisa de estar no mesmo ambiente que o projeto para conseguir encontrar os testes.

Quando utilizamos ferramentas de conteinerização como Toolbox, Podman ou Docker é necessário executar o [[VSCode]] dentro do ambiente do container para que ele encontre os testes.

## Configuração do modo Browser

[Documentação do modo Browser](https://vitest.dev/guide/browser/)

Para alguns sistemas é necessário aplicar alguns outros passos:

```shell
npx playwright install

npx playwright install-deps
```

> [!warning] Limitações em alguns ambientes
> Não foi possível utilizar o modo browser no [[Fedora Silverblue]], para isso foi necessário criar um container utilizando como base o Ubuntu.