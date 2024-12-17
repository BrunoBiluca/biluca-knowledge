# 📕 Documentação de sistemas de software

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

A documentação é um componente de um projeto de software que provê informações sobre o software e seus comportamentos. 

A documentação não é uma coisa única e amorfa, é importante entender os diversos tipos de documentações e a audiência que as irá consumir para direcionar melhor os esforços e o tipo de informação necessária.

--- end-column ---

> [!info] Principais referências
>- 

---

> [!quote]- Outras referências
> - [Artigo - Software Documentation Best Practices [With Examples]](https://helpjuice.com/blog/software-documentation)
> 	- Apresenta vários aspectos de documentação de software com exemplos de melhores práticas
> - [Artigo - Technical documentation in software development types best practices and tools](https://www.altexsoft.com/blog/technical-documentation-in-software-development-types-best-practices-and-tools/)
> 	- Ótimo resumo dos principais aspectos sobre documentação em projetos de software

--- end-multi-column

Alguns tipos comuns de documentação são:

- **Manuais de uso** que permite prover informações relevantes aos usuários para a utilização correta de algum produto
- **Documentação técnica** que permite aos desenvolvedores terem mais informações sobre o software
- **Documentação procedural** que descreve passo a passo processos de configuração ou publicação do produto

# Por que documentação é importante?

A documentação é uma entidade controversa dentro do desenvolvimento de software. 

Várias pessoas acham que ela é desnecessária e que o código deve ser documentado por si só.

Essas pessoas não estão erradas, o código deve ser responsável por explicar para o desenvolvedor de forma clara **o que está sendo feito e como está sendo feito**. Porém uma documentação bem feita, pode dar uma visibilidade maior ao que está sendo feito pelo código e possibilitar até pessoas que não são desenvolvedores a entender as regras que estão implementadas e como elas se comunicam.

# Onde a documentação do projeto deve ser escrita?

Um dos maiores contras da documentação de código é que várias vezes ela é escrita separada do código. Isso é uma desvantagem por ser necessário alterar a documentação sempre que alguma alteração no código seja adicionado. Nesse ponto **vários defeitos** podem ocorrer, como: esquecimento dos integrantes do time na atualização da documentação, documentação equivocada do código (documentação fala uma coisa e o código diz outra), até a falta de documentação. Além de todos esses problemas a documentação vira um esforço a mais no desenvolvimento que pode ser ignorado pelo time.

Levando em consideração o **princípio DRY** a documentação do projeto deve estar relacionada ao código de forma que qualquer alteração no código seja uma alteração na documentação, já que eles fazem parte do mesmo conceito.

A utilização do princípio DRY nesse caso resolve a maioria dos defeitos causados pela documentação separada.

Vantagens:

- Documentação gerada automaticamente
- Consistência entre documentação e código
- Visibilidade do código

# Tipos de documentações

Um aspecto importante da documentação é pensar que ela não é algo único e sem forma, uma boa documentação é dividida dependendo de vários aspectos como:

- o leitor alvo
- o tipo de informação a ser destacada
- o tipo de linguagem adotada
- onde essa informação deve estar disponibilizada

Pensando nisso **separar os tipos de documentações em nossos projetos nos ajuda a direcionar melhor os esforços** para o que queremos fazer. É muito normal começarmos uma documentação e ao longo do desenvolvimento acabarmos abandonando-a, já que ela vira um amontoado de ideias sem muito coesão. Assim, uma boa documentação deve ser pensada junto com o processo e não como um elemento separado, ela deve ser mantida, revisada e reescrita igual o código.

Os tipos de documentações mais comuns são

- Documentação do projeto
- Documentação da gestão
- Documentação do sistema
- Documentação do usuário

Utilizando esses tipos já conseguimos ter um domínio enorme do projeto, permitindo uma maior previsibilidade e fluidez no desenvolvimento.

## Documentação do projeto

--- start-multi-column: ExampleRegion1  

```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

A documentação do projeto é possivelmente a primeira documentação trabalhada. Ela consistem de definir de forma clara a todos os envolvidos no projeto seus objetivos, metas, prazos, responsabilidades e progresso.

--- end-column ---

> [!info] Alvo da documentação
> Rodos os envolvidos no desenvolvimento, principalmente os cargos que focam em partes mais gerenciais, como coordenadores, arquitetos, analistas de qualidade...

--- end-multi-column

Principais elementos da documentação do projeto

- Objetivos
- Metas
- Prazos
- Responsabilidades
- Progresso
- Critérios de sucesso: quando consideramos que o projeto está sendo exitoso
- Potenciais riscos

*No meu entendimento* esse tipo de documentação pode ser diluído no próprio sistema de gerenciamento do projeto, onde prazos, metas, objetivos, progresso e os demais elementos sejam convertidos em histórias, épicos, critérios de aceite...


> [!quote]- (Artigo) - [Project documentation guide](https://www.proprofskb.com/blog/project-documentation-guide/)
> Apresenta um guia para a criação de documentações de projetos.

## Documentação do sistema

--- start-multi-column:
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

É um tipo de documentação de produto que descreve o sistema e suas partes. Nela incluem os documentos de requisitos, decisões de projeto, descrições arquiteturais, modelagem das estruturas do projeto entre outros.

--- end-column ---

> [!info] Alvo da documentação
> - Desenvolvedores (programadores, designers, analistas de qualidade...) a fim de manter a consistência do sistema
> - Coordenadores (arquitetos, POs, coordenadores...) a fim de evoluir o sistema

--- end-multi-column

Essa documentação tem uma abordagem mais descritiva do sistema e tem como **principal vantagem ajudar na tomada de decisões**, já que esse material nos permite ter uma ideia mais simplificada do sistema como um todo e de suas partes.

Alguns tipos comuns de elementos que compõem essa documentação:

- Diagramas de arquitetura, classes, entidade-relacionamento...
- Múltiplos documentos de requisitos
- Design UX
- Atividades QA

### Documento de requisito

Um documento de requisito provê informações sobre funcionalidades e comportamentos do sistema.

Principais elementos:

- **Objetivos:** aspectos mais relevantes com o desenvolvimento do objetivo.
- **Contexto:** informações que levaram definir o requisito como algo relevante.
- **Suposições:** O que a equipe espera com o desenvolvimento do requisito?
- **Tarefas ou Histórias de usuários:** levantamento de tarefas, histórias e elementos mais concretos para o desenvolvimento do requisito
- **Critérios de aceite:**  condições que indicam que o requisito está concluído.
- **Interação do usuário e design:** guias gerais de comportamento do sistema perante interação com usuário, desenhos de pouco fidelidade que demonstrem a usabilidade do requisito
- **Questões:** dúvidas levantadas pela equipe durante o levantamento do requisito e suas justificativas. É uma seção interessante para consolidar algumas decisões tomadas no requisito.
- **Fora do escopo:** lista de coisas que não estão planejadas para esse requisito. É uma forma também de definir o escopo, as vezes falar o que não fazer reforça os principais objetivos do requisito.

### Documento Design UX

O documento Design UX começa nos estágios de planejamento e permeia todos os demais estágios do desenvolvimento, incluindo testes e pós-publicação.

Principais elementos

- Pesquisa
- Prototipação
	- Mapas
	- Wireframes
	- Mockups
	- Protótipos
	- Jornada do usuário
- Testes de usabilidade

Também é possível fazer esse tipo de documentação utilizando

- Personas de usuários
- Cenários de usuários
- Mapas de cenários

### Documento de arquitetura

O documento de arquitetura inclui as principais decisões tomadas no nível mais macro de abstração do projeto. Ele visa descrever a forma que deve ser construído o projeto, de forma a incluir a descrição de soluções, algoritmos, estratégias e métodos para concluir o desenvolvimento dos requisitos.

Esse tipo de documentação não deve ter muitos detalhes e focar em descrições mais gerais sobre os elementos do sistema. Uma boa forma de representar o sistema é utilizar diagramas, fluxos e outros elementos visuais para definir de forma muito mais direta as relações e comportamentos esperados.

Essa é uma parte muito importante da documentação do sistema, ela sendo bem feita **permite ao time de desenvolvimento ter grande domínio sobre o funcionamento do sistema e consequentemente facilita na hora de evoluir o mesmo**, já que estruturas previamente criadas e documentadas viram um ponto de partida para futuros requisitos.

Principais elementos

- Diagramas de classes, modelo-entidade, entidade-relacionamento...
- Requisitos não funcionais
- Descrição da arquitetura em alto nível
	- Uma bom formato disso é [[Modelo C4]]
- Visão detalhada do sistema: apresentação de todos os componentes do sistema e suas interações
- Descrição de estratégias e soluções técnicas: descreve algoritmos utilizados e a justificativa dessa decisão, também podem ter descrições de porque outra estratégia não foi adotada.
- Descrição da infraestrutura e formato de publicação

### Documento de Qualidade

O documento de qualidade foca em descrever as garantias que o sistema e suas partes precisam devem apresentar para considerarmos válida a experiência desejada para o usuário.

Principais elementos

- Planos de gerenciamento de qualidade: documento que descreve os padrões para a qualidade do produto e os métodos para alcançar isso.
- Plano de testes: documento detalhado que define os objetivos, recursos, escopos e calendários para atividades de testes dos projetos. 
- Especificações de casos de uso: conjunto de informações detalhadas para cada funcionalidade do produto.
- Listas de testes: listas de testes que podem ser executados a qualquer momento do projeto a fim de garantir o comportamento desejado.

### Documento de API

Para produtos que envolvam Interfaces programáticas é necessário descrever como essa interface funciona para que clientes possam utilizar.

Preferencialmente a documentação deve ser definida junto ao código, já que qualquer mudança do código pode impactar uma mudança na interface. Caso essa documentação seja disponibilizada de outra forma, então deve ser levantado um processo para qualquer alteração na interface desse produto.

Exemplos

- Uma biblioteca deve ter a documentação de API primariamente disponibilizada no próprio código, permitindo assim ao desenvolvedor verificar em nível de escrita do código as principais estruturas. Também é possível disponibilizar essa informação separada, porém nesses casos é imprescindível criar um processo para manter essa documentação atualizada.

- Um servidor pode disponibilizar uma documentação pelo Swagger para seus clientes.


## Documentação do usuário

É um tipo de documentação de produto que cobre principalmente a preparação do usuário final na utilização do sistema, seja este usuário administrador ou não do sistema.


## Documentação da gestão (ou de processo)

A documentação da gestão é o local que a equipe descreve o processo de gestão do desenvolvimento do projeto.

Principais elementos

- Mapas do produto
- Planos de publicação
- Backlogs
- Metodologias, estratégias, planos e padrões organizativas




