# Mesclagens (join)

- Emp Dataset (`empDF`)

| emp_id | name     | superior_emp_id | year_joined | emp_dept_id | gender | salary |
| ------ | -------- | --------------- | ----------- | ----------- | ------ | ------ |
| 1      | Smith    | -1              | 2018        | 10          | M      | 3000   |
| 2      | Rose     | 1               | 2010        | 20          | M      | 4000   |
| 3      | Williams | 1               | 2010        | 10          | M      | 1000   |
| 4      | Jones    | 2               | 2005        | 10          | F      | 2000   |
| 5      | Brown    | 2               | 2010        | 40          |        | -1     |
| 6      | Brown    | 2               | 2010        | 50          |        | -1     |

- Dept Dataset (`deptDF`)

| dept_name | dept_id |
|-----------|---------|
| Finance   | 10      |
| Marketing | 20      |
| Sales     | 30      |
| IT        | 40      |

### Inner join

A junção padrão que é usado para juntar dois databases por uma coluna definida.

```python
empDF.join(deptDF, empDF["emp_dept_id"] ==  deptDF["dept_id"], "inner")
```

| emp_id | name     | superior_emp_id | year_joined | emp_dept_id | gender | salary | dept_id | dept_name |
| ------ | -------- | --------------- | ----------- | ----------- | ------ | ------ | ------- | --------- |
| 1      | Smith    | -1              | 2018        | 10          | M      | 3000   | 10      | Finance   |
| 2      | Rose     | 1               | 2010        | 20          | M      | 4000   | 20      | Marketing |
| 3      | Williams | 1               | 2010        | 10          | M      | 1000   | 10      | Finance   |
| 4      | Jones    | 2               | 2005        | 10          | F      | 2000   | 10      | Finance   |
| 5      | Brown    | 2               | 2010        | 40          |        | -1     | 40      | IT        |

### Outer join

Mesclagens do tipo Outer, full, fullouter retornam todas as linhas de ambos Dataframes, quando a expressão não casa é retornado null.

```python
empDF.join(deptDF, empDF["emp_dept_id"] == deptDF["dept_id"], "outer").show(truncate=False)
empDF.join(deptDF, empDF["emp_dept_id"] == deptDF["dept_id"], "full").show(truncate=False)
empDF.join(deptDF, empDF["emp_dept_id"] == deptDF["dept_id"], "fullouter").show(truncate=False)
```

| emp_id | name     | superior_emp_id | year_joined | emp_dept_id | gender | salary | dept_name | dept_id |
| ------ | -------- | --------------- | ----------- | ----------- | ------ | ------ | --------- | ------- |
| 1      | Smith    | -1              | 2018        | 10          | M      | 3000   | Finance   | 10      |
| 2      | Rose     | 1               | 2010        | 20          | M      | 4000   | Marketing | 20      |
| 3      | Williams | 1               | 2010        | 10          | M      | 1000   | Finance   | 10      |
| 4      | Jones    | 2               | 2005        | 10          | F      | 2000   | Finance   | 10      |
| 5      | Brown    | 2               | 2010        | 40          |        | -1     | IT        | 40      |
| 6      | Brown    | 2               | 2010        | 50          |        | -1     | null      | null    |
| null   | null     | null            | null        | null        | null   | null   | Sales     | 30      |
Até a linha 5 o outer join tem o mesmo comportamento do inner join, na linha 6 não foi possível encontrar uma correspondência em `deptDF` para o `emp_dept_id = 50` e na linha 7 não foi possível encontrar uma correspondência em `empDF` para o `dept_id = 30`.

### Left e Right Outer Join

Funcionam como o [[#Outer join]], porém retornam apenas as linhas relacionadas a direção do Dataframe desejado.

### Left Semi Join

É similar ao [[#Inner join]], porém retorna apenas as colunas do Dataframe á esquerda para as linhas que correspondem a expressão.

```python
empDF.join(deptDF, empDF["emp_dept_id"] ==  deptDF["dept_id"], "leftsemi")
```

| emp_id | name     | superior_emp_id | year_joined | emp_dept_id | gender | salary |
| ------ | -------- | --------------- | ----------- | ----------- | ------ | ------ |
| 1      | Smith    | -1              | 2018        | 10          | M      | 3000   |
| 2      | Rose     | 1               | 2010        | 20          | M      | 4000   |
| 3      | Williams | 1               | 2010        | 10          | M      | 1000   |
| 4      | Jones    | 2               | 2005        | 10          | F      | 2000   |
| 5      | Brown    | 2               | 2010        | 40          |        | -1     |
### Left anti join

É exatamente o oposto do [[#Left Semi Join]], `leftanti` retorna apenas as colunas do Dataframe à esquerda que não correspondem a expressão definida.

```python
empDF.join(deptDF, empDF["emp_dept_id"] ==  deptDF["dept_id"], "leftanti")
```

| emp_id | name  | superior_emp_id | year_joined | emp_dept_id | gender | salary |
| ------ | ----- | --------------- | ----------- | ----------- | ------ | ------ |
| 6      | Brown | 2               | 2010        | 50          |        | -1     |
### Self join

Não existe um tipo específico de auto mesclagem disponível no Spark, porém podemos utilizar qualquer um dos outros tipos para fazer essa operação.

```scala
empDF.as("emp1").join(
  empDF.as("emp2"),
  col("emp1.superior_emp_id") === col("emp2.emp_id"),
  "inner"
)
.select(
  col("emp1.emp_id"),col("emp1.name"),
  col("emp2.emp_id").as("superior_emp_id"),
  col("emp2.name").as("superior_emp_name")
)
```

No caso acima estamos buscando os contratados superiores de cada empregado.

| emp_id | name     | superior_emp_id | superior_emp_name |
| ------ | -------- | --------------- | ----------------- |
| 2      | Rose     | 1               | Smith             |
| 3      | Williams | 1               | Smith             |
| 4      | Jones    | 2               | Rose              |
| 5      | Brown    | 2               | Rose              |
| 6      | Brown    | 2               | Rose              |

### Cross join

Retorna o produto cartesiano de dois Dataframes, ou seja, cada possibilidade de combinação entre duas linhas

```python
df1 = spark.createDataFrame([(1, 'Alice', 25), (2, 'Bob', 30)], ['id', 'name', 'age']) 
df2 = spark.createDataFrame([('Tom', 80), ('Bob', 85), ('Alice', 70)], ['name', 'height']) 

cross_join_result = df1.crossJoin(df2) cross_join_result.show()
```

Nesse caso todas as combinações entre os dois Dataframes são 2 (linhas em df1) e 3 (linhas em df2) assim 6 no total.

| id  | name  | age | name  | height |
| --- | ----- | --- | ----- | ------ |
| 1   | Alice | 25  | Tom   | 80     |
| 1   | Alice | 25  | Bob   | 85     |
| 1   | Alice | 25  | Alice | 70     |
| 2   | Bob   | 30  | Tom   | 80     |
| 2   | Bob   | 30  | Bob   | 85     |
| 2   | Bob   | 30  | Alice | 70     |
### Expressões SQL

Também é possível fazer qualquer operação de mesclagem a partir da notação SQL.

```scala
empDF.createOrReplaceTempView("EMP")
deptDF.createOrReplaceTempView("DEPT")

spark.sql("select * from EMP e, DEPT d where e.emp_dept_id == d.dept_id")

spark.sql("select * from EMP e INNER JOIN DEPT d ON e.emp_dept_id == d.dept_id")
```

### unionByName

A diferença entre `unionByName()` e `union()` é que essa função resolver a junção por colunas pelo nome (não pela posição).

```python
# unionByName() Syntax
unionByName(df, allowMissingColumns=True)
```

