# BASE

É um acrônimo para outro formato de consistência de dados, focado em uma consistência mais fraca. Pode ser muito bem utilizado em sistemas que a consistência não é algo crítico.

- Basically available
	- Consistência não é garantida, porém a base de dados se encarrega de buscar essa consistência que é alcançada a maioria do tempo
- Soft-state
	- O estado da transação é obscuro, e é incerto quando uma transação será registrada ou revertida
- Eventual consistency
	- Em algum ponto a leitura dos dados irá trazer resultados consistentes.

Por não garantir a consistência dos dados esse formato permite uma maior performance de escritas e leituras.

