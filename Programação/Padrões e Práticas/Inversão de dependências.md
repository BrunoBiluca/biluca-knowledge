---
tags:
  - programação/padrões
---
## Princípio

Uma forma de melhorar a arquitetura em camadas é aplicar o princípio de inversão de dependências:

> [!quote] Definição por Robert C. Martin
> Módulos alto nível devem depender apenas de módulos baixo nível. Ambos devem depender de abstrações (como por exemplo interfaces).
> 
> Abstrações não devem depender de detalhes. .Detalhes devem depender sobre abstrações

A essência dessa definição é comunicar que um componente que provê um serviço de baixo nível (Infraestrutura, por exemplo) deve depender de interfaces definidas pelos componentes de alto nível (Interface de usuário, aplicação ou domínio).

# Vantagens

- Menor acoplamento entre as camadas do sistema