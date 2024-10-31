# Classificação

> [!info] O que é?
> Classificação é um modelo de ML que foca em rotular um conjunto de dados não conhecido a partir dos atributos do conjunto de testes utilizado em seu desenvolvimento

Atributos (features) são uma parte crítica de qualquer classificador. Os atributos capturam características importantes sobre a natureza dos dados.

Para avaliar o desempenho de um classificador, você deve sempre testar o modelo em dados não visualizados. Portanto, antes da construção de um modelo, divida seus dados em duas partes: um conjunto de _treinamento_ e um conjunto de *testes*.

O conjunto de testes é utilizado para treinar e avaliar o modelo durante o estágio de desenvolvimento. Após o desenvolvimento o modelo treinado é utilizado para fazer previsões em um conjunto de testes ainda não utilizado. Essa abordagem lhe dá uma noção do desempenho e robustez do modelo de acordo com as [[Métricas de avaliação de modelos]].