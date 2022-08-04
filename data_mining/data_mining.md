# Data Mining

- [Data Mining](#data-mining)
  - [Clustering](#clustering)
  - [Medida de similaridade](#medida-de-similaridade)
    - [Exemplo em Python](#exemplo-em-python)
- [Referências](#referências)
  
## Clustering

> **Clustering** consiste em agrupar certos objetos que são semelhantes entre si, pode ser usado para decidir se dois itens são semelhantes ou diferentes em suas propriedades.

## Medida de similaridade

> A medida de similaridade se refere à distância com dimensões que representam recursos do objeto de dados, em um conjunto de dados. 
> Se essa **distância for menor**, haverá um **alto grau de similaridade**, mas quando a **distância for grande**, haverá um **baixo grau de similaridade**.

Algumas das medidas de similaridade populares são -

- Distância euclidiana.
- Distância de Manhattan.
- Jaccard Similarity.
- Distância de Minkowski.
- Similaridade de cosseno.

A **similaridade de cossenos** é uma métrica útil para determinar o quão semelhantes os objetos de dados são, independentemente de seu tamanho. 

Na similaridade do cosseno, os objetos de dados em um conjunto de dados são tratados como um vetor. Assim não importa a magnitude dos dados e sim a relação entre o ângulo que os vetores formam entre si.

```math
Cos(x, y) = {x \cdot y \over ||x|| * ||y||}
```

Onde,

x . y = produto (ponto) dos vetores 'x' e 'y'.
|| x || e || y || = comprimento dos dois vetores 'x' e 'y'.
|| x || * || y || = produto vetorial dos dois vetores 'x' e 'y'.

### Exemplo em Python

Programa que mede a similaridade entre duas sentenças usando **similaridade de cossenos**.

O arquivo `./python/cosine_similarity.py` implementa a solução do problema.

Nesse exemplo foi utilizado como parâmetro de comparação se a palavra está contida na sentença como valor 1 ou não contida como valor 0.

Assim a similaridade é calculada baseada na quantidade de palavras iguais as duas sentenças apresentam.

# Referências

- #### [acervolima.com](https://acervolima.com/semelhanca-de-cosseno/)