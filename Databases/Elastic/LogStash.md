---
tags:
  - engenharia_de_dados
---
O Logstash é o motor central de fluxo de dados do Elastic Stack para coletar, enriquecer e unificar todos os seus dados independentemente do formato ou esquema. O processamento em tempo real é especialmente eficiente quando associado ao Elasticsearch, ao Kibana e ao Beats.

# Exemplo - Apache web logs

Nesta seção, você cria um pipeline do Logstash que usa o Filebeat para obter logs da web do Apache como entrada, analisa esses logs para criar campos nomeados específicos a partir dos logs e grava os dados analisados ​​em um cluster do Elasticsearch. Esse exemplo será executado localmente.

Dados de entrada do Apache web server, cada linha representa uma requisição feita ao servidor.

```
83.149.9.216 - - [04/Jan/2015:05:13:42 +0000] "GET /presentations/logstash-monitorama-2013/images/kibana-search.png HTTP/1.1" 200 203023 "http://semicomplete.com/presentations/logstash-monitorama-2013/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.77 Safari/537.36"
83.149.9.216 - - [04/Jan/2015:05:13:42 +0000] "GET /presentations/logstash-monitorama-2013/images/kibana-dashboard3.png HTTP/1.1" 200 171717 "http://semicomplete.com/presentations/logstash-monitorama-2013/" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.77 Safari/537.36"
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

Com a configuração pronta já temos a saída dos dados lidos pelo Filebeats

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

Um dos filtro padrão do Logstash é o Ngrok que podemos utilizar para parsear dados desestruturados em algo estrutura que já possa ser consultado. Foi utilizado como padrão o formato `COMBINEDAPACHELOG`.

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

Para indexar os dados no ElastiSearch podemos apenas substituir o output da configuração do Logstash para apontar para o caminho e porta correta.

```
elasticsearch {
	hosts => [ "localhost:9200" ]
}
```

# Criando plugins

To develop a new filter for Logstash, build a self-contained Ruby gem whose source code lives in its own GitHub repository. The Ruby gem can then be hosted and shared on RubyGems.org.

Também é possível utilizar a ferramenta de geração de plugins para o Logstash.

# Referências

- [Pipeline avançado do exemplo de Apache web logs](https://www.elastic.co/guide/en/logstash/current/advanced-pipeline.html)
- [Criação de plugins do Logstash](https://www.elastic.co/guide/en/logstash/current/filter-new-plugin.html)