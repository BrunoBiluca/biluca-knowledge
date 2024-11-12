# Particionamento

Uma forma de organizar os dados é dividi-los em partições definidas por campos específicos da nossa base de dados. Isso melhora consideravelmente a performance em queries que utilizam filtros nesses campos, já que menos dados deverão ser carregados para o processamento.

Um exemplo simples de particionamento seria, se o processamento varre uma faixa de dados por data de ingestão, podemos fazer partições por data de ingestão o que limita a quantidade de dados escaneados para o filtro consequentemente carregamos menos dados para memória.

Mesmo assim é importante prestarmos atenção a nossa estratégia de particionamento, já que ela pode também criar um problema de [[Inclinação de dados (Data Skew)]] e assim levar a sérios problemas de performance.

> [!warning]- O excesso de particionamento também é um problema
> - Particionar pequenas tabelas pode levar a um aumento de armazenamento e o número total de arquivos para escaneamento
> - Se a maioria das partições tem tamanho < 1GB de dados a tabela está pode estar superparticionada
> 
> Nesses casos **executar um processo de Optimize não surte nenhum efeito**, já que o particionamento já está altamente compactado e mal definido.

O tamanho máximo das partições pode ser alterado pela configuração:

```python
spark.conf.set("spark.sql.files.maxPartitionBytes", <valor em bytes>)
```

### Exemplo - Particionamento como limites para arquivamento ou remoção de dados

Caso o particionamento seja bem implementado por utilizar ele como fator para arquivar ou remover dados. Nesse caso ele nos ajuda facilitando a remoção de dados pela partição o que não altera os metadados de estatísticos do Delta table ([[Estatísticas de arquivos]]).

Por exemplo, uma tabela que armazena registros de pedidos por ano, as consultas a essa tabela buscam apenas pelos 10 anos mais recentes. Podemos então arquivar os a cada ano o décimo primeiro ano mais recente, isso faz remover uma partição inteira sem que seja necessário alterar nenhuma das partições mais recentes.
