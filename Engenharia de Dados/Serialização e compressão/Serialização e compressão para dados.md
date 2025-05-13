---
tags:
  - programação
  - engenharia_de_dados
---
# Serialização

Serialização deve ser um tópico importante na hora de desenvolver os fluxos de processamento, sendo um fator crucial em relação a performance desse processamento.

### Serializações baseados em linhas

- CSV
- XML
- JSON e JSONL
	- JSONL (JSON Lines) é uma forma especialização de armazenar JSON.
- Avro
	- É um formato criado para serialização de dados para RPCs (Remote procedure call)

### Serializações baseados em colunas

- Parquet
	- Proporciona esquema e nativamente suporta dados aninhados
- ORC (Optimized Row Columnar)
- Apache Arrow
	- Utiliza um formato binário que pode ser feito tanto para processamento em memória quanto para exportação
	- Foram criadas bibliotecas em várias linguagens de programação para melhorar a interoperabilidade
		- Por exemplo, é possível criar um programa em Scala e utilizar a biblioteca em Java para escrever um Arrow e então passar como uma mensagem para um programa Python

### Serializações híbridas

- Hudi (Hadoop Update Delete Incremental)
	- Uma aplicação Hudi típica atualizar de um fluxo CDC de uma base de dados transacional.
- Iceberg

# Compressão

Motores de compressão

- Compressão de texto bem eficiente
	- gzip
	- bzip2
- Compressão com o foco em performance principalmente relacionada a execução de queries
	- Snappy
	- Zstandard
	- LZFSE
	- LZ4