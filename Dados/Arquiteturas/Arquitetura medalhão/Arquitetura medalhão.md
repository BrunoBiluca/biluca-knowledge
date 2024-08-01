# Camadas

# Bronze

Objetivos da camada bronze são:

- Receber os dados com pouca ou nenhuma alteração
- Particionar os dados para facilitar o processamento dos dados na camada Prata.

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