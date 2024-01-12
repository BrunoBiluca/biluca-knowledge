---
tags:
  - arquitetura_software
---
Soluções de Big Data normalmente envolvem um ou mais dos seguintes tipos de carga de trabalho:

- Processamento em lote de fontes Big Data em repouso.
- Processamento em tempo real de Big Data em movimento.
- Exploração interativa de Big Data.
- Análise preditiva e machine learning.

Considere o uso das arquiteturas de Big Data quando precisar:

- Armazenar e processar dados em volumes muito grandes para um banco de dados tradicional.
- Transformar dados não estruturados para análise e relatório.
- Capturar, processar e analisar fluxos não associados de dados em tempo real ou com baixa latência.

![[Componentes lógicos de uma arquitetura de Big Data.png|Componentes lógicos comuns em uma arquitetura de Big Data|center|500]]


# Arquitetura em Lambda

Ao trabalhar com conjuntos de dados muito grandes, pode levar muito tempo para executar a classificação de consultas de que os clientes precisam. Essas consultas não podem ser executadas em tempo real e geralmente exigem algoritmos como [MapReduce](https://en.wikipedia.org/wiki/MapReduce), que operam em paralelo em todo o conjunto de dados. Os resultados são então armazenados separadamente dos dados brutos e usados para consulta.

> [!tip] Propósito arquitetural
> O ideal é que você obtenha alguns resultados em tempo real (talvez com alguma perda de precisão) e combine esses resultados com os resultados da análise de lote.
> 

![[Diagrama lógico da Arquitetura lambda.png|Diagrama lógico da apresentação de uma arquitetura Lambda|center|500]]

# Arquitetura Kappa

Uma desvantagem da arquitetura de lambda é sua complexidade. A lógica de processamento aparece em dois lugares diferentes (os caminhos frio e crítico) usando estruturas diferentes. Isso leva a uma lógica de cálculo duplicada e a complexidade de gerenciar a arquitetura para os dois caminhos.

A Arquitetura Kappa vem para resolver esses problemas da Arquitetura Lambda eliminando todo o processamento em lotes e focando apenas no processamento em tempo real.

![[Diagrama lógico da Arquitetura Kappa.png|Diagrama lógico da arquitetura Kappa|center|500]]




# Referências

- [Guia de arquiteturas Big Data](https://learn.microsoft.com/pt-br/azure/architecture/databases/guide/big-data-architectures)