
# Padrões

- Usar Delta para retenção infinita
	- A camada bronze irá receber todos os eventos de streaming, enquanto os próprios serviços de streaming tem uma retenção curta (evita problemas de LGPD)
- Réplica sincronizada com CDC (Change Data Capture)
	- Utiliza uma tabela replicada dos serviços de streaming que recebe todos os eventos
- Multiplex
	- Todas as fontes de dados são persistidas em um Delta Lake, inicialmente na camada bronze e depois aplicado esquema e transformações na camada prata (nessa camada já podemos dividir os delta lakes dos dados).


