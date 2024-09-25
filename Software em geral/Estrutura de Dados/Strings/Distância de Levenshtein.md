# Distância de Levenshtein (Distância de Edição)

> [!info] O que é?
> Número mínimo de operações necessárias para transformar uma string em outra.


Operações
- Inserção
- Deleção
- Substituição

Exemplo

```python
palavra_1 = "gato"
palavra_2 = "garfo"

Operações
- "garto" (Inserção "r")
- "garfo" (Substituição "t" pelo "f")
```

Nesse exemplo são necessárias duas operações para fazer a alteração da palavra "gato" para "garfo", assim sua Distância de Levenshtein é 2.

# Em python

Em python podemos utilizar a função `edit_distance(str1, str2)` da biblioteca [NLTK](https://www.nltk.org/).