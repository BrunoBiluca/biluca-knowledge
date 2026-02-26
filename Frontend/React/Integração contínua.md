# Integração contínua

Para garantir que a qualidade de uma aplicação criada em [[React]] precisamos publicar continuamente suas alterações a fim de entender seu comportamento.

# Exemplo - Vitest e Browser mode

Esse exemplo utiliza como base:

- [[Frontend/Vite/Vitest/Vitest|Vitest]] no modo Browser
	- [[Configuração do modo Browser]]

Necessário configurar o [[Github]] para fazer as devidas validações:

Caminho dentro do Github para configuração do repositório

```
Repositório 
  -> Settings 
    -> Rules
      -> Rulesets
```

### Comando de execução

```json
// package.json
{
  ...
  "scripts": {
    ...
    "test:ci": "vitest run --browser --config=vitest.browser.config.ts --browser.headless --test-timeout=1000",
    ...
  },
   ...
}
```

- `browser.headless` é obrigatório já que ele executa sem a necessidade de abrir uma instância de browser

### Execução de testes em DEV

```yml
# test-dev.yml
name: Validação e Deploy (DEV)

on:
  push:
    branches: [dev]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout do código
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Instalar dependências
        run: |
          npm i
          npx playwright install --with-deps chromium

      - name: Rodar testes (Vitest)
        run: npm run test:ci
```

### Validação antes do pull request

```yml
name: Validação de Pull Request

on:
  pull_request:
    branches: [main] # Executa quando abrem PR para main
    types: [opened, synchronize, reopened] # Atualiza a cada novo commit no PR

jobs:
  validate:
    runs-on: ubuntu-latest
    permissions:
      issues: write
      pull-requests: write

    steps:
      - name: Checkout do código
        uses: actions/checkout@v4
        with:
          ref: ${{ github.event.pull_request.head.sha }} # Checkout no commit do PR

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Instalar dependências
        run: |
          npm i
          npx playwright install --with-deps chromium

      - name: Rodar testes (Vitest)
        run: npm run test:ci

      - name: Adicionar comentário no PR (se testes passarem)
        if: success()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '✅ **Todos os testes passaram!** Este PR está pronto para revisão e merge.'
            });

      - name: Adicionar comentário no PR (se testes falharem)
        if: failure()
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '❌ **Os testes falharam!** Corrija os problemas antes do merge.\n\n[Veja os detalhes da execução](${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }})'
            });
```

Esse script:

- Executa os testes
- Em caso de sucesso escreve um comentário no PR
- Em caso de falha escreve um comentário no PR