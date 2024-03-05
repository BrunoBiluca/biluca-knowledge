---
tags:
  - backend
  - banco_de_dados
---
# Migrações

> [!info] Migrações
> Migrações são conjuntos controlados de mudanças desenvolvidos para modificar a estrutura dos objetos dentro de um banco de dados relacional. As migrações ajudam a fazer a transição dos esquemas de banco de dados do estado atual para um novo estado desejado, seja isso envolvendo adição de tabelas e colunas, remoção de elementos, divisão campos ou alterar tipos e restrições.
> 
> Os objetivos do software de migração de banco de dados são tornar as alterações do banco de dados repetíveis, compartilháveis ​​e testáveis ​​sem perda de dados.

As migrações são úteis porque permitem que os esquemas de banco de dados evoluam conforme os requisitos mudam. Eles ajudam os desenvolvedores a planejar, validar e aplicar alterações de esquema com segurança em seus ambientes. O esquema do banco de dados e as suposições do aplicativo sobre essa estrutura podem evoluir em conjunto.

A utilização pode causar problemas caso o estado atual do banco de dados não esteja claramente definido. Assim, aplicar o uso de migrações para projetos legados deve ser feito com cautela para evitar perda de dados.

# Tipos de aplicação

Existe duas formas de aplicar migrações a um projeto:

- Baseado em estado
- Baseado em mudanças

### Baseado em estado

Esse formato de migração gera arquivos que definem completamente o estado desejado do banco de dados. Por definir exatamente o estado esperado é necessário cuidado extremo em sua aplicação, já que existe a possibilidade de perda de dados caso o banco de dados e a sua contraparte esperada divirjam.

É principalmente utilizado em cenário onde mudanças são pensadas com bastante antecedência, e mudanças estruturais ocorrem raramente.

Desvantagens
- Alto risco, já que altera de uma vez toda a base de dados
- Necessidade de supervisionamento para que não ocorra perda de dados

### Baseado em mudanças

Esse formato diferente do anterior foca em transformar a base de dados de forma incremental. São feitas etapas que devem ser seguidas em ordem para garantir o estado final do banco de dados.

Esse formato permite uma maior dinamicidade na implementação de novas alterações, já que as alterações são menores e impactam apenas pontos específicos e controlados do banco de dados.

Desvantagens
- Não é possível ter uma visão geral do estado atual do banco de dados
- Resolução de conflitos entre os desenvolvedores deve ser gerenciada

# Fluxo de desenvolvimento

À medida que você desenvolve seu aplicativo, o formato dos dados que você deseja armazenar, os requisitos do sistema de banco de dados e os detalhes específicos que você deseja preservar mudam frequentemente. Isso pode acontecer à medida que você entende o espaço do problema de forma mais completa ou quando recursos adicionais exigem dados adicionais ou um layout diferente das informações atuais. É importante definir essas alterações de esquema à medida que ocorrem durante o desenvolvimento para garantir que os artefatos sejam sincronizados e implementados com o código associado.

As alterações a base de dados devem ser mantidas junto com as alterações de código, gerando assim uma sincroniza entre a execução e o armazenamento.

Após criado o sistema de migrações é necessário validar e testar em um ambiente fora do desenvolvimento. Neste ponto, você precisa garantir que os arquivos de migração se apliquem corretamente ao banco de dados de destino, que o estado de destino inicial compartilhe a estrutura e as suposições que você teve ao desenvolver os arquivos de migração e que os dados mantidos pelo banco de dados não sejam impactados negativamente pelas mudanças que você está fazendo.

# Referências

- [O que são Migrações de Dados](https://www.prisma.io/dataguide/types/relational/what-are-database-migrations)
	- Ótimo resumo conceitual sobre Migrações