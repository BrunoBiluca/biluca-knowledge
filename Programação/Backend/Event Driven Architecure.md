---
tags:
  - arquitetura_software
---

### Arquivos de log e eventos

Vamos falar um pouco sobre um benefício colateral dessa arquitetura: ela permite sistemas desacoplados e orientados a eventos.

A abordagem típica para dados de atividade no setor da Web é fazer logout em arquivos de texto, onde eles podem ser descartados em um data warehouse ou no Hadoop para agregação e consulta. O problema com isso é o mesmo que o problema com todo ETL em lote: ele acopla o fluxo de dados aos recursos e ao cronograma de processamento do data warehouse.

No LinkedIn, construímos nosso tratamento de dados de eventos de forma centrada em logs. Estamos usando o Kafka como o log de eventos central de vários assinantes. Definimos várias centenas de tipos de eventos, cada um capturando os atributos exclusivos sobre um determinado tipo de ação. Isso abrange tudo, desde visualizações de página, impressões de anúncios e pesquisas até chamadas de serviço e exceções de aplicativos.

Para entender as vantagens disso, imagine um evento simples: mostrar um anúncio de emprego na página de emprego. A página do trabalho deve conter apenas a lógica necessária para exibir o trabalho. No entanto, em um site bastante dinâmico, isso poderia facilmente se tornar uma lógica adicional não relacionada à exibição do trabalho. Por exemplo, digamos que precisamos integrar os seguintes sistemas:

1. Precisamos enviar esses dados para o Hadoop e o data warehouse para fins de processamento off-line
2. Precisamos contar a visualização para garantir que o espectador não esteja tentando algum tipo de raspagem de conteúdo
3. Precisamos agregar essa visualização para exibição na página de análise do pôster de trabalho
4. Precisamos gravar a visualização para garantir que imprimimos corretamente todas as recomendações de trabalho para esse usuário (não queremos mostrar a mesma coisa repetidamente)
5. Nosso sistema de recomendação pode precisar registrar a visualização para rastrear corretamente a popularidade desse trabalho
6. Etc

Logo, o simples ato de exibir um trabalho se tornou bastante complexo. E à medida que adicionamos outros lugares onde os trabalhos são exibidos — aplicativos móveis e assim por diante — essa lógica deve ser transferida e a complexidade aumenta. Pior, os sistemas com os quais precisamos interagir agora estão um pouco interligados – a pessoa que trabalha na exibição de trabalhos precisa saber sobre muitos outros sistemas e recursos e garantir que eles estejam integrados corretamente. Esta é apenas uma versão de brinquedo do problema, qualquer aplicação real seria mais, não menos, complexo.

O estilo "orientado a eventos" fornece uma abordagem para simplificar isso. A página de exibição do trabalho agora mostra apenas um trabalho e registra o fato de que um trabalho foi mostrado junto com os atributos relevantes do trabalho, o visualizador e quaisquer outros fatos úteis sobre a exibição do trabalho. Cada um dos outros sistemas interessados — o sistema de recomendação, o sistema de segurança, o sistema de análise de cartazes de trabalho e o data warehouse — todos apenas assinam o feed e fazem seu processamento. O código de exibição não precisa estar ciente desses outros sistemas e não precisa ser alterado se um novo consumidor de dados for adicionado.