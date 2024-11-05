#mineração
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
cosine = dot_product(x, y) / cross_product(x, u)
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

```python
# Natural Language Toolkit (NLTK)
# https://www.nltk.org/install.html
# corpus is responsible for create the stopwords list
from nltk.corpus import stopwords

# tokenize is responsible to tokenize the sentences
from nltk.tokenize import word_tokenize

X ="I love Lights out in a horror movies"
Y ="Lights out is a horror movie"
X_list = word_tokenize(X)
Y_list = word_tokenize(Y)
sw = stopwords.words('english')
l1 = []
l2 = []

X_set = {w for w in X_list if w not in sw}
Y_set = {w for w in Y_list if w not in sw}

# form a set containing keywords of both strings
rvector = X_set.union(Y_set)

for w in rvector:
    if w in X_set: l1.append(1) # create a vector
    else: l1.append(0)
    if w in Y_set: l2.append(1)
    else: l2.append(0)
  
def dot_product(vec1, vec2):
    c = 0
    # cosine formula
    for i in range(len(vec1)):
        c += vec1[i] * vec2[i]
    return c

def magnitude(vec):
    m = 0
    for i in range(len(vec)):
        m += vec[i] ** 2
    return m ** 0.5

def cross_product(vec1, vec2):
    m1 = magnitude(vec1)
    m2 = magnitude(vec2)
    return m1 * m2

cosine = dot_product(l1, l2) / cross_product(l1, l2)

print("similarity: ", cosine)
```

# Referências

- #### [acervolima.com](https://acervolima.com/semelhanca-de-cosseno/)