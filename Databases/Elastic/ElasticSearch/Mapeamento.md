# Mapeamento

O Mapeamento é uma configuração que é passada apenas na criação do **Index**, cada tipo de campo no Elasticsearch tem uma forma de armazenagem e de indexação diferente.

Por padrão todo novo campo contido em um documento enviado para um index será indexado de acordo com a política padrão. Para alterar o comportamento padrão é necessário fornecer um arquivo de mapeamento com a configuração desejada.

> [!info] Documentação
> 
> - [Mapeamento explícito](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//explicit-mapping.html)
> - [Mapeamento de arrays](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//array.html)

## Principais tipos de campos

- Keyword
- [Text](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//text.html)
- Long
- Date

No caso de ter uma lista o campo de lista é mapeado como o tipo do primeiro elemento da lista, e não é possível criar uma lista com tipos diferentes de dados. Isso porque cada elemento da lista é indexado individualmente, por esse fato deixar elementos em listas não reduz a performances das consultas feitas ao Elasticsearch.

## Parâmetros do mapeamento

Alguns dos parâmetros mais utilizado para a criação de mapeamento

- **[Coerce](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//coerce.html):** adicionar coerce no mapeamento de um campo é uma tentativa de limpar o dado quando este não vier no tipo mapeado do campo.
	-  Strings will be coerced to numbers.
	- Floating points will be truncated for integer values.
- **[Eager global ordinals](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//eager-global-ordinals.html#eager-global-ordinals):** cada vez que o shard é atualizado esses campos serão carregados antes. Isso pode ajudar muito na performance de queries no formato **Per-Document Basis** como quando utilizamos ```terms``` em campos como ```keyword```. Dessa forma passamos o **custo de performance na hora do re-index** no lugar de fazer o mesmo processo na hora que a query é requisitada.
- **[Ignore Malformed](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//ignore-malformed.html):** garante o formato necessário para o campo no quando o campo está num formato não de acordo com o mapeamento
- **[Enabled](https://www.elastic.co/guide/en/elasticsearch/reference/7.11//enabled.html):** Podemos desativar a indexação de um campo, o campo pode ser recuperado, mas perde a funcionalidade de ser pesquisado
  - Muito útil para diminuir o uso de storage e o uso de RAM consumida

## Exemplo de json de mapeamento

```json
"properties": {
    "title": { 
        "type": "text", 
    },  
    "author": {
        "type": "keyword",
        "eager_global_ordinals": true
    },
    "categories": {"type": "keyword"},
    "content": { "type": "text" }, 
    "createdAt": { "type": "date" },     
    "comments": { 
        "type": "object",
        "enabled": false
    }
}
```

Utilizando esse mapeamento de dados podemos ver uma melhoria muito grande no storage do Elasticsearch

![Diferença do mapeamento em relação a storage](storage_diff_mapping.PNG)

# Routing

Um tópico importante de tratar sobre Mapeamento é a forma que o seu dados é armazenado no Elasticsearch, principalmente se você tem vários nós com vários shards e réplicas.

Por padrão o Elasticsearch utiliza a seguinte conta para indexar os seus dados:

`shard_num = hash(_routing) % num_primary_shards`

Onde o `_routing` é o `_id` do documento.

Fazendo dessa forma você permite que os seus documentos estejam melhores distribuídos por todos os seus datanodes, otimizando o storage.

Porém a utilização dessa estratégia para agregações mais complexas pode representar uma perda de performance muito grande. Isso ocorre porque os dados deverão ser agrupados em cada shard para então serem agrupados no datanode e finalmente agrupados em nível do Elasticsearch.

Utilizando uma rota customizada podemos garantir que todos os dados necessários para aquela agregação esteja em um mesmo shard melhorando a performance.

Uma **boa estratégia** para garantir o roteamente é utilizar campos que sempre serão utilizados nos **filtros gerais** das agregações. Campos muito utilizados para isso são campos referentes a datas ou ids de clientes, já que a agregação sempre será feita utilizando esse filtro.

Para garantir que a rota deva ser enviada na inserção dos dados é necessário apenas criar um mapeamento utilizando:

```json
{
  "mappings": {
    "_routing": {
      "required": true 
    }
  }
}
```

O insert de documentos deve ser feito então da seguinte maneira:

```json
{
  "_routing": "CategoriaA_2021",
  "title": "Pesquisa elástica",  
  "author": "Senhor elástico",
  "content": "Era uma vez um menino que conseguia fazer contorcionismo", 
  "categories": ["CategoriaA"],
  "createdAt": "2021-03-04",     
  "comments": [
    "Bão demais da conta",
    "5 estrelas",
    "Curti muito não"
  ]
}
```

Dessa forma eu garanto que todos os dados do Autor referentes ao ano de 2021 estão no mesmo shard e agregações que utilizem dessa informação serão feitas mais facilmente. Por exemplo analisar todos os comentários em busca de comentários positivos de todos os livros referentes a categoria CategoriaA no ano de 2021.

# Analisadores

Analisadores são ferramentas que permitem a manipulação dos dados no momento de indexação.

- Character filters: remoção de html
- Tokenizer: pontuação, espaços em branco
- Token filter: lowercasing, stemming, synonyms, stopwords

Existem uma variedade de analisadores disponíveis no Elasticsearch, também é possível criar seus próprios analisadores utilizando `painless script`.

# Modelagem

> [!warning] Campos aninhados
> Documentos com muitos campos aninhados podem resultar em problemas de performance para um cluster Elasticsearch.
> 
> Uma forma de resolver esses problemas é aplicar um tipo de campo `flattened`, fazendo assim todos os campos internos ao documento ficarem na raiz, o que melhor a performance em pesquisa sobre esses campos.

### Dados normalizados

- Minimiza o tamanho de dados armazenados
- Pode necessitar mais de uma query para conseguir informações complexas

### Dados desnormalizados

- Ocupam mais espaço
- Permitem trazer dados mais complexos com menos queries
