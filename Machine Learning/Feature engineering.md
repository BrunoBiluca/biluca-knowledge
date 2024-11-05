
> [!info] O que é?
> Feature engineering é o processo de selecionar e transformar variáveis quando um modelo de predição está sendo criado por meio de ML e modelagem estatística

Em ML **cada atributo dos dados é considerado uma "feature"** e por meio desses atributos que os cientistas de dados podem formular seus algoritmos.

O processo de feature engineering consiste em 4 atividades

- **Criação de features:** criação de novas features a partir de dados existentes a fim de melhorar a predição.
	- Exemplos: one-hot-encoding, binning, splitting, and calculated features.
- **Transformação de features:** processo de substituir feature faltantes ou inválidas.
	- Algumas técnicas incluem: forming Cartesian products of features, non-linear transformations (such as binning numeric variables into categories), and creating domain-specific features.
- **Extração de features:** envolve reduzir a quantidade de dados processados usando uma técnicas de redução de dimensionalidade (processar mesma coisa com menos dados).
	- As principais técnicas incluem: Principal Components Analysis (PCA), Independent Component Analysis (ICA), and Linear Discriminant Analysis (LDA).
- **Seleção de features:** é o processo de selecionar um subconjunto de features extraídas, esse subconjunto que é relevante e contribui para minimizar a taxa de erros de um modelo treinado.

