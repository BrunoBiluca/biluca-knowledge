
> [!info] O que é?
> 
> 
> - [Documentação](https://sparknlp.org/docs/en/quickstart)
> - [Notebook de início rápido](https://github.com/JohnSnowLabs/spark-nlp/blob/master/examples/python/quick_start.ipynb)
> - [Guia para extração de informações com Spark NLP](https://medium.com/john-snow-labs/the-complete-guide-to-information-extraction-from-texts-with-spark-nlp-and-python-c862dd33995f)

É composto principalmente de 2 componentes:

- Estimators: separa e treina parte dos dados de uma aplicação
- Transformers: resultado do processo de adequação

Podemos utilizar pipelines pré-configurados ou criar nossos próprios pipelines.

Pipelines Pré-configurados:
- `explain_document_ml`: performa um processamento básico e identificação de entidades.
# Funcionalidades

### Embedding de palavras

[Artigo de explicação de Word Embedding](https://www.elastic.co/pt/what-is/word-embedding)

É uma técnica usado em PLN que representa palavras como números facilitando o processamento pelo computador.

Abordagens

 - One-hot encoding dá a cada palavra em um corpo de texto um número exclusivo
 - Representação baseada em contagem conta o número de vezes que a palavra aparece
 - Combinação SLIM uma combinação entre os métodos acima

### Tokenização

### Normalização

Normaliza o documento uma vez que foi processado e indexado. 

Pode ser utilizado por exemplo para

- limpar Tags HTML
- ofuscar PII (Personal identification informações)

[Exemplo de normalização de documento](https://github.com/JohnSnowLabs/spark-nlp/blob/master/examples/python/annotation/text/english/document-normalizer/document_normalizer_notebook.ipynb)

