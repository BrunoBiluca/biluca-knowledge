# Sparse MatMul

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

O objetivo desse desafio é dado duas matrizes esparsas (muitos valores zero), otimizar a multiplicação de matrizes a fim de diminuir o tempo de execução.

--- end-column ---

> [!info] Principais referências
> - [CodInGame](https://www.codingame.com/ide/puzzle/sparse-matmul)
> - [Brasil Escola - Multiplicação de matrizes](https://brasilescola.uol.com.br/matematica/multiplicacao-matrizes.htm)
> 	- Descrição do processo de multiplicação de matrizes

--- end-multi-column

Para resolver esse problema é necessário entender a multiplicação de matrizes. 

- **Condição de existência:** para haver multiplicação de matrizes é necessário que o número de colunas da primeira matriztem que ser igual ao número de linhas da segunda coluna.

Assim para uma matriz A(3x2) e B(2x3) a matriz resultante C é da forma:

| a11.b11 + a12.b21 + a13.b31 | a11.b12 + a12.b22 + a13.b33 |
| --------------------------- | --------------------------- |
| a21.b11 + a22.b21 + a23.b31 | a21.b12 + a22.b22 + a23.b32 |

Multiplicação da linha de A pela coluna de B.


#### Implementações

- [[Sparse MatMul.py]]

### Solução

Criar uma mapeamento baseado na chave linha coluna, esse mapeamento reduz a quantidade de memória necessária para armazenar os dados da matriz.

O resultado será dado em um mapeamento linha coluna com a combinação entre os valores de linhas e colunas.

Uma das principais otimizações dessa solução é pré-calcular todas as posições que tem valores em A e B, isso pode ajudar a reduzir muitos cálculos para matrizes esparsas.

### Tentativas mal sucedidas

Para o último teste (teste de estresse) fazer a montagem da matriz C pela iteração de todos os valores de linhas e a e de colunas de b fez estourar o limite de tempo da solução.