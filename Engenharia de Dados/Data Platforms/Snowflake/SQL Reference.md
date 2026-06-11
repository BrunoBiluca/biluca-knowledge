# SQL Reference

[[Snowflake]] utiliza vários dos padrões definidos pelo [[Structured query language (SQL)]].

Além do consulto mais geral de operações ele também disponibiliza algumas operações próprias:

#### Connect BY

[Documentação do Connect By](https://docs.snowflake.com/en/sql-reference/constructs/connect-by)

Junta um tabela com ela mesmo a partir de uma propriedade. Pode ser definida como uma query recursiva, de forma que cada linha da tabela seja itere até não cumprir mais com a clausula do `CONNECT BY`.

```sql
-- Exemplo
-- Iniciando do president da empresa
-- Conecte a hierarquia da empresa a partir do manager_ID = PRIOR employee_id
SELECT SYS_CONNECT_BY_PATH(title, ' -> '), 
	employee_ID, 
	manager_ID, 
	title
  FROM employees
    START WITH title = 'President'
    CONNECT BY
      manager_ID = PRIOR employee_id -- PARA quando não tem mais correspondência
  ORDER BY employee_ID;
  
+----------------------------------------------------------------+-------------+------------+----------------------------+
| SYS_CONNECT_BY_PATH(TITLE, ' -> ')                             | EMPLOYEE_ID | MANAGER_ID | TITLE                      |
|----------------------------------------------------------------+-------------+------------+----------------------------|
|  -> President                                                  |           1 |       NULL | President                  |
|  -> President -> Vice President Engineering                    |          10 |          1 | Vice President Engineering |
|  -> President -> Vice President HR                             |          20 |          1 | Vice President HR          |
|  -> President -> Vice President Engineering -> Programmer      |         100 |         10 | Programmer                 |
|  -> President -> Vice President Engineering -> QA Engineer     |         101 |         10 | QA Engineer                |
|  -> President -> Vice President HR -> Health Insurance Analyst |         200 |         20 | Health Insurance Analyst   |
+----------------------------------------------------------------+-------------+------------+----------------------------+
```

[[Table functions]]