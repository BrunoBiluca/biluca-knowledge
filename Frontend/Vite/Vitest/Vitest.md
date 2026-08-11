# Vitest

> [!info] Links relacionados
> - [Documentação](https://vitest.dev/guide/)
> - [Documentação auxiliar para testes de componentes](https://vitest.dev/guide/browser/component-testing.html)
> - [Extensão do VSCode](https://marketplace.visualstudio.com/items?itemName=vitest.explorer)

Vitest é uma alternativa para Test Runner que visa ser mais simples e performático, mantendo todas as configurações nativas do projeto com [[Vite]] (a partir do `vite.config.ts`). Fornece uma API compatível com [[Jest]], permitindo assim uma curva de aprendizado muito rápida para usuários dessa tecnologia.

Para melhores práticas na criação de testes seguir o indicado em [[Guia para desenvolvimento Web]].

Assuntos de interesse:

- [[Vitest - Configurações]]
- [[Migração de outros frameworks]]

## Modo Browser

O [[Frontend/Vite/Vitest/Vitest|Vitest]] recomenda desenvolver os testes aplicados ao modo Browser, dessa forma é possível ter uma ambiente mais próximo que o real, já que os testes estão sendo executados diretamente em um browser.

Funcionalidades:

- Renderização a partir do ambiente mais próximo do real
- Performance é melhor que testes executados em ambientes node.js como [[React Testing Library]]

Os testes criados em modo browser visam principalmente verificar a aplicação a partir da sua camada semântica utilizando principalmente `roles` como localizadores dos elementos. Isso segue o padrão semântico defendido pela Mozilla na criação de aplicações web, garantindo que ferramentas de acessibilidade sejam utilizadas com eficiência. Mais informações [ARIA Guides](https://developer.mozilla.org/pt-BR/docs/Web/Accessibility/ARIA/Guides/Techniques).