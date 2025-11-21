# Vitest

> [!info] Links relacionados
> - [Documentação](https://vitest.dev/guide/)
> - [Documentação auxiliar para testes de componentes](https://vitest.dev/guide/browser/component-testing.html)
> - [Extensão do VSCode](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)

Vitest é uma alternativa para Test Runner que visa ser mais simples e performático, mantendo todas as configurações nativas do projeto com [[Vite]] (a partir do `vite.config.ts`). Fornece uma API compatível com [[Jest]], permitindo assim uma curva de aprendizado muito rápida para usuários dessa tecnologia.

Para melhores práticas na criação de testes seguir o indicado em [[Guia para desenvolvimento Web]].

## Modo Browser

O [[Frontend/Vite/Vitest|Vitest]] recomenda desenvolver os testes aplicados ao modo Browser, dessa forma é possível ter uma ambiente mais próximo que o real, já que os testes estão sendo executados diretamente em um browser.

Funcionalidades:

- Renderização a partir do ambiente mais próximo do real
- Performance é melhor que testes executados em ambientes node.js como [[React Testing Library]]

## Migração de outros frameworks

### [[Jest]] + [[React Testing Library]]

Como a maioria da API é similar é possível fazer a migração apenas mudando o caminho de importação.

```
// Before (Jest)
import { render, screen } from '@testing-library/react'

// After (Vitest)
import { render } from 'vitest-browser-react'
```