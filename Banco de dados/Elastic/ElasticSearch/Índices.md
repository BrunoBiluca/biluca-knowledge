# Índices
## Índice invertido

> [!info] Objetivo do índice invertido
> O propósito de um índice invertido, é armazenar textos em uma estrutura a permitir buscas completas de forma muito eficiente e rápida.
> [Entendendo o índice invertido no Elasticsearch](https://codingexplained.com/coding/elasticsearch/understanding-the-inverted-index-in-elasticsearch)

Cada campo do documento que seja do tipo `full-text` terá um índice invertido relacionado. Cada índice consiste em termos únicos que aparecem em qualquer documento, assim, quando uma busca é feita cada um desses termos é analisado e sabemos exatamente o documento que esse termo pertence.

O índice invertido também calcula a relevância dos termos pesquisados, levando em consideração sua posição no texto, vezes que o termo se repete e relevância na língua escolhida ([analisadores de línguas](https://www.elastic.co/guide/en/elasticsearch/reference/current/analysis-lang-analyzer.html)).

## Rotação de Alias

> [!info] Rotação de Alias
> Alias é uma forma de adicionar identificadores para além do nome aos índices. 
> 
> [Documentação do Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/current/indices-aliases.html)

Utilizando esse recurso podemos definir nomes mais significativos, agrupar índices utilizando o mesmo alias permitindo pesquisa em múltiplos índices e fazer rotação de índices em relação a alguma característica dos dados.

### Exemplo de rotação de alias para logs por data

Vamos considerar por exemplo uma índice de logs que serve para criação de pesquisa em múltiplos períodos como: "mês atual" e "últimos 3 meses".

Os índices são definidos por mês, ou seja, todos os logs de um mês estão contidos no mesmo índice.

Assim, considerando que estamos no mês `2024-04` podemos garantir a rotação desses índices sem alterar seus nomes por meio dos alias.

```json
POST /_aliases
{
	"add": { "alias": "logs_mes_atual", "index": "logs_2024_04" },
	"remove": { "alias": "logs_mes_atual", "index": "logs_2024_03" },
	"add": { "alias": "logs_ultimos_3_meses", "index": "logs_2024_04" },
	"remove": { "alias": "logs_ultimos_3_meses", "index": "logs_2024_01" },
}
```

Nesse exemplo nós adicionamos o alias `logs_mes_atual` para o mês vigente `2024-04` e removemos esse mesmo alias do mês anterior. Também fazemos a mesma rotação para o alias relacionado aos últimos 3 meses.