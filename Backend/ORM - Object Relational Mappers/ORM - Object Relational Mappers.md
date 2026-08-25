---
tags:
  - programação/padrões
  - banco_de_dados
---
# ORM - Object Relational Mappers

ORM (_Object-Relational Mappers_) é uma ferramenta fundamental para qualquer desenvolvedor que trabalha com bancos de dados relacionais. Ele permite acessar os dados usando a **sintaxe de objetos** em vez de SQL, tornando o código **mais limpo** e fácil de dar **manutenção**.

Características de um ORM

- Facilidade de uso
- Abstração do banco de dados em objetos e classes da linguagem utilizada
- Adaptação a diversos bancos de dados relacionais
- Provê imunidade contra SQL-injection
- Garante a consistência entre o banco de dados e a aplicação (migrações, modelos de dados...)

# ORM assíncrono

Os bancos de dados atualmente são extremamente rápidos para operações simples, e por isso na maioria das vezes não se faz necessário um ORM assíncrono. O problema é quando você precisa lidar com muitas tarefas simultâneas, onde algumas podem inclusive bloquear o I/O (**input/output**, ou escrita/leitura) por tempo arbitrário.

Por exemplo, uma aplicação de bate-papo que atende milhares de usuários simultaneamente. A última coisa que você deseja é ter milhares de threads esperando a resposta de cada um desses usuários, pois isso consumirá desproporcionalmente muitos recursos de hardware. 