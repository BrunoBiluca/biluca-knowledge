# Babel

O Babel é um **transpilador** (converte código moderno em versões compatíveis com navegadores antigos) que converte JSX e permite suporta a Javascript moderno.

O Babel pode aplicar otimizações durante a transpilação:

- **Suporte a navegadores antigos** que não suportam ES6+ (como é o caso do IE11)

- **Remoção de código morto (dead code elimination):**  
    Se você tem um componente que não é usado, o Babel pode removê-lo no build final (especialmente com ferramentas como **Webpack** + **Babel**).

- **Minificação e melhorias de performance:**  
    Alguns plugins do Babel simplificam o JSX para melhorar a renderização.

O Babel é parte essencial do fluxo de desenvolvimento moderno:

- **Webpack, [[Vite]], [[Next.js]]:** Todas essas ferramentas usam o Babel internamente para processar JSX e JavaScript moderno.
    
- **HMR (Hot Module Replacement):**  
    O Babel trabalha com ferramentas de dev server para atualizar o código em tempo real.