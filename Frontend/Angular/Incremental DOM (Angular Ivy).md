# Incremental DOM (Angular Ivy)

O **Incremental DOM** **não mantém uma cópia completa do DOM em memória**. Em vez disso, ele **percorre o template** e **aplica mudanças diretamente no DOM**, usando **instruções incrementais**.

Cada componente é compilado em um conjunto de **instruções de atualização** (ex.: `elementStart()`, `text()`, `elementEnd()`).

✅ **Menor consumo de memória** – Não duplica a árvore DOM, apenas atualiza o necessário.  
✅ **Bundle size reduzido** – Gera menos código após a compilação (Ivy é mais eficiente que View Engine).  
✅ **Melhor SSR (Server-Side Rendering)** – Hidratação mais eficiente, pois não precisa recriar o Virtual DOM.  
✅ **Tree-shaking mais eficaz** – Remove código não utilizado automaticamente.
❌ **Pode ser menos eficiente em atualizações massivas** – Sem um Virtual DOM, algumas otimizações dependem do desenvolvedor.  
❌ **Curva de aprendizado** – Entender como o Ivy compila templates pode ser complexo.

Casos de uso

- O projeto **tamanho do bundle**. 
- Quer **menos abstração** e mais controle sobre o DOM real.
