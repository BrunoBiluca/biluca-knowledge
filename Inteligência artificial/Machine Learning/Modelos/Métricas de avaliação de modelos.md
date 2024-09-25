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
	- Precisão = `TP / (TP + FP)`
    
3. **Revocação (Recall ou Sensibilidade)**: A proporção de exemplos positivos corretamente identificados pelo modelo em relação ao total de exemplos positivos no conjunto de dados. É útil quando o foco está na minimização de falsos negativos.
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
#### Exemplo - Cálculo das métricas para identificação de cachorros e gatos em um vídeo

Suponha que um classificador para o reconhecimento de cães em cenas de um vídeo identifica 7 cães em uma cena contendo 9 cães e alguns gatos. Se 4 das identificações estão corretas, mas 3 são, na verdade, gatos, temos:

1. Acurácia (Accuracy)
    - Acurácia = `(TP + TN) / (TP + TN + FP + FN)`
    - Acurácia = `(4 + 0) / (4 + 0 + 3 + 2) = 4 / 9 ≈ 0.44`
2. Precisão
	- Precisão = `TP / (TP + FP)`
	- A precisão do programa é `P = 4/7 = 0,57` 
3. Revocação
	- Revocação = `TP / (TP + FN)`
	- A sua revocação é `R = 4/9 = 0,44`
4. F1-Score
	- `H = 2 * P * R / (P + R)`
	- F1-Score = `2 * 0,57 * 0,44 / (0,57 + 0,44) = 0,497`
5. Especificidade (Specificity)
    - Especificidade = `TN / (TN + FP)`
    - Não é possível calcular diretamente sem a contagem de verdadeiros negativos (TN), que não foi fornecida.

6. Matriz de confusão

|               | Predito Cão | Predito Gato |
| ------------- | ----------- | ------------ |
| **Real Cão**  | 4           | 5            |
| **Real Gato** | 0           | ?            |

- True Positives (TP): 4 (previsões corretas de cães)
- False Positives (FP): 3 (previsões incorretas de cães)
- True Negatives (TN): Não fornecido
- False Negatives (FN): 5 (cães não identificados)

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
