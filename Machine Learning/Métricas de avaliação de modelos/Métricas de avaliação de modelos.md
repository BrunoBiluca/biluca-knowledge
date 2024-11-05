# Métricas de avaliação de modelos

Geralmente as métricas são avaliadas em relação a 4 categorias de informações:

- True Positives (TP)
- False Positives (FP)
- True Negatives (TN)
- False Negatives (FN)

Algumas métricas comuns para a avaliação do modelo de classificação são:

1. **Acurácia (Accuracy)**: A proporção de predições corretas em relação ao total de predições feitas pelo modelo. É uma métrica geralmente utilizada, mas pode ser enganosa em conjuntos de dados desbalanceados, principalmente quando existem muitos casos de verdadeiros negativos no conjunto de dados.
	- Acurácia = `(TP + TN) / (TP + TN + FP + FN)`
    
2. **Precisão (Precision)**: A proporção de exemplos positivos corretamente identificados pelo modelo em relação ao total de exemplos identificados como positivos pelo modelo. É útil quando o foco está na minimização de falsos positivos.
	- Podem ser usados para casos de classificação, não para casos de regressão.
	- Precisão = `TP / (TP + FP)`
    
3. **Revocação (Recall ou Sensibilidade)**: A proporção de exemplos positivos corretamente identificados pelo modelo em relação ao total de exemplos positivos no conjunto de dados. É útil quando o foco está na minimização de falsos negativos.
	- Podem ser usados para casos de classificação, não para casos de regressão.
	- Revocação = `TP / (TP + FN)`
    
4. **F1-Score**: A média harmônica entre precisão e revocação. É útil para encontrar um equilíbrio entre as duas métricas quando elas têm importância semelhante. Quanto mais próximo de 1 indica uma maior perfeição entre precisão e revocação, quando mais próxima de 0 indica que ou precisão ou revocação são 0.
	- F1-Score = `2 * P * R / (P + R)`
	- P = precisão
	- R = Revocação
    
5. **Especificidade (Specificity)**: A proporção de exemplos negativos corretamente identificados pelo modelo em relação ao total de exemplos negativos no conjunto de dados. É complementar à revocação e é útil em problemas onde a identificação correta dos negativos é crucial.
	- Especificidade = `TN / (TN + FP)`
    
6. **ROC-AUC**: Área sob a curva ROC (Receiver Operating Characteristic). É uma métrica que avalia a capacidade do modelo de distinguir entre as classes. Quanto maior o ROC-AUC, melhor o modelo em distinguir entre as classes.
    
7. **Matriz de Confusão**: mostra a contagem de verdadeiros positivos, falsos positivos, verdadeiros negativos e falsos negativos, permitindo uma avaliação detalhada do desempenho do modelo.

> [!tip] [Aritgo com representações visuais para as métricas](https://www.evidentlyai.com/classification-metrics/accuracy-precision-recall)

8. **Latência:** o tempo necessário para o modelo fazer uma previsão, que é uma medida importante de seu desempenho prático.

Para exemplificar cada uma das métricas apresentadas temos o [[Exemplo - Cálculo das métricas para identificação de cachorros e gatos em um vídeo]].

# Ajuste do modelo

Um dos principais problemas em aplicações com IA generativa é a precisão do modelo. O **objetivo** é obter um modelo treinado com o menor viés e a menor compensação de variância para um conjunto de dados.
 
Em relação a precisão do modelo podemos ter problemas relacionados ao **viés dos dados** utilizados para o treinamento do modelo, resultando em um modelo muito básico que não possui recursos para uma atuação mais ampla. Também podemos ter problema relacionado a **variância (sensibilidade)** do modelo, que resulta em modelos que apresentam flutuações nos índices de precisão, principalmente quando o modelo é bom para os dados de treinamento e ruim para os dados de avaliação (problema do sobreajuste). 


![[Exemplos de compensação entre viés e variância.png|Exemplos de compensação entre viés e variância, perceba o modelo que queremos construir é o balanceado|500]]

Existem alguma técnicas para superar os erros entre viés e variância:

- Validação cruzada (teste e validação): principalmente utilizada para detectar sobreajustes, avaliar modelos por meio de um subconjunto dos dados de entrada e avalia no subconjunto complementar dos dados
- Aumentas os dados
- Regularização: método para penalizar valores extremos e ajudar a evitar modelos lineares
- Modelos mais simples: modelos mais simples ajudam no sobreajuste, modelos simples demais podem estar subajustados
- Redução de dimensão (análise de componentes principais)
- Interrupção do treinamento: encerrar o treinamento mais cedo para que o modelo não memorize os dados.

Um boa analogia para entender o viés e a variância é um alvo.

![[Exemplo entre viés e variância com  um alvo.png|Aqui um exemplo da relação entre viés e variância de um modelo ML|500]]
