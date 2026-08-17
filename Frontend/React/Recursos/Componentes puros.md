# Componentes puros

**Componentes puros** são componentes que **só renderizam novamente se suas props ou estado mudarem**, evitando re-renders desnecessários e melhorando a performance. Eles são otimizados para evitar atualizações quando os dados de entrada são os mesmos.

- **Class Component:** Estende `React.PureComponent` (faz comparação superficial de `props` e `state`).
- **Functional Component:** Usa `React.memo()` (memoriza o componente com base nas props).
	- Permite também faz a verificação das props de forma customizada

Eles não são re-renderizados automaticamente se o componente pai for re-renderizado. São uma alternativa muito boa para utilizar em renderização de listas, formulários e outros tipos de componentes que não tem suas propriedades e estado alterados frequentemente.

✅ **Casos ideais:**

1. **Componentes que recebem props imutáveis:**
    - Se as props não mudam frequentemente, evita re-renders.
        
2. **Listas grandes (`map`) ou tabelas:**
    - Evita re-renderização de todos os itens quando apenas um muda.
        
3. **Componentes de UI estáticos ou quase estáticos:**
    - Ex: Cabeçalhos, botões, cards que não atualizam frequentemente.
        
4. **Quando o custo da renderização é alto:**
    - Ex: Componentes com cálculos pesados ou chamadas de API condicionais.
        

❌ **Quando NÃO usar:**

1. **Se as props/estado mudam constantemente:**
    - A comparação superficial pode ter custo maior que o re-render.
        
2. **Se o componente depende de dados mutáveis profundos (objetos/arrays aninhados):**
    - `PureComponent` e `memo` não detectam mudanças internas em objetos/arrays.
        
3. **Se o componente usa `context` ou efeitos externos:**
    - Mudanças no contexto não são comparadas automaticamente.

### Cenários de re-renderização

| Situação                                  | Re-renderiza?           |
| ----------------------------------------- | ----------------------- |
| Pai re-renderiza com props iguais         | ❌ Não                   |
| Pai re-renderiza com props diferentes     | ✅ Sim                   |
| Props são objetos/funções não memorizados | ✅ Sim (nova referência) |
| Uso de Contexto ou estado interno         | ✅ Sim                   |

```jsx
// Apenas o Pai altera o estado
const Pai = () => {
  const [contador, setContador] = useState(0);

  return (
    <div>
      <button onClick={() => setContador(contador + 1)}>Re-renderizar Pai ({contador})</button>
      <FilhoPuro texto="Texto fixo" /> {/* Não re-renderiza! */}
    </div>
  );
};

const FilhoPuro = React.memo(({ texto }) => <p>{texto}</p>)
```


### Problema: Lista Re-renderizando Sem Necessidade

```jsx
// "Re-renderizando Lista"
const Lista = ({ itens }) => {
  return (
    <ul>
      {itens.map((item) => (
        <li key={item.id}>{item.nome}</li>
      ))}
    </ul>
  );
};
```

Se o componente pai atualizar, `Lista` re-renderiza mesmo se `itens` não mudar.

**Solução: Usar `React.memo`**

```jsx
// "Renderizado apenas se 'itens' mudar"
const Lista = memo(({ itens }) => {
  return (
    <ul>
      {itens.map((item) => (
        <li key={item.id}>{item.nome}</li>
      ))}
    </ul>
  );
});
```

Agora, `Lista` só re-renderiza se `itens` for diferente.