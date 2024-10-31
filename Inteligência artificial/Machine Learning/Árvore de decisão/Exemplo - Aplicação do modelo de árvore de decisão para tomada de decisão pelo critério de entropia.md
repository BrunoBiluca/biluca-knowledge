# Exemplo de aplicação do modelo de árvore de decisão para tomada de decisão pelo critério de entropia

A estrutura de [[Árvore de decisão]] é atraente por sua **interpretabilidade**, já que podem ser facilmente visualizadas e compreendidas. No entanto, árvores de decisão simples tendem a ter **baixo desempenho em conjuntos de dados complexos** e podem ser propensas a overfitting, o que pode ser mitigado usando técnicas como poda (pruning) ou ensemble methods, como bagging e boosting.

Vamos supor que queremos construir uma árvore de decisão para classificar se uma pessoa jogará tênis ou não, com base em algumas características como as condições atmosféricas e outras variáveis. 

Considere o seguinte conjunto de dados:

| Dia    | Condição     | Temperatura | Umidade | Vento | Jogar Tênis? |
| ------ | ------------ | ----------- | ------- | ----- | ------------ |
| Dia 1  | 🌞Ensolarado | Quente      | Alta    | Fraco | 🚫Não        |
| Dia 2  | 🌞Ensolarado | Quente      | Alta    | Forte | 🚫Não        |
| Dia 3  | ☁️Nublado    | Quente      | Alta    | Fraco | ✅Sim         |
| Dia 4  | ☔Chuvoso     | Ameno       | Alta    | Fraco | ✅Sim         |
| Dia 5  | ☔Chuvoso     | Frio        | Normal  | Fraco | ✅Sim         |
| Dia 6  | ☔Chuvoso     | Frio        | Normal  | Forte | 🚫Não        |
| Dia 7  | ☁️Nublado    | Frio        | Normal  | Forte | ✅Sim         |
| Dia 8  | 🌞Ensolarado | Ameno       | Alta    | Fraco | 🚫Não        |
| Dia 9  | 🌞Ensolarado | Frio        | Normal  | Fraco | ✅Sim         |
| Dia 10 | ☔Chuvoso     | Ameno       | Normal  | Fraco | ✅Sim         |
| Dia 11 | 🌞Ensolarado | Ameno       | Normal  | Forte | ✅Sim         |
| Dia 12 | ☁️Nublado    | Ameno       | Alta    | Forte | ✅Sim         |
| Dia 13 | ☁️Nublado    | Quente      | Normal  | Fraco | ✅Sim         |
| Dia 14 | ☔Chuvoso     | Ameno       | Alta    | Forte | 🚫Não        |

Será utilizado o critério de entropia para determinar as divisões.

1. Escolher a melhor característica para dividir o conjunto de dados inicial.

Vamos calcular a entropia de cada característica e escolher a que reduz a entropia total do conjunto de dados.

- Entropia total: `𝐸(𝑆) = −𝑝(𝑦𝑒𝑠) * log⁡2𝑝(𝑦𝑒𝑠) −𝑝(𝑛𝑜) * log⁡2𝑝(𝑛𝑜)`
- Onde,
	- 𝑝(𝑦𝑒𝑠) é a proporção de exemplos positivos (sim)
	- 𝑝(𝑛𝑜) é a proporção de exemplos negativos (não).

Vamos começar com a característica "Condição".

- Para a condição "Ensolarado":
    - Jogar Tênis: 2 sim, 3 não
    - Entropia: `𝐸(𝐸𝑛𝑠𝑜𝑙𝑎𝑟𝑎𝑑𝑜) = −(2/5) * log⁡2(2/5) −(3/5) * log⁡2(3/5)`
	    - Resultado: ≈0.971
- Para a condição "Nublado":
    - Jogar Tênis: 4 sim, 0 não
    - Entropia: `𝐸(𝑁𝑢𝑏𝑙𝑎𝑑𝑜) = 0`
	    - Resultado: 0 (pois não há incerteza, todos jogam tênis)
- Para a condição "Chuvoso":
    - Jogar Tênis: 3 sim, 2 não
    - Entropia: `𝐸(𝐶ℎ𝑢𝑣𝑜𝑠𝑜)= −(3/5) * log⁡2(3/5) −(2/5) * log⁡2(2/5)`
	    - Resultado: ≈0.971

Agora, calcule a entropia total:

```
𝐸(Condição) = (5/14) * 0.971 + (4/14) * 0 + (5/14) * 0.971
𝐸(Condição) ≈ 0.693
```

2. Repita o processo para as subcaracterísticas.

Vamos subdividir o conjunto de dados com base na característica "Condição" e suas sub características como (temperatura, umidade):

- Se Condição é "Ensolarado":
    - Temperatura: Quente (2 não), Ameno (1 sim, 1 não) e Frio (1 sim)
- Se Condição é "Nublado":
	- Jogar Tênis: todos jogam tênis (entropia 0)
- Se Condição é "Chuvoso":
	- Umidade: Alta (1 sim, 1 não), Normal (2 sim, 1 não)

Continue este processo até que todas as folhas sejam puras ou até atingir um critério de parada, que nesse caso pode ser chegar as folhas puras, já que é um conjunto pequenos de dados.

```yml
# árvore resultante
Condição?
|_ Ensolarado
   |_ Temperatura?
      |_ Quente: Não
      |_ Ameno: Sim
|_ Nublado: Sim
|_ Chuvoso
   |_ Umidade?
      |_ Alta: Sim
      |_ Normal: Sim
```

Com a árvore resultante concluída podemos abrir para a predição de se o jogador irá jogar tênis aquele dia apenas percorrendo a árvore criada.

1. Para o dia com condição "Ensolarado" e temperatura "Quente":
    - Seguindo a árvore, chegamos à decisão "Não".
2. Para o dia com condição "Nublado":
    - Seguindo a árvore, chegamos à decisão "Sim".
3. Para o dia com condição "Chuvoso" e umidade "Alta":
    - Seguindo a árvore, chegamos à decisão "Sim".