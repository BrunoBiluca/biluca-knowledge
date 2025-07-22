# Common Table Expressions (CTE)

Um CTE é uma expressão que cria um resultado temporário em uma consulta [[Structured query language (SQL)]].

Podemos utilizar esse formato para criar consultas mais legíveis, já que podemos separar em múltiplas etapas as transformações, facilitando assim o entendimento de todo o processo.

> [!info] Principais referências
> - [Artigo - CTE O que é? Para que serve?](https://www.alura.com.br/artigos/cte-o-que-e-para-que-serve-sql)

```sql
WITH nome_expressão [( nome_colunas [,...n] )] 
AS 
(CTE_definição_da_consulta)
```

As CTEs são **aninhadas** quando podem ser definidas uma seguida da outra, o que permite construir consultas complexas com várias etapas.

O recurso de **_Common Table Expressions_**, CTE, foi adicionado ao SQL com a implementação da cláusula `WITH` no SQL-1999 (SQL3). Ele se tornou disponível em vários SGBDs, Sistemas Gerenciadores de Banco de Dados, como o SQL Server, PostgreSQL, Oracle, MySQL e outros.

### Exemplo - Consulta de vendas por cada vendedor

Imagine uma loja com vários departamentos e queremos verificar o valor total em vendas de cada vendedor.

```sql
WITH
departamentos (id, nome) AS (
    SELECT id, nome
    FROM departamento
),
vendedores (id, nome, id_depto) AS (
    SELECT id, nome, id_depto
    FROM vendedor
    JOIN departamentos
    ON colaborador.id_depto = departamentos.id
),
vendas (id_colaborador, venda_total) AS (
    SELECT id_colaborador, SUM(preco_total)
    FROM pedidos
    JOIN vendedores
    ON pedidos.id_colaborador = empregados.id
    GROUP BY id_colaborador
)
SELECT nome, venda_total
FROM vendas
JOIN vendedores
ON vendas.id_colaborador = colaboradores.id;
```

Utilizando [[Common Table Expressions (CTE)]] podemos fazer essa consulta em etapas facilitando assim verificar cada parte.


# Consultas recursivas usando CTEs


> [!quote]- (Documentação) - [Recursive Queries Using Common Table Expressions](https://learn.microsoft.com/en-us/previous-versions/sql/sql-server-2008-r2/ms186243(v=sql.105)?redirectedfrom=MSDN)
> Utilização de consultas recursivas em [[SQL Server]], pode ser aplicada em outros motores de bancos de dados

Uma das principais funcionalidades da utilização de CTEs é sua capacidade de auto-referência. Dessa forma podemos na definição de uma CTE referenciar ela mesma o que nos permite criar consultas recursivas.

Consultas recursivas podem ser utilizadas quando precisamos de consultar dados com algum tipo de hierarquia, por exemplo, exibir todos os trabalhadores de um empresa e seus superiores.

A estrutura de uma consulta recursiva é da seguinte forma:

```sql
WITH cte_name ( column_name [,...n] )
AS
(
	CTE_query_definition -- Definição da ancoragem
	UNION ALL
	CTE_query_definition -- Definir do termo recursivo, ou seja, que irá auto-referenciar a CTE
)
-- Statement using the CTE
SELECT *
FROM cte_name
```

Em uma consulta recursiva é necessário ter principalmente dois elementos

- **Ancoragem -** nesse ponto definimos o estado inicial da CTE
- **Termo recursivo -** fazemos a invocação da CTE recursivamente

### Exemplo - Exibição dos trabalhadores de uma empresa e seus superiores

Para demonstrar as capacidades de uma consulta recursiva vamos pensar no seguinte exemplo.

Seja uma empresa em que os trabalhadores estão organizados de forma hierárquica, cada trabalhador tem um supervisor. Nesse caso queremos exibir todos os trabalhadores e o nível que este trabalhador se encontra na hierarquia.

Utilizando uma CTE recursiva podemos buscar por cada nível levando em consideração quando um trabalhador é ligado ao seu supervisor `e.ManagerID = d.EmployeeID`. Cada resultado da CTE será utilizado como entrada para a próxima iteração da consulta.

```sql
USE AdventureWorks2008R2;
GO
WITH DirectReports (ManagerID, EmployeeID, Title, DeptID, Level)
AS
(
	-- Anchor member definition
	SELECT e.ManagerID, e.EmployeeID, e.Title, edh.DepartmentID, 0 AS Level
	FROM dbo.MyEmployees AS e
	INNER JOIN HumanResources.EmployeeDepartmentHistory AS edh
		ON e.EmployeeID = edh.BusinessEntityID 
			AND edh.EndDate IS NULL
	WHERE ManagerID IS NULL
	
	UNION ALL
	
	-- Recursive member definition
	SELECT e.ManagerID, e.EmployeeID, e.Title, edh.DepartmentID, Level + 1
	FROM dbo.MyEmployees AS e
	INNER JOIN HumanResources.EmployeeDepartmentHistory AS edh
		ON e.EmployeeID = edh.BusinessEntityID 
			AND edh.EndDate IS NULL
	INNER JOIN DirectReports AS d
		ON e.ManagerID = d.EmployeeID
)
-- Statement that executes the CTE
SELECT ManagerID, EmployeeID, Title, DeptID, Level
FROM DirectReports
INNER JOIN HumanResources.Department AS dp
	ON DirectReports.DeptID = dp.DepartmentID
WHERE dp.GroupName = N'Sales and Marketing' OR Level = 0;
GO
```

Esse processo tem como resultado:

```sql
ManagerID EmployeeID Title                         Level
--------- ---------- ----------------------------- ------
NULL      1          Chief Executive Officer       0
1         273        Vice President of Sales       1
273       16         Marketing Manager             2
273       274        North American Sales Manager  2
273       285        Pacific Sales Manager         2
16        23         Marketing Specialist          3
274       275        Sales Representative          3
274       276        Sales Representative          3
285       286        Sales Representative          3
```

Para esse caso foram necessárias 4 iterações da CTE `DirectReports`, quando a quarta iteração foi iniciada o resultado retornado pela CTE é uma lista vazia, já que não existem mais trabalhadores na empresa isso encerra o processo e retorna os resultados para os passos seguintes.