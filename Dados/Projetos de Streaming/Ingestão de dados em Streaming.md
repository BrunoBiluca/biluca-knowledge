
# Padrões

- Usar Delta para retenção infinita
	- A camada bronze irá receber todos os eventos de streaming, enquanto os próprios serviços de streaming tem uma retenção curta (evita problemas de LGPD)
- Réplica sincronizada com CDC (Change Data Capture)
	- Utiliza uma tabela replicada dos serviços de streaming que recebe todos os eventos
- Multiplex
	- Todas as fontes de dados são persistidas em um Delta Lake, inicialmente na camada bronze e depois aplicado esquema e transformações na camada prata (nessa camada já podemos dividir os delta lakes dos dados).


# Arquitetura medalhão (camadas)

# Bronze

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
# Ouro