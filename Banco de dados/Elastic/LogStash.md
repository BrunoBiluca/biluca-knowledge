---
tags:
  - engenharia_de_dados
---
> [!info] Definição
> O Logstash é o motor central de fluxo de dados do Elastic Stack para coletar, enriquecer e unificar todos os seus dados independentemente do formato ou esquema.

 O processamento em tempo real é especialmente eficiente quando associado ao Elasticsearch, ao Kibana e ao Beats.

[Como o Logstash funciona?](https://www.elastic.co/guide/en/logstash/current/pipeline.html)
[Configuração do Logstash](https://www.elastic.co/guide/en/logstash/current/logstash-settings-file.html)

Principais conceitos do Logstash

- [Inputs](https://www.elastic.co/guide/en/logstash/current/input-plugins.html)
- [Filters](https://www.elastic.co/guide/en/logstash/current/filter-plugins.html)
- [Outputs](https://www.elastic.co/guide/en/logstash/current/output-plugins.html)
- [Codecs](https://www.elastic.co/guide/en/logstash/current/codec-plugins.html)

Integrações

[Ingestão de dados por banco de dados relacionais (MySQL)](https://www.elastic.co/guide/en/cloud/current/ec-getting-started-search-use-cases-db-logstash.html)

## Filtros

Filtros úteis para Logstash
- Anonimizar informações
- Geolocalização

### Mutate

> [!info] Descrição do filtro Mutate
> Permite alterar os dados de entrada para um novo mapeamento

# Dead letter queue (DLQ)

> [!info] Definição
> 
> A Dead letter queue foi criada para temporariamente escrever eventos que não puderam ser processados. Dessa forma é possível investigar problemas de mapeamento, de análise ou qualquer outro problema com os eventos sem que o fluxo de processamento seja interrompido ou que os dados sejam perdidos.
> 
> [Documentação](https://www.elastic.co/guide/en/logstash/current/dead-letter-queues.html)

Essa fila é armazenada no sistema local e não é suportado sistemas por meio de redes (Network File System).

É possível controlar vários aspectos da DLQ como:

- Tamanho máximo de eventos armazenados
- Política de tempo de retenção dos eventos
- Limpeza de eventos já consumidos

# Exemplo - Apache web logs

Nesta seção:
- Criação de um pipeline que usa Filebeat para obter logs do servidor web do Apache
- Análise dos logs para criar campos específicos
- Persistência dos logs no Elasticsearch para consultadas

Dados de entrada do Apache web server, cada linha representa uma requisição feita ao servidor.

```log
83.149.9.216 - - [04/Jan/2015:05:13:42 +0000] "GET /presentations/logstash-monitorama-2013/images/kibana-search.png HTTP/1.1" 200 203023 "http://semicomplete.com/presentations/logstash-monitorama-2013/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.77 Safari/537.36"
---
83.149.9.216 - - [04/Jan/2015:05:13:42 +0000] "GET /presentations/logstash-monitorama-2013/images/kibana-dashboard3.png HTTP/1.1" 200 171717 "http://semicomplete.com/presentations/logstash-monitorama-2013/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.77 Safari/537.36"
---
83.149.9.216 - - [04/Jan/2015:05:13:44 +0000] "GET /presentations/logstash-monitorama-2013/plugin/highlight/highlight.js HTTP/1.1" 200 26185 "http://semicomplete.com/presentations/logstash-monitorama-2013/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.77 Safari/537.36"
...
```

Configuração do Filebeat:

```yml
filebeat.inputs:
- type: log
  paths:
    - /path/to/file/logstash-tutorial.log
output.logstash:
  hosts: ["localhost:5044"]
```

Configuração do Logstash:

```
input {
	beats {
		port => "5044"
	}
}
output {
    stdout { codec => rubydebug }
}
```

Com a configuração pronta já temos a saída dos dados lidos pelo Filebeats. Vários dos campos são gerados automaticamente pelo próprio Logstash, a linha do log do servidor Apache está no campo `message`.

```json
{
	"@timestamp" => 2017-11-09T01:44:20.071Z,
	"offset" => 325,
	"@version" => "1",
	"beat" => {
		"name" => "My-MacBook-Pro.local",
		"hostname" => "My-MacBook-Pro.local",
		"version" => "6.0.0"
	},
	"host" => "My-MacBook-Pro.local",
    "prospector" => {
        "type" => "log"
    },
    "input" => {
        "type" => "log"
     },
	"source" => "/path/to/file/logstash-tutorial.log",
    "message" => "83.149.9.216 - - [04/Jan/2015:05:13:42 +0000] \"GET /presentations/logstash-monitorama-2013/images/kibana-search.png HTTP/1.1\" 200 203023 \"http://semicomplete.com/presentations/logstash-monitorama-2013/\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.77 Safari/537.36\"",
	"tags" => [
		[0] "beats_input_codec_plain_applied"
	]
}
```

Um dos filtros padrão disponíveis para a utilização no Logstash é o Ngrok que pode ser utilizado para analisar dados desestruturados em algo estruturado que já possa ser consultado. Foi utilizado como padrão o formato `COMBINEDAPACHELOG`.

```
filter {
    grok {
        match => { "message" => "%{COMBINEDAPACHELOG}"}
    }
}
```

A aplicação desse filtro gera a seguinte saída:

```json
{
	"request" => "/presentations/logstash-monitorama-2013/images/kibana-search.png",
	"agent" => "\"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.77 Safari/537.36\"",
	"offset" => 325,
	"auth" => "-",
	"ident" => "-",
	"verb" => "GET",
	"prospector" => {
		"type" => "log"
	},
	"input" => {
		"type" => "log"
	},
	"source" => "/path/to/file/logstash-tutorial.log",
	"message" => "83.149.9.216 - - [04/Jan/2015:05:13:42 +0000] \"GET /presentations/logstash-monitorama-2013/images/kibana-search.png HTTP/1.1\" 200 203023 \"http://semicomplete.com/presentations/logstash-monitorama-2013/\" \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.77 Safari/537.36\"",
	"tags" => [
		[0] "beats_input_codec_plain_applied"
	],
	"referrer" => "\"http://semicomplete.com/presentations/logstash-monitorama-2013/\"",
	"@timestamp" => 2017-11-09T02:51:12.416Z,
	"response" => "200",
	"bytes" => "203023",
	"clientip" => "83.149.9.216",
	"@version" => "1",
	"beat" => {
		"name" => "My-MacBook-Pro.local",
		"hostname" => "My-MacBook-Pro.local",
		"version" => "6.0.0"
	},
	"host" => "My-MacBook-Pro.local",
	"httpversion" => "1.1",
	"timestamp" => "04/Jan/2015:05:13:42 +0000"
}
```

Com o uso desse filtro já é possível ter várias das principais informações disponíveis nas linhas do log do servidor Apache como `host`, `clientip`, `agent` e `timestamp` (do evento).

Para indexar os dados no Elasticsearch podemos apenas substituir o output da configuração do Logstash para apontar para o caminho e porta do serviço configurado.

```
elasticsearch {
	hosts => [ "localhost:9200" ]
}
```


# Plugins
## Criando plugins

Um filtro para o Logstash é uma gem Ruby autocontida que pode ser instalado por um dos repositórios padrão (RubyGems.org), repositório privado ou mesmo localmente.

Para gerar plugins para o Logstash utilizamos a própria ferramenta do Logstash que cria a fundação de um plugin.

```sh
bin/logstash-plugin generate --type input --name xkcd --path ~/ws/elastic/plugins
```

- `--type`: Type of plugin - input, filter, output, or codec
- `--name`: Name for the new plugin
- `--path`: Directory path where the new plugin structure will be created. If you don’t specify a directory, the plugin is created in the current directory.

> [!info] Como criar um plugin do Logstash?
> - [Novo plugin de filtro](https://www.elastic.co/guide/en/logstash/current/filter-new-plugin.html)

# Performance

- [Solução de problemas de performance](https://www.elastic.co/guide/en/logstash/current/performance-troubleshooting.html)
- [Afinando Logstash](https://www.elastic.co/guide/en/logstash/current/tuning-logstash.html)

### JVM heap

Be aware of the fact that Logstash runs on the Java VM. This means that Logstash will always use the maximum amount of memory you allocate to it.

- Heap size should be no less than 4GB and no more than 8GB.
- CPU utilization can increase unnecessarily if the heap size is too low, resulting in the JVM constantly garbage collecting.
- Don’t exceed 50-75% of physical memory. The more memory you have, the higher percentage you can use.
- Set the minimum (Xms) and maximum (Xmx) heap allocation size to the same value to prevent the heap from resizing at runtime

# Referências

- [Pipeline avançado do exemplo de Apache web logs](https://www.elastic.co/guide/en/logstash/current/advanced-pipeline.html)
- 