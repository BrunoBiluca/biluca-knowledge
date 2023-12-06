#matemática 
# Vectors

Vetores são importantes porque eles determinam tamanho (magnitude), direção e sentido.

Vetores podem ser somados ou subtraídos, assim sabemos o vetor resultante dada essas operações entre vetores.

![vectors](vectors.PNG)

Para calcular o vetor dados seus pontos é necessário fazer o somatório dos pontos:

```math
V.x = P1.x + P2.x
V.y = P1.y + P2.y
```

onde `V` é o vetor resultando dos pontos `P1` e `P2`.

Um caso interessante para o uso de vetores é saber o vetor resultando de um player, dado vários movimentos no espaço 2 D. O vetor resultando é determinado pela soma dos vetores components.

Podemos utilizar apenas a direção e o sentido de um vetor, esses vetores são chamados de **vetores unitários (unit vectors)**, podem ser determinados pelo método de normalização.

Os vetores unitários são muito utilizados principalmente para simplificar as operações. São uma ótima forma de navegar o espaço do jogo, já que a distância vira apenas um escalar separado do conceito de direção que o objeto tem durante o percurso.

![unit vectors](vectors-2.PNG)

## Módulo (Magnitude) de um vetor

O módulo (Magnitude) de um vetor pode ser calculado pela raiz quadrada da soma dos quadrados de seus componentes, como sugere a seguinte fórmula:

```math
|v| = \sqrt{a ^ 2 + b ^2 + ... z ^ 2}
```

### Python code

```python
def magnitude(vec):
    m = 0
    for i in range(len(vec)):
        m += vec[i] ** 2
    return m ** 0.5
```

## Normalização de vetores

O vetor $\vec{v}$ de qualquer vetor 

```math
\hat{u} = \dfrac{\vec{u}}{||\vec{u}||} 
```

Dividimos cada um de seus components pela magnitude:

```math
\hat{u} = (\dfrac{u.x}{||\vec{u}||}, \dfrac{u.y}{||\vec{u}||})
```

### Python code

```python
def normalize(vec):
    m = magnitude(vec)
    normalized_vector = vec
    for i in range(len(vec)):
        normalized_vector[i] = vec[i] / m
    return normalized_vector
```

## Distância de dois vetores

A distância de dois vetores pode ser calculada pela diferente entre eles:

```math
dist = (v1.x - v2.x, v1.y - v2.y)
```

# Vector class definitions

## C++

```cpp
class Vector2 {
public:
  string name;
  float x;
  float y;

  Vector2() {
    this->x = 0;
    this->y = 0;
  }

  Vector2(string name, float x, float y) {
    this->name = name;
    this->x = x;
    this->y = y;
  }

  string toString() {
    return name + " ( " + to_string(x) + " , " + to_string(y) + " ) ";
  };

  float magnitude() { return sqrt(pow(this->x, 2) + pow(this->y, 2)); }

  Vector2 normalize() {
    auto mag = this->magnitude();
    return Vector2(this->name, this->x / mag, this->y / mag);
  }
};
```