
> [!info] O que é?
> O processo de identificar mudanças nos dados da fonte original e entregar essas mudanças para um alvo

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

Para garantir que apenas uma entrada seja capturada podemos utilizar a função `rank().over(window)` por exemplo ou outras funções [[Transformações nativas#Window Functions]].