# Murder in the village!

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

O problema envolve a partir do relato de cada pessoa moradora da vila para determinar quem foi o assassino.

São levantadas algumas considerações em relação as pessoas para determinarmos quem é o assassino, como por exemplo que o assassino não é visto por nenhuma outra pessoa.

--- end-column ---

> [!info] Principais referências
> - [CodInGame](https://www.codingame.com/training/easy/murder-in-the-village)

--- end-multi-column

#### Implementações

- [[Murder in the village!.py]]

### Solução

Para resolver esse assassinato é necessário primeiro fazer uma análise de cada uma das pessoas envolvidas. 

Características analisadas:

- Localização dita
- Quem ela viu
- Se ela foi vista por outra pessoa
- Se ela estava sozinha

Com essas informações podemos levantar algumas inconsistências:

- Pessoas que não foram vistas podem ser o assassino
- Se a pessoa não foi vista, porém falou que viu pessoa
- Se a pessoa falou que estava sozinha, mas existiam pessoas no mesmo local

### Outras considerações

Os testes disponíveis para desenvolvimento não cobrem todos os pontos do problema.

Para ajudar temos dois testes customizados para conseguir os 100%.

```
2
Alice: I was in the shed, alone.
Bob: I was in the shed, with Alice.

Bob did it!

4
Benjamin: I was in the workshop with Raul.
Bob: I was in the garden, alone.
Alice: I was in the workshop, alone.
Raul: I was in the workshop with Benjamin.

Alice did it!
```