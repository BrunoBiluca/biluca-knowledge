# Number of digits

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Achei até um desafio mais difícil do que o nível apresentado (Fácil), ele poderia estar no nível Médio tranquilamente.

**Objetivo:** contar o número de um dígito `k` que aparece em todos os inteiros não-negativos menores ou iguais ao inteiro `n`.

--- end-column ---

> [!info] Principais referências
> - [CodInGame](https://www.codingame.com/ide/puzzle/number-of-digits)

--- end-multi-column
#### Implementações

- [[Number of digits.py]]

### Conceitos trabalhados

- **Teoria dos números:** definição da fórmula que a solução se apresenta, nesse caso como uma série numérica
- **Otimização:** a primeira solução era funcional, porém nem um pouco performática, para isso foi necessário encontrar algum tipo de otimização que não seja necessário a iteração por força bruta.
- **Matemática:** o básico de matemática foi importante para entender como funcionam potências de 10

### Solução

A solução foi criada a partir do entendimento que cada dígito determina uma potência de 10, assim quando um dígito `k` ocorre na dezena ele conta como 10, já que k0 até k9 para contar, mesma coisa para centenas, milhares e assim por diante.

Com isso em mente precisamos iterar apenas por cada dígito de `n`, ou seja, temos nesse caso uma solução O(m) onde m é o tamanho em dígitos do número `n`. Essa solução é muito mais performática do que a primeira solução que itera sobre cada número até o valor de `n`, pois temos muito menos dígitos que números.

Para cada dígito (índice será indicado por `i` e o dígito por `d`) fazemos:
- Calculamos a potência de 10 para `d` (chamaremos de `pd`) (dezena, centena, milhar....)
- Verificamos o valor de `d` em relação a `k` para determinarmos as repetições do dígito atual (`rd`)
	- Se `d` maior que `k` então sabemos que temos repetições igual a `pd`
	- Se `d` igual que `k` então as repetições são iguais ao dígitos posteriores a `d` + 1 (conta quando temos apenas zeros)
		- ou seja, `n[i + 1] + 1`
- Para cada dígito anterior (`a`) à `d` para determinarmos as repetições do dígito atual em relação aos dígitos anteriores (`ra`):
	- Calculamos a potência de 10 de `a` em relação a `d` (chamaremos de `pa`)
	- Acrescentamos a contagem a potência de `pa` * `a` * `pd`
- Acumulamos então `rd` + `ra`

Ao final de todos os dígitos temos o valor de vezes que `k` aparece em todos os números até `n`.

Nessa solução basicamente separei a fórmula em duas etapas:

- `rd`: Número de vezes que `k` ocorre no dígito atual
- `ra`: Número de vezes que `k` ocorre em relação aos dígitos anteriores

#### Exemplos de aplicação

Para n: 12 e k: 2

```python
contagem = 
	d 1 (rd 0 + ra 0) + 
	d 2 (rd 1 + ra (pa 1 * a 1 * pd 1))

contagem = 
	0 +
	2

contagem = 2
```

Para n: 219 e k: 5

```python
contagem = 
	d 2 (rd 0 + ra 0) + 
	d 1 (rd 0 + ra (pa 1 * a 2 * pd 10)) + 
	d 9 (rd 1 + ra (a 2 * pa 10 * pd 1 + a 1 * pa 1 * pd 1))

contagem = 
	0 +
	20 +
	22

contagem = 42
```


### Soluções mal sucedidas

Solução 1: não funcionou para o último caso que é um número muito grande

iterar por cada número inteiro menor que o `n`

- Transformar cada número em string e pesquisar pelo dígito `k`

Solução 2:

iterar por cada dígito no número `n` e multiplicar pela quantidade de vezes que o `k` pode parecer nessa posição.

exemplo: n: 12 e k: 2

- dígito 2: como é igual ao k aumenta a contagem em 1
- dígito 1: como é menor que o k aumenta a contagem em 1 já que é uma dezena
- total: 2

exemplo: n: 32 e k: 2

- dígito 2: aumenta a contagem em 1
- dígito 3: aumenta em 1 + 10 + 1
- total : 23

Solução 3:

Por meio da potência de 10 no número n projetar quantos números aparecem de k.

exemplo: n: 12 e k: 2

- potência: 10
- 10 * (0) + 1 * (1 + 1)
    - o dígito 1 é menor que k assim esse valor é dividido por 10
- total 2

exemplo: n: 33 e k: 2

- potência: 10
- 10 * (0 + 1) + 1 * (3 + 1)
- total: 14

Fórmula:

para cada potência de 10

contagem += potência * (dígito anterior + 1 se dígito atual é maior ou igual)

exemplo: n: 219 e k: 5

- potência: 100
- 100 * (0 + 0) + 10 * (2 + 0) + 1 * (2 * 10 + 1 * 1 + 1)


# Melhor solução encontrada

Essa foi a solução mais simples e objetiva encontrada.

Diferente a minha solução que busca os valores anteriores para verificar quantas vezes existe a ocorrência de `k` na posição, esta solução avança sem precisar de verificar dígitos anteriores.

Outra coisa que achei interessante foi **utilizar os operadores lógicos como nas operações aritméticas**. Quando o valor é falso ele é considerado como zero na operação, quando o valor é verdadeiro ele é considerado como 1 na operação.

Dessa forma em vez de fazer um condicional:

```python
if int(d) > k:
	return pd
elif int(d) == k:
	next_digits = n[i+1:]
	return int(next_digits) + 1 if next_digits != "" else 1
```

Temos apenas uma linha na operação:

```python
(n + (d>k)) * 10**p + r * (d==k)
# d>k é verdadeiro temos a potência total
# d==k é verdadeiro temos o resto da divisão
```

Solução completa

```python
n = int(input()) + 1 # esse +1 não entendi
k = int(input())

# s é a contagem de vezes que k ocorre
# r é acúmulo do resto da divisão vezes a potência anterior
# p é a potência atual que aumenta a medida que os dígitos são iterados
s = r = p = 0
while n:
    n, d = divmod(n, 10)
    s += (n + (d>k)) * 10**p + r * (d==k)
    r = r + d * 10**p
    p = p + 1

print(s)
```