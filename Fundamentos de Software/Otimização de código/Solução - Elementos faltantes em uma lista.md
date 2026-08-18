# 📜 Problema: Elementos faltantes em uma lista

Um tarefa costumeira no desenvolvimento de software é verificar se elementos existem ou não em uma listagem. Levamos por exemplo o seguinte problema:

> Dado um array de números positivos A, encontrar o menor número positivo que não existe no array A.

Casos de teste:

- Dado A = [1, 3, 6, 4, 1, 2], a função deve retornar 5.
- Dado A = [1, 2, 3], a função deve retornar 4.

## Comparar todos elementos

A primeira ideia que vem a cabeça geralmente é referente a comparar todos os elementos com todos os elementos.

Porém essa abordagem é um tanto lenta. Essa abordagem leva a todos os elementos serem verificados múltiplas vezes e é considerada uma complexidade `O(n x n)` ou `O(n²)`.

## Ordenar os elementos

Um segundo conceito seria ordenar os elementos e por meio de uma verificação observar os buracos para encontrar os elementos faltantes. Além de ordenar os valores podemos garantir a unicidade de cada elemento dentro do `array A` a fim remover algumas iterações.

```c#
using System;
using System.Collections.Generic;

class Solution {

    private bool isPositive(int num){
        return num > 0;
    }

    public int solution(int[] A) {
        var positiveA = Array.FindAll(A, isPositive);
        var sortedA = new SortedSet<int>(positiveA);

        var missingNumber = 1;
        foreach(var num in sortedA){
            if(num != missingNumber)
                break;

            missingNumber++;
        }

        return missingNumber;
    }
}
```

Essa abordagem é mais performática que a primeira, porém ainda temos que ordenar todos os elementos de uma lista o que apresenta uma complexidade `O(n log n)` no pior caso.

## Tabela Tabu

Por fim a abordagem mais rápida é utilizar uma tabela Tabu para garantir os elementos que já foram verificados. Dessa forma só é necessário iterar sobre a lista uma única vez enquanto mantemos rastreamento dos elementos que já foram iterados. Ou seja, como só precisamos iterar uma única vez por todos os elementos da lista, esse algoritmo é consideravelmente mais performático que os outros para grandes quantidades de dados.

```c#
using System;
using System.Collections.Generic;
class Solution {
    private HashSet<int> foundNumbers;

    private int UpdateMissingNumber(int value) {
        if(foundNumbers.Remove(value)){
            return UpdateMissingNumber(value + 1);
        }
        return value;
    }

    public int solution(int[] A) {
        foundNumbers = new HashSet<int>();

        var missingNumber = 1;
        foreach(var num in positiveA){
            if(num < missingNumber)   // Num não altera o resultado, já que já foi avaliado
                continue;

            if(num > missingNumber){  // Num é persistido na Tabela Tabu para avaliação futura
                foundNumbers.Add(num);
                continue;
            }

            missingNumber = UpdateMissingNumber(missingNumber + 1);
        }

        return missingNumber;
    }
}
```

A complexidade desse algoritmo é  `O(n)` . Essa abordagem requer armazenamento de memória, que por mais que seja eficiente, não pode ser desconsiderado caso o sistema que o algoritmo será executado tem limitação de memória como restrição. Mesmo assim **aumentar consumo de memória no lugar da diminuição de processamento sempre é uma troca válida** caso o ambiente permita.