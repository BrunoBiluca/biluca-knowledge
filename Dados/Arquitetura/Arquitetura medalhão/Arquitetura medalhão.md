A separação por camadas nos permite definir objetivos bem claros para cada conjunto de dados armazenado.

# Bronze

Objetivos da camada bronze são:

- Receber os dados com pouca ou nenhuma alteração
- Particionar os dados para facilitar o processamento dos dados na camada Prata.

Os dados devem ser salvos em seu formato nativo, para que nenhuma informação seja perdida inadvertidamente por agregação ou modificação. Até mesmo limpar os dados de valores nulos, por exemplo, pode ser prejudicial para bons cientistas de dados, que aparentemente conseguem extrair valor analítico adicional não apenas dos dados, mas até mesmo da falta deles.

A única exceção são pelos dados de identificação pessoal que podem ser substituídos por IDs para evitar problemas de identificação.
# Prata

Objetivos da camada prata são:

- Validar a qualidade dos dados e esquema
- Enriquecer e transformar dados
- Otimizar o layout dos dados e armazenamento para consultas posteriores
- Prover uma fonte única de verdade para o analytics

### Quarentena de entradas inválidas

Caso seja necessário persistir dados inválidos podemos utilizar dois tipos de abordagem:
- Criar regras de expectativas invertidas
	- Processa a base duas vezes, mas utiliza todos os recursos nativos da plataforma Databricks
- Adicionar um campo com o estado da validação
	- Processa a base inteira apenas uma vez, porém não é possível verificar as métricas de qualidade pela interface (no caso do Databricks)
- Adicionar um filtro com a restrição desejada ao processamento de dados, dessa forma não é necessário remover os dados inválidos da tabela e apenas recebemos dados válidos a partir daquele momento.
# Ouro