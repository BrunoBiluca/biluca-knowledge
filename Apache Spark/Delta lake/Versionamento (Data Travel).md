# Versionamento (Data Travel)

[[Delta lake]] utiliza o log das transações para armazenar o histórico de alterações dos dados e permitir acessar esse histórico ao longo do tempo.

É uma funcionalidade principalmente relevante em relação à:

- **Auditoria**
- **Reprodução de experimentos e relatórios**: engenheiros de ML e analistas de dados podem se beneficiar de ter o histórico dos dados para análises históricas, levantamento de hipóteses e outros tipos de experimentos que essa funcionalidade possibilita.
- **Reversão de dados**

> [!info] Principais referências
> - [Documentação](https://docs.delta.io/latest/delta-batch.html#-deltatimetravel)
>- [Spark by Examples](https://sparkbyexamples.com/spark/time-travel-in-delta-tables-on-databricks/)
>- 

### Exemplo do versionamento de uma tabela

```sql
-- create table
CREATE TABLE students(id INT, name STRING, value DOUBLE);

-- insert rows to table
INSERT INTO students VALUES (1, "Ted", 4.7), 
                            (2, "Tiffany", 5.5),
                            (3, "Vini", 6.3);

-- update rows
update students set value = value * 10
                    where id in (1,3);

-- delete rows
delete from students where id = 2;

-- describe table
describe history students;
```

Quando executamos o comando `describe history students` iremos visualizar todas as alterações na tabela `students`. Nesse caso foram 4 alterações:

1. Criação
2. Adição dos 3 estudantes
3. Alteração dos valores dos estudantes 1 e 3
4. Remoção do estudante com id = 2

Para verificar qualquer uma das versões acima podemos fazer de duas formas:

- Horário da operação (timestamp)
- Versão

```sql
-- using timestamp
SELECT * FROM tableName TIMESTAMP as of "operation timestamp from history"

-- using version
SELECT * FROM tableName VERSION as of "VERSION NUMBER"
```

```python
# leitura.py

# usando timestamp
df1 = spark.read.format("delta").option("timestampAsOf", timestamp_string).load("/tmp/delta/students")

# usando versão
df2 = spark.read.format("delta").option("versionAsOf", version).load("/tmp/delta/students")
```
