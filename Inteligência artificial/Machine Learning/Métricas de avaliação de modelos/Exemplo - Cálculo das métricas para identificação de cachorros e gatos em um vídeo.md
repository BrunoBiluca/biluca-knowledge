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