# Esquema Estrela (Star Schema)

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

O _esquema em estrela_ é uma abordagem de modelagem semântica adotada por data warehouses relacionais. Ele requer que os modeladores classifiquem suas tabelas de modelo como _dimensão_ ou _fato_. 

Esse modelo busca principalmente criar uma representação do **modelo do negócio**, onde uma tabela fato é cercada apenas das dimensões necessárias. Esse esquema captura lógica do negócio e deve ser flexível o bastante para responder questões críticas.

--- end-column ---

> [!info] Principais referências
> - [Esquema estrela pela Microsoft.Learn](https://learn.microsoft.com/pt-br/power-bi/guidance/star-schema)

--- end-multi-column
- **Tabelas dimensões** que descrevem as entidades de negócios, como por exemplo produtos, pessoas.
	- Contem um coluna identificadora e demais colunas de informações sobre as entidades.
	- Permitem a filtragem e agrupamento
- **Tabelas fatos** que armazenam observações ou eventos como ordens de venda, saldos de estoque, taxas de câmbio.
	- Contém chaves de dimensões e colunas numéricas
	- Permitem o resumo

Existem vários conceitos que podem ser aplicados a modelagem do esquema estrela:

- **Medidas -** colunas de tabelas fato que armazenam valores a serem resumidos, por exemplo somatórios, valores mínimos, máximos ou médias.
- **Chaves alternativas -** também chamada de chaves substitutas é um identificador exclusivo adicionado a uma tabela dimensão que garante a natureza 1 para muitos em relação as tabelas fatos.
- **Dimensões de floco de neve (snowflake) -** é um conjunto de tabelas normalizadas para uma única entidade de negócios. 
	- Por exemplo, um produto pode ser classificado como uma subcategoria que está dentro de um categoria mais geral. 
		- O modelo snowflake normaliza essas informações em tabelas distintas.
		- Outra abordagem seria a desnormalização dessas informações.
- **Dimensões com função múltipla -** é uma dimensão que pode filtrar fatos relacionados de forma diferente. Esse tipo de modelagem é marcado por múltiplas relações entre duas tabelas, onde a junção dessas tabelas é definida por uma coluna específica que determina o tipo de informação relevante.
	- Por exemplo, uma tabela fato de vendas pode ser relacionada um uma dimensão de datas em três tipos diferentes, data do pedido, data de remessa ou data de entrega.
		- Nesse caso a junção feita irá depender do tipo de consulta requisitada. Se a consulta estiver buscando sobre datas do pedido, a junção da tabela de vendas e datas é feita pela coluna data do pedido.
	- Também é possível aplicar esse modelo em múltiplas tabelas dimensão, nesse exemplo a dimensão de Datas seria decomposta entre três dimensões, data de envio, data de remessa ou data de entrega e a tabela fato seria relacionada com cada uma dessas dimensões.
- **Dimensões de alteração lenta -** dimensões que controlam a [[Mudança lenta de dimensões]].
- **Dimensões de lixo eletrônico -** utilizadas para consolidar várias dimensões com poucos valores em uma única. Por exemplo, estado do pedido que geralmente é um número fixo de valores, gênero da pessoa, ou faixas etárias.
	- Nesse caso essas dimensões são produtos cartesianos entre todas as dimensões agregadas.
- **Dimensões de degeneração -** refere-se a um atributo da tabela de fatos que é necessário para a filtragem. Por exemplo, o número da ordem da venda, nesse caso seria necessário criar uma dimensão para esse campo ser utilizado na filtragem, porém isso não faz sentido, já que seria uma dimensão com apenas uma única coluna, nesse caso deixamos essa informação na tabela fato.
- **Tabelas de fatos sem fatos -** tabelas sem nenhum coluna de medida.
	- Pode ser utilizada apenas como uma tabela que relaciona dimensões (tabela de pontes).
