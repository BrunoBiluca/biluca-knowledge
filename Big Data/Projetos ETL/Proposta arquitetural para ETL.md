---
tags:
  - análise_de_dados
  - engenharia_de_dados
---
# Princípios  

- Garantia de qualidade para o cliente
  - Mitigação de erros
- Agilidade em entregas
  - Previsibilidade de funcionamento
  - Padronização do código
- Gerenciamento do time
  - Mitigação dos conflitos (ainda mais se queremos quebrar as responsabilidades entre os integrantes da equipe)
  - Mitigação de bugs

# Recursos

Aqui serão listados os recursos necessários para o desenvolvimento dos entregáveis.

### Ambiente de desenvolvimento

Criação do ambiente determina o conjunto de ferramentas necessárias para o desenvolvimento do projeto. Deve ser capaz de resolver todas as necessidades dos desenvolvedores para entrega.

### Chaves de acesso

Configuração de chaves de acesso devem ser vinculadas a cada desenvolvedor e sistema.

### CICD
Automatização do processo de integração do código produção e sua publicação.

### Configuração dos serviços

Configuração relacionada aos contextos de execução de cada serviço. Cada serviço deve receber um arquivo de configuração que guiará sua execução.

Exemplos de configurações de contextos:
 - Caminhos de storage
 - Parâmetros dos serviços

### Testes automatizados

Testes automatizados são utilizados para garantir a execução do código e suas funcionalidades.
Esses testes automatizados devem ser o mais próximo do ambiente real.

Faz parte também do processo de integração contínua por garantir que o código publicado passe nos testes necessários para ser publicado.

https://medium.com/credera-engineering/how-to-write-unit-tests-for-spark-f8ea22cf6448
