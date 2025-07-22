---
categoria: framework
---
# Remix (React Router)

Remix é construído sobre o [[React Router]] e ele é 4 coisas:

- Um compilador
- Um manipulador HTTP do lado do servidor
- Um framework de servidor
- Um framework de browser

> [!info] Principais referências
> - [Documentação](https://remix.run/docs/en/main/discussion/introduction)
>- 

Remix é uma solução principalmente pensada para utilizar em aplicações web com muitas páginas, onde os dados são altamente dinâmicos e mudam constantemente. Nesse sentido, Remix **não é um framework** para pequenas aplicações que utilizam principalmente dados estáticos.

Ele já é um framework otimizado para execução em lambda functions e workers da CouldFlare o que o coloca em uma opção muito barata de hospedagem. Nesse caso, Remix é muito mais aberto do que [[Next.js]] e pode ser publicado em uma quantidade muito maior de serviços.

Principais funcionalidades

- **Roteamento dinâmico**
- **Erros customizados por componente**
- **Tratamento de formulários com reavaliação dos dados da página**

Principais casos de uso

- **Aplicações com carregamento de dados dinâmico e várias páginas**
	- Esse tipo de aplicação se beneficia da capacidade de roteamento dinâmico, tratamento de erro em nível do componente e carregamento de dados a partir do servidor
	- O servidor de desenvolvimento também ajuda nesse tipo de aplicação por ser extremamente rápido e gerar uma experiência de desenvolvimento melhor