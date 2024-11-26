# Kimball

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Criado por Ralph Kimball a modelagem Kimball vem como uma abordagem totalmente oposta ao que [[#Inmon]] propõe, onde nessa abordagem o foco é bem menos na normalização dos dados, permitindo até ter denormalização.

O modelo de Kimball tenta uma abordagem mais baixa-cima, onde cada departamento ou negócio deve ser modelado e servido do próprio Data Warehouse, removendo assim a centralidado do modelo Inmon conseguindo então mais agilidade no processo em detrimento de uma menor taxa de integração e dados duplicados ou redundantes.

--- end-column ---

> [!info] Principais referências
> - 

---

> [!quote]- Outras referências
> - [[Fundamentals of Data Engineering]]
> 	- Conceitos e aplicação

--- end-multi-column

A abordagem do Kimball tem como elementos principais dois tipos de tabelas: Fatos e Dimensões.

- Tabela Fato
	- Contém dados factuais, quantitativos e relacionados a eventos.
	- São apenas aditivas (append-only)
	- Cada linha da tabela deve representar o grão dos dados.
	- Referenciam apenas tabelas dimensão
- Tabela Dimensão
	- Referencia uma tabela fato com dados qualitativos como atributos, contexto relacional
	- Quando juntadas as tabelas fato podem responder perguntas como "o que, onde e quando"
	- São denormalizadas possibilitando dados duplicados

Alguns tipos de estratégias de atualização das tabelas dimensão são:

- Sobrescrever tudo
- Manter histórico completo de mudanças ([[Mudança lenta de dimensões]])
	- Quando uma mudança é feita a linha atual é marcada como alterada e uma cópia dela com as novas informações é adicionada em uma nova linha, esta passa a ser a linha atual
- Manter histórico de mudanças por adição de novos campos
	- Quando uma mudança é feita um novo campo é criado para armazenar o estado atual

### Exemplo em um ecommerce

Esse exemplo utiliza [[Mudança lenta de dimensões]] para definir as mudanças de estados.

Tabela Fato:

| OrderID | CustomerKey | DateKey  | ValorBruto |
| ------- | ----------- | -------- | ---------- |
| 100     | 5           | 00330322 | 10         |
| 101     | 6           | 00330322 | 100        |
| 102     | 5           | 00330401 | 1000       |

Dimensão de Datas

| DateKey  | Date-ISO   | Year | Trimestre | Month | Dia-da-semana |
| -------- | ---------- | ---- | --------- | ----- | ------------- |
| 20220301 | 2022-03-01 | 2022 | 1         | 3     | Terça         |
| 20220302 | 2022-03-02 | 2022 | 1         | 3     | Quarta        |

Dimensão do cliente:

| CustomerKey | FirstName | LastName   | ZipCode   | EFF_StartDate | EFF_EndDate |
| ----------- | --------- | ---------- | --------- | ------------- | ----------- |
| 5           | Judas     | Escariotes | 33333-666 | 0033-03-12    | 9999-01-01  |
| 6           | Jesus     | -          | 33333-666 | 0001-01-01    | 0033-03-31  |
| 6           | Jesus     | -          | 00000-000 | 0033-03-31    | 9999-01-01  |
Perceba como nesse modelo é permitido dados duplicados, quando Jesus ressucita na Páscoa ele muda de endereço para o céu, uma nova linha é adicionada a dimensão do cliente definindo o novo estado dos atributos do cliente, e então o valor `EFF_EndDate` (Effective End Date) é atualizado para o momento da alteração. 

Com esse formato podemos facilmente responder perguntas como:

- "Qual o valor bruto de vendas por cada cliente por data?"
	- Facilmente podemos fazer agrupamentos por DateKey e CustomerKey utilizando apenas a tabela fato
- "Qual o total de vendas no primeiro trimestre de 2022?"
	- Fazendo um Join entre a Tabela Fato e a dimensão de data podemos obter essa informação e filtrar pelo ano e trimestre armazenados na dimensão de data
- "Quantos clientes a mais compram na terça que na quarta?"
	- Também podemos responder essa resposta com uma simples junção e agrupar pelo Dia da semana.