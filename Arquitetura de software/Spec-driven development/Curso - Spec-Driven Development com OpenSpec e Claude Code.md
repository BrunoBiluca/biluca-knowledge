# Curso - Spec-Driven Development com OpenSpec e Claude Code

> [!info] Principais referências
> - [Vídeo]([https://www.udemy.com/course/spec-driven-development/learn/lecture/57415419#overview](https://www.udemy.com/course/spec-driven-development-com-openspec-e-claude-code/learn/lecture/57075381#overview))
>
>Autor: [Jose Carlos Macoratti](https://www.udemy.com/user/29c064ba-42de-4d29-9aec-1e1734686224/)
>
>Aulas: 4.5 horas

Ao final do curso você terá desenvolvido uma aplicação completa e dominará uma metodologia moderna de desenvolvimento de software orientada por especificações, utilizando Inteligência Artificial de forma muito mais produtiva.
## Conceitos abordados

- Blazor Web App
- .NET 10
- EF Core
- SQLite
- Claude Code
- OpenSpec

## Meus objetivos

Espero ter mais uma visão da utilização de Spec-Driven Development para desenvolvimento de software. 

Esse curso visa desenvolver uma aplicação web completa, então quero entender como a UI ser implementada (uma das minhas grandes dificuldades com essa abordagem de trabalho).

Além disso, não utilizei ainda OpenSpec, essa é uma alternativa interessante ao SpecKit que venho utilizando.

### Considerações

## Anotações

No primeiro protótipo que o autor fez (API de usuários) durante a definição do plano (plan.md) ele descreveu de forma muito simples e direta a estrutura que seria utilizada. 

> [!warning] Qualidade do produto final
> Talvez essa é uma coisa que precisamos avaliar, a quantidade e a forma que as informações são transmitidas para os agentes pode ter relação direta com a qualidade do produto final.

### OpenSpec

Para esse curso o autor utiliza o OpenSpec para organizar a sua organização de SDD.

No caso do OpenSpec ele utiliza 3 etapas para organizar o trabalho:

- **exploração** - define as especificações, planos e tarefas em conjunto com os agentes de IA
- **aplicação** - implementa as alterações de acordo com os elementos criados na etapa de exploração
- **arquivamento** - consolida a solução de forma definitiva no projeto.

**Delta spec** - é a variação da especificação entre o que foi desenvolvido e o que já está definido no projeto.

Antes de iniciar o processo de criação das especificações, o autor advoga na necessidade de ter um Documento de Requisitos de Produto para dar uma visão geral do produto. Dessa forma, cada documento de especificação é um detalhamento de funcionalidades enquanto o DRP é a visão geral.

Etapas nesse processo:

1. Ideia
2. DRP
3. Spec
4. Plano
5. Tarefa
6. Código

### Arquivo DRP

- Visão geral
- Objetivos
- Público-alvo
- Navegação principal
- Elementos específicos com mais detalhes
	- No exemplo aqui, ele descreveu os elementos em cada uma das páginas.
- Fontes de Dados
	- De onde irão vir os dados utilizados pelo projeto, pode usar como formato
- Estrutura do protótipo
### Arquivo Cloud

Esse arquivo é responsável por centralizar todo o contexto do projeto.

- Descrição resumida
- Tecnologias
- Arquitetura
- Organização
- Escopo
- Resumo de cada uma das funcionalidades
- Fora do escopo
- Diretrizes de desenvolvimento
- Dados iniciais
- Estrutura física

Quando melhor definido esse contexto é, mais assertivos os agentes serão.

