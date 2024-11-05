# Normalização

> [!info] Definição
> Normalização é uma prática de modelagem de dados que garante controle estrito sobre os relacionamentos das tabelas e suas colunas.

Essa prática de modelagem de dados foi criada nos inícios dos anos de 1970 pelo Edgar Codd (muito inspirada na ideia do Não se repita DRY, que determinar uma sequencia de passos que determinam a forma normal que os dados se encontram.

Codd define vários passos onde a aplicação de cada um desses passos deixam a modelagem de dados em uma forma normal, quanto maior a forma normal mais seus dados estão normalizados (até o 3FN já conseguimos tirar bastante proveito dessa modelagem a partir daí são ganhos mais incrementais). Os 3 primeiros passos dessa sequencia são:

- Denormalizado
	- Sem nenhum tipo de normalização. Dados aninhados e redundantes são permitidos
- Primeira forma normal (1FN)
	- Cada coluna é única e tem um única valor.
	- A tabela tem um chave primária única
		- Chave primária única: é um campo ou conjunto de campos que unicamente determinam a linha na tabela.
- Segunda forma normal (2FN)
	- Requer 1FN
	- Dependências parciais são removidas
		- Dependência parcial: um subconjunto da chave primária pode ser utilizado para determinar uma coluna não-chave de uma tabela.
- Terceira forma normal (3FN)
	- Requer 2FN
	- Cada tabela contem apenas campos relevantes para sua chave primária
	- Remover todo tipo de dependência transitiva
		- Dependência transitiva: ocorre quando um campo não-chave depende de outro campo não-chave


### Exemplo de aplicação de normalização

Vamos levar em consideração a modelagem de um sistema de pedidos de produtos em uma loja. Inicialmente temos a seguinte modelagem para os dados dessa loja:

| OrderID | OrderItems                                                                                                                                                             | CustomerID | CustomerName | OrderDate  |
| ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | ------------ | ---------- |
| 100     | [{<br>"sku": 1,<br>"price": 50,<br>"quantity": 1,<br>"name:": "Thingamajig"<br>}, {<br>"sku": 2,<br>"price": 25,<br>"quantity": 2,<br>"name:": "Whatchamacallit"<br>}] | 5          | Joe Reis     | 2022-03-01 |

#### Aplicando 1FN

Para a 1FN é necessário que cada coluna seja única e tenha um único valor, nesse caso precisamos desaninhar a coluna `OrderItems` para transformar cada um dos campos em um campo único.

| OrderID [KEY] | ItemSku [KEY] | CustomerID | CustomerName | OrderDate  | ItemPrice | ItemQuantity | ItemName        |
| ------------- | ------------- | ---------- | ------------ | ---------- | --------- | ------------ | --------------- |
| 100           | 1             | 5          | Joe Reis     | 2022-03-01 | 50        | 1            | Thingamajig     |
| 100           | 2             | 5          | Joe Reis     | 2022-03-01 | 25        | 2            | Whatchamacallit |
Porém quando fazemos isso acabamos replicando o OrderID, ou seja, não temos uma chave única. Para isso podemos fazer uma chave única que seja composta do `OrderID` e do `ItemSku`. Com isso feito temos todos os campos definidos com apenas um valor e uma chave única para cada linha da tabela, ou seja, estamos na 1FN.

#### Aplicando 2FN

Para estarmos na 2FN precisamos agora eliminar as dependências parciais. Nesse caso será dividida a tabela em duas.

Orders:

| OrderID [KEY] | ItemSku [KEY] | CustomerID | CustomerName | ItemQuantity | OrderDate  |
| ------------- | ------------- | ---------- | ------------ | ------------ | ---------- |
| 100           | 1             | 5          | Joe Reis     | 1            | 2022-03-01 |
| 100           | 2             | 5          | Joe Reis     | 2            | 2022-03-01 |
Items:

| ItemSku [KEY] | ItemPrice | ItemName        |
| ------------- | --------- | --------------- |
| 1             | 50        | Thingamajig     |
| 2             | 25        | Whatchamacallit |
Com isso eliminamos todos as dependências parciais já que nenhum conjunto dentro da chave composta identifica outros campos na tabela.

#### Aplicando 3FN

Para a 3FN precisamos que a tabela tenha campos relevantes apenas para sua chave primária. Nesse caso precisamos remover as informações de CustomerName para outra tabela já que as chaves de Orders não identificam esse campo.

Orders:

| OrderID [KEY] | ItemSku [KEY] | CustomerID | ItemQuantity | OrderDate  |
| ------------- | ------------- | ---------- | ------------ | ---------- |
| 100           | 1             | 5          | 1            | 2022-03-01 |
| 100           | 2             | 5          | 2            | 2022-03-01 |
| 101           | 2             | 6          | 4            | 2022-03-02 |

Customers:

| CustomerID | CustomerName |
| ---------- | ------------ |
| 5          | Joe Reis     |
| 6          | Bruno Biluca |

Items:

| ItemSku [KEY] | ItemPrice | ItemName        |
| ------------- | --------- | --------------- |
| 1             | 50        | Thingamajig     |
| 2             | 25        | Whatchamacallit |

Com isso chegamos a 3FN.