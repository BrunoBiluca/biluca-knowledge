
Também conhecido como Slowly Changing Dimensions é uma forma de atualização dos dados sob medida.

Tipos

- Tipo 0: tabelas estáticas, não permite mudanças
	- Tabelas estática de referência, tabelas de apenas inserção
- Tipo 1: permite sobrescrita, mas não mantém o histórico
	- Tabelas que não precisam de histórico, apenas o estado atual, como exemplo informações do endereço do usuário
- Tipo 2: adiciona uma nova linha e marca a linha antiga como obsoleta
	- Mudança de preços ao longo do tempo
	- Esse tipo de modelagem também pode ser chamada de [[Change Data Capture]]

Para tabelas de tipo 2 podemos utilizar algumas táticas para definir as linhas com as informações atuais e obsoletas:

- Data de início e fim para a validade da informação
- Marcação de informação ativa ou não

