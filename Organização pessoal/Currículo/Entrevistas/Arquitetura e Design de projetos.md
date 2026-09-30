# Arquitetura e Design de projetos


> [!example] Como você organiza as camadas no Clean Architecture?

**Conhecimentos abordados:**
- [[Getting Started with DDD]]

- **Domain** - regras de negócio
- **Application** - casos de uso
- **Infrastructure** - banco de dados, APIs externas
- **Presentation** - controllers para endpoints e UI para web/mobile/desktop


> [!example] Quando usar microsserviços?

**Conhecimentos abordados:**
- 

Quando há times independentes, necessidade de escala diferenciada por serviço, e domínios bem definidos. 

Evito se o custo operacional superar o benefício.


> [!example] Como configura um pipeline CI/CD?

**Conhecimentos abordados:**
- [[Integração contínua]]

- Push na branch DEV
- Testes unitários
- Testes de integração
- (Opcional) Linters
- Build
- (Opcional) Deploy em Ambiente de desenvolvimento

- Push na main
- Com os passos anteriores já executados com sucesso
- Deploy em Ambiente de produção

