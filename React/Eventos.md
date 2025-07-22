# Eventos

[[React]] apresenta várias formas possíveis para manipulação de eventos:

### Associação direta

- **Função associada a eventos do DOM**

```js
function Button() {
  const handleClick = () => { ... };
  return <button onClick={handleClick}>Clique aqui</button>;
}
```

- useCallback ([[Hooks]]) como uma forma de otimização

### Eventos sintéticos (SyntheticEvent)

[[React]] encapsula eventos nativos em um objeto `SyntheticEvent` (cross-browser).

```jsx
const handleChange = (e) => {
  console.log(e.target.value); // Valor do input
  e.preventDefault(); // Evita comportamento padrão
};
```

Eventos comuns:

- `onClick`
- `onChange` (inputs)
- `onSubmit` (forms)
- `onKeyDown`, `onKeyUp`
- `onMouseEnter`, `onMouseLeave`

### Delegando eventos

React já faz event delegation automaticamente no root.  
Mas você pode delegar manualmente para otimização:

```jsx
function List() {
  const handleClick = (e) => {
    if (e.target.tagName === "LI") {
      console.log("Item clicado:", e.target.textContent);
    }
  };

  return (
    <ul onClick={handleClick}>
      <li>Item 1</li>
      <li>Item 2</li>
    </ul>
  );
}
```

