# Classificação

- features: são as características que utilizado para a classificação
- labels: são as características que pretendo classificar

Atributos (features) são uma parte crítica de qualquer classificador. Os atributos capturam características importantes sobre a natureza dos dados.

Para avaliar o desempenho de um classificador, você deve sempre testar o modelo em dados não visualizados. Portanto, antes da construção de um modelo, divida seus dados em duas partes: um conjunto de _treinamento_ e um conjunto de testes.

Você usa o conjunto de testes para treinar e avaliar o modelo durante o estágio de desenvolvimento. Então você usa o modelo treinado para fazer previsões no conjunto de testes não visualizado. Essa abordagem lhe dá uma noção do desempenho e robustez do modelo.

Algumas métricas comuns para a avaliação do modelo de classificação são:

1. **Acurácia (Accuracy)**: A proporção de predições corretas em relação ao total de predições feitas pelo modelo. É uma métrica geralmente utilizada, mas pode ser enganosa em conjuntos de dados desbalanceados.
    
2. **Precisão (Precision)**: A proporção de exemplos positivos corretamente identificados pelo modelo em relação ao total de exemplos identificados como positivos pelo modelo. É útil quando o foco está na minimização de falsos positivos.
    
3. **Revocação (Recall ou Sensibilidade)**: A proporção de exemplos positivos corretamente identificados pelo modelo em relação ao total de exemplos positivos no conjunto de dados. É útil quando o foco está na minimização de falsos negativos.
    
4. **F1-Score**: A média harmônica entre precisão e revocação. É útil para encontrar um equilíbrio entre as duas métricas quando elas têm importância semelhante. Quanto mais próximo de 1 indica uma maior perfeição entre precisão e revocação, quando mais próxima de 0 indica que ou precisão ou revocação são 0.
    
5. **Especificidade (Specificity)**: A proporção de exemplos negativos corretamente identificados pelo modelo em relação ao total de exemplos negativos no conjunto de dados. É complementar à revocação e é útil em problemas onde a identificação correta dos negativos é crucial.
    
6. **ROC-AUC**: Área sob a curva ROC (Receiver Operating Characteristic). É uma métrica que avalia a capacidade do modelo de distinguir entre as classes. Quanto maior o ROC-AUC, melhor o modelo em distinguir entre as classes.
    
7. **Matriz de Confusão**: Embora não seja uma única métrica, a matriz de confusão mostra a contagem de verdadeiros positivos, falsos positivos, verdadeiros negativos e falsos negativos, permitindo uma avaliação detalhada do desempenho do modelo.

#### Exemplo - Cálculo das métricas para identificação de cachorros e gatos em um vídeo

Suponha que um classificador para o reconhecimento de cães em cenas de um vídeo identifica 7 cães em uma cena contendo 9 cães e alguns gatos. Se 4 das identificações estão corretas, mas 3 são, na verdade, gatos, temos:

1. **Acurácia (Accuracy)**:
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
5. **Especificidade (Specificity)**:
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