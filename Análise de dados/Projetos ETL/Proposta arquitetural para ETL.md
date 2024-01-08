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

#### O que fazer?

- Criação de ambiente virtual para o python
- Gerenciamento das dependências (requirements.txt)
- Padronização da instalação de softwares externos (por exemplo spark)
- Containers para cada um dos sistemas externos

### Chaves de acesso

Configuração de chaves de acesso devem ser vinculadas a cada desenvolvedor e sistema.

#### O que fazer?

- Aplicação das chaves por variáveis de ambiente ou outros sistemas de gerenciamento
- No caso de dataproc (https://cloud.google.com/dataproc/docs/concepts/configuring-clusters/init-actions?hl=pt-br)

### CICD
Automatização do processo de integração do código produção e sua publicação.

#### O que fazer

- Publicar automaticamente o código do projeto
- Garantir que a execução de produção seja feita pelo código publicado
- Restringir acesso ao código publicado

# Melhores práticas

### Versionamento do projeto

### Configuração dos serviços

Configuração relacionada aos contextos de execução de cada serviço.

Exemplos de configurações de contextos:
 - Caminhos de storage
 - Parâmetros dos serviços

#### O que fazer?

- Cada serviço deve receber um arquivo de configuração que guiará sua execução

### Testes automatizados

Testes automatizados são utilizados para garantir a execução do código e suas funcionalidades.
Esses testes automatizados devem ser o mais próximo do ambiente real.

Faz parte também do processo de integração contínua por garantir que o código publicado passe nos testes necessários para ser publicado.

https://medium.com/credera-engineering/how-to-write-unit-tests-for-spark-f8ea22cf6448

#### O que fazer?