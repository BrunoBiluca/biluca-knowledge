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

### Ferramentas do Claude

- **/doctor** - verifica o ambiente de desenvolvimento, pode ser utilizado sempre que o Claude apresentar comportamento inesperado

- **/usage** - uso da sessão, como skills, comportamentos e uso de tokens

- **/plan** - modo de planejamento, esse modo é read-only e permite verificar o projeto e futuras alterações antes de se comprometer a elas

- **/resume** - recupera uma sessão finalizada

### Fluxo de trabalho SDD

Nessa seção será descrito o fluxo de trabalho utilizado pelo autor para implementar a aplicação da Copa do Mundo.

Etapas do desenvolvimento:

1. **Fundação do projeto (Spec)**

Nessa etapa são definidos os principais elementos estruturais do projeto, o OpenSpec quebrou em 4 especificações: project-foundation, domain-entities, databases-setup, seed-data.

2. **Correção do carregamento inicial (Bug)** 

O autor esqueceu de passar algumas especificações de como o agente deveria criar o carregamento inicial de dados. Nesse ponto, ele apenas alterou o código a partir de um prompt e então persistiu esse prompt no `CLAUDE.MD` para futuras consultas dos modelos.

3. **Landing page (Spec)**

A página principal será criada de forma iterativa e em componentes específicos, por isso é importante entender como o Blazor funciona para saber como fazer essa separação.

É definido também os serviços que serão responsáveis para interagir com os dados.

 > [!tip] Skill de revisão
 > Aqui foi criada uma skill para revisão da especificação, quer será sempre executada antes de aplicar o apply.

4. **Revisão do CLAUDE.MD (Manutenção)**

É necessário definido esse arquivo como um repositório arquitetural do projeto. Aqui não faz sentido ter funcionalidades. Isso ajuda o agentes a manter consistência entre as especificações.

Algumas informações:

- Definição padrão de UI
- Caminhos do projeto como relativos
- Regras para o OpenSpec: como manter as especificações enxutas
- Arquitetura

5. **Criação dos jogos nos grupos (Spec)**

Definido da mesma forma que as demais especificações. 

Nessa etapa a interface criada não ficou muito boa e foi necessário um ajuste. O ajuste foi feito diretamente por um prompt sem alterar a especificação. Ele também passou no prompt o arquivo html que ele queria que fosse feita a comparação.

6. **Criação do simulador (Spec)**

Definido da mesma forma que as demais especificações. 

Também foram necessárias alterações aqui, que foram feitas a partir de prompts diretos, nesse mexer na especificação.

7. **Criação de grupos, classificação e resultado dos jogos (Spec)**

Foi necessário quebrar o arquivo `CLAUDE.md` para quebrar as regras de negócio e as decisões de estruturas de dados. Isso foi feito porque a medida que o projeto cresce essas informações crescem, porém o `CLAUDE.md` deve ser enxuto e garantir apenas as informações que não mudam ao longo do projeto.

Todas essas documentações específicas do projeto podem ficar em uma pasta `docs`.

8. **Criação da página das seleções e jogadores (Spec)**

Aqui foi utilizado o modo de planejamento do Claude Code. Esse é um modo apenas de leitura que serve para revisar o projeto e cada uma das futuras alterações. Essa etapa foi utilizada para revisar o que foi feito, estrutura do projeto e outros elementos, permitindo assim, melhorar a estrutura sem adicionar funcionalidades.

> [!tip] Revisão por subagentes
> Nessa etapa o autor utiliza a função de subagentes para aplicar a revisão definida na skill do passo 3.
> 
> Utilizar subagentes é uma boa forma de isolar certos comportamentos e aumenta o foco da tarefa específica que o subagente utilizará.
> 
> No exemplo da Copa, ele cria um agente chamado de `sdd-reviewer.md` que será utilizado sempre que uma revisão da especificação foi requisitada.

9. **Ranking da FIFA**

Definição da especificação como todas as outras.

10. **Jogos da segunda fase e oitavas de final**

Definição da especificação como todas as outras.

11. **Jogos das quartas e das finais**

Definição da especificação como todas as outras.

12. **Terceiro e Final**

Definição da especificação como todas as outras.

13. **Documentação geral do projeto**

Após implementadas as funcionalidades, o autor se vira a criar alguns outros arquivos relacionados a documentação para futuras consultas do projeto.

#### Modelo de prompt padrão utilizado para propor as features

- Breve descrição da feature
- Objetivos
- Contexto
- Escopo
- Fora do escopo

### Pilares de uma boa especificação

- Resultados esperados

- Escopo e não-escopo

- As restrições
	- Regras de negócio
	- Tecnologias
	- Arquitetura
	- Prazos e limites

- Critérios de aceitação

- Os casos de erro e de borda
	- Caminhos de erro
	- Entradas inválidas
	- Casos de borda
	- Comportamentos inesperados

- Objetivos esperado com o resultado gerado

### Revisão do projeto

Para a revisão do projeto serão utilizados vários subagentes um para cada elemento do projeto.

Nesse exemplo, o autor definiu 6 subagentes:

- review-architect
- review-performance
- review-blazor
- review-ui
- review-manager
- orquestrador

