---
tags:
  - armazenamento_de_dados
---
Armazenamento de Objetos (Object Storage) é uma formato de armazenamento que permite conter objetos de qualquer formato e tamanho, como por exemplo: vídeos, imagens, CSVs, JSONs, e qualquer outra estrutura de dados, seja estruturada, semi-estruturada ou não-estruturada.

Esse tipo de armazenamento são do tipo chave-valor. Eles utilizam algum container que fazem a indexação desses objetos pela chave. Sempre que um objeto é alterado em uma determinada chave, demora algum tempo até que todo cluster esteja no estado mais atual do objeto, ou seja, é um sistema eventualmente consistente.

Exemplos desse tipo de armazenamento
- [[Amazon S3]]
- [[Azure Blob Storage]]
- [[Google Cloud Storage (GCS]]

São formas de armazenamento muito performáticas no que diz respeito a aplicação batch por permitirem grandes taxas de leitura e escrita.

Outra funcionalidade comum a esse tipo de armazenamento é adicionar versionamento os objetos. Sempre que um objeto é atualizado em uma determinada chave esse objeto é totalmente sobrescrito, sendo possível reaver versões anteriores desse objeto. A principal questão que os engenheiros de dados devem pensar para esse tipo de funcionalidade é o tamanho do armazenamento necessário, já que cada objeto continua na base ocupando espaço.

É possível definir também classes e faixas de armazenamento, dessa forma objetos que são menos utilizados podem ficar em faixas mais baratas enquanto objeto bastante ativos e faixas de preço que tenham uma disponibilidade maior.

