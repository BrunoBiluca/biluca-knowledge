# Exemplo - Fade InOut de elementos

Uma animação muito comum é alternar entre exibir e ocultar elementos de acordo com o movimento do usuário na aplicação, de forma a destacar elementos e ocultar esses elementos para deixar a aplicação mais limpa.

```scss
.start-hidden {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  
  &:hover {
	  opacity: 1;
  }
}
```

