# Vitest - Configurações

## Caminhos absolutos

Por padrão o Vite não utiliza a configuração para caminhos absolutos definida no `tsconfig.json`, para isso é necessário definir essa mesma configuração no `vite.config.ts`.

Uma forma de fazer essa configuração é utilizando a biblioteca [vite-tsconfig-paths](https://www.npmjs.com/package/vite-tsconfig-paths).