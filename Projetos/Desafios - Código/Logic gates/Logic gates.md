# Logic gates

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Problema: implementar portas lógicas de forma que dado duas entradas de sinais tenha uma saída com um sinal resultante do resultado da porta lógica.

--- end-column ---

> [!info] Principais referências
> - [CodInGame](https://www.codingame.com/training/easy/logic-gates)
>- 

--- end-multi-column

#### Implementação

- [[Logic gates.py]]

### Solução

Para solucionar esse problema cada porta lógica será executada com os sinais de entrada e gerará um sinal de saída que será armazenado para ser utilizado em outras portas lógicas.

Portas lógicas

**AND** : performs a logical **AND** operation.  
**OR** : performs a logical **OR** operation.  
**XOR** : performs a logical **exclusive OR** operation.  
	- Quando os dois sinais são iguais ele é verdadeira quando diferentes o resultado é falso
**NAND** : performs a logical **inverted AND** operation.  
	- É false apenas quando ambas entradas são verdadeiras
**NOR** : performs a logical **inverted OR** operation.  
	- É verdadeiro apenas quando ambas entradas são falsas
**NXOR** : performs a logical **inverted exclusive OR** operation.
