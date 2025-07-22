# Change Data Capture

> [!info] O que é?
> O processo de identificar mudanças nos dados da fonte original e entregar essas mudanças para um alvo.

Mudanças em nível de linha

- Adição de linhas
- Atualização de linhas
- Remoções de linhas

O processo de CDC no [[Delta lake]] pode ser feito fazendo a junção dos dados de uma fonte de dados para uma tabela.

```sql
MERGE INTO target_table t
USING source_updates s
ON t.key = s.key
WHEN MATCHED and t.sequence_field < s.sequence_field
	THEN UPDATE SET *
WHEN MATCHED and s.operation_field = "DELETE"
	THEN DELETE
WHEN NOT MATCHED
	THEN INSERT **
```

Cada linha da tabela deve definir um valor de sequência, esse valor é utilizado para definir qual a linha válida naquela janela de tempo. **Apenas uma entrada é capturada por janela (múltiplas entradas atualizadas geram uma exceção).**

Para garantir que apenas uma entrada seja capturada podemos utilizar a função `rank().over(window)` por exemplo ou outras funções [[Apache Spark/Transformações/Transformações#Window Functions]].

### Busca pela informação mais recente

Em um sistema CDC é muito comum existirem múltiplas alterações para um tipo de dados específico, como o caso de um usuário. Nesses casos geralmente estamos interessados em retornar o valor mais recente do registro.

Para isso podemos utilizar um template básico de DML que funciona em qualquer motor de SQL.

```sql
CREATE TABLE users (
    customer_id VARCHAR(255),
    first_name VARCHAR(255),
    row_time TIMESTAMP
);

INSERT INTO users VALUES
('cust1', 'Bruno', CURRENT_TIMESTAMP - 4),
('cust2', 'Jão', CURRENT_TIMESTAMP - 3),
('cust3', 'Jane', CURRENT_TIMESTAMP - 2),
('cust2', 'João', CURRENT_TIMESTAMP - 1),
('cust1', 'Brunin', CURRENT_TIMESTAMP);

CREATE TEMPORARY TABLE ranked_users as (
    SELECT
        *,
        RANK() OVER (PARTITION BY customer_id ORDER BY row_time DESC) as rank_num
    FROM users
    order by row_time desc
);

-- +------------+----------+
-- | first_name | rank_num |
-- +------------+----------+
-- | Brunin     |        1 |
-- | João       |        1 |
-- | Bruno      |        2 |
-- | Jão        |        2 |
-- | Jane       |        1 |
-- +------------+----------+

CREATE TEMPORARY TABLE latest_users_profiles as (
  SELECT * FROM ranked_users
  where rank_num = 1
);

alter table latest_users_profiles drop column rank_num;

SELECT * from latest_users_profiles;

-- +-------------+------------+---------------------+
-- | customer_id | first_name | row_time            |
-- +-------------+------------+---------------------+
-- | cust1       | Brunin     | 2025-07-22 13:28:44 |
-- | cust2       | João       | 2025-07-22 13:28:43 |
-- | cust3       | Jane       | 2025-07-22 13:28:42 |
-- +-------------+------------+---------------------+
```

Passos: 

- As entradas são rankeadas de acordo com a partição de tempo (`row_time`) em ordem decrescente
- São filtradas as entradas com `rank = 1`, já que elas representam a entrada mais recente
- É eliminada a coluna de `rank`, já que ela é utilizada apenas como auxílio para o filtro