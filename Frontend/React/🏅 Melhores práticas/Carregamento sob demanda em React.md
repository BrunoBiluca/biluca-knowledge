# Carregamento sob demanda em React

Descrição do problema: [[Carregamento sob demanda]].

Em [[React]] já existe uma função nativa para carregar módulos sob demanda, chamada `lazy`.

Principais aplicações:

- Páginas/rotas inteiras
- Modais e pop-ups
- Componentes "pesados" que ficam abaixo da dobra (rodapé complexo, carrosséis, tabelas)
- Bibliotecas de terceiros
- Painéis de Administração

## Exemplo de uso

Para o caso das rotas podemos fazer:

```tsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Sobre = lazy(() => import('./pages/Sobre'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Configuracoes = lazy(() => import('./pages/Configuracoes'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Carregando página...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/config" element={<Configuracoes />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
```

Cada uma das páginas só será carrega quando for requisitada pelo cliente. Essa é uma melhoria grande caso o usuário não utilize a página de Dashboard que pode utilizar pacotes de terceiros "pesados" para exibição de gráficos.

## Avaliação do Build

Para avaliar o build gerado do projeto podemos fazer:

1. Rode `npm run build` no seu projeto.
   
2. Instale e rode o **`@next/bundle-analyzer`** (se for [[Next.js]]) ou o **`webpack-bundle-analyzer`** (se for [[Vite]]).

3. Olhe o relatório visual.
   
4. Veja os blocos **laranjas/vermelhos** (os maiores).

5. Caso o bloco for maior que o desejado (~30 KB é um bom valor de referência), ele já é um ótimo candidato para lazy loading.