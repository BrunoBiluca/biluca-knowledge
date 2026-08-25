# Solução - Filtros em tempo real

Um elemento muito comum em aplicações [[Frontend]] é permitir ao usuário filtrar resultados por um campo de texto.

Esse tipo de filtro pode gerar múltiplas requisições a cada caractere alterado.

Para resolver esse tipo de problema podemos utilizar um **debouncer**.

Em [[React]] fica assim:

```jsx
import { useState, useEffect } from 'react';

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
```

Um debouncer é um implementado por um useEffect que muda de acordo com o valor do input e o delay desejado.

Modo de uso:

```jsx
import React, { useState, useEffect } from 'react';
import { useDebounce } from './useDebounce';

export default function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // This value will only change 500ms after the user stops typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    // Put your API fetch logic here
  }, [debouncedSearchTerm]);
  
  // ...resto do componente 
}
```