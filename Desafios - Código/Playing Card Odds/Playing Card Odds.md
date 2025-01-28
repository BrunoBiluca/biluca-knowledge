# Playing Card Odds

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Problema: dado um baralho de cartas com cartas já removidas qual a probabilidade de retirar um conjunto específico de cartas.

--- end-column ---

> [!info] Principais referências
> - [CodeInGame](https://www.codingame.com/ide/puzzle/playing-card-odds)
>- 

--- end-multi-column

#### Implementações

- [[Playing Card Odds.py]]

### Conceitos trabalhados

- Combinação de strings
- Probabilidade
- Regras de negócio, por exemplo não calcular probabilidade de cartas que não estão no baralho

### Solução

- Criar um baralho no formato de lista da combinação de todas as cartas disponíveis com todos os nipes disponíveis.
- Saber identificar o símbolos utilizados para determinar um conjunto de cartas
- Fazer a combinação das cartas com os naipes a fim de obter todas as cartas possíveis tanto de remoção quando d previsão
- Remover todas as cartas do baralho
- Calcular o conjunto de cartas para para previsão
- Calcular a probabilidade
