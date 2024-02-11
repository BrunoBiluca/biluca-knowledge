#programação/equipe 
# Pull requests

Toda integração entre as várias frentes de desenvolvimento seram concatenadas por meio do pull request.

Vantagens de utilizar pull requests

- Propagação de conhecimento na equipe
- Garantir de qualidade e padronização do projeto
- Confiabilidade no trabalho desenvolvido

A criação dos pull requests seguem o seguinte formato:

- **feature** finalizada para **develop**
- **bugfix** finalizada para **develop**
- **hotfix** finalizada para **master**
- **release** finalizada para **master**

Nesses casos o pull request deve ser avaliado por todos os membros competentes ao assunto.

## Formato de um pull request

Quando o pull request é criado ele deve seguir o seguinte formato:

```
## Descrição

- [Pode ser removido] O que foi feito?
- [Pode ser removido] Quais as mudanças que a alteração trás no sistema?

- [Pode ser removido] Como foi feito?
    - [Pode ser removido] Alguma técnica que é legal ser compartilhada?
    - [Pode ser removido] Alguma estrutura/biblioteca foi utiliza?

- [Pode ser removido] Por que foi feito?
    - [Pode ser removido] Qual o intuito de fazer essa alteração?
    - [Pode ser removido] Alguma melhoria de performance foi feita?
    - [Pode ser removido] Alguma refatoração de código?
    - [Pode ser removido] Qual o valor que agora podemos trazer para o cliente?

## Testes realizados

- Testes gerais realizados
  - Cenas de demonstrações criadas
  - Cenas de protótipo criadas
  - Quais cenas do projetos foram testadas
- Testes unitários implementados

## Outras informações

- [Pode ser removido] Existe outra proposta para resolver esse problema que seria melhor?
- [Pode ser removido] Alguma outra informação relevante?
```

O que está escrito como **[Pode ser removido]** está no template apenas como referência de desenvolvimento.

O pull request deve ser o mais sucinto e direto possível, para ajudar aos outros integrantes do tipo identificar com exatidão o que realmente foi implementado.
