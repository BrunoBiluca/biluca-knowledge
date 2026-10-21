# Curso - Aprenda SDD (Desenvolvimento Orientado a Especificações) com Case Prático Simulando Empresa Real e Claude Code

> [!info] Principais referências
> - [Vídeo](https://www.udemy.com/course/spec-driven-development/learn/lecture/57415419#overview)
>
>Autor: [Fernando Amaral](https://www.udemy.com/user/fernando-amaral-3/)
>
>Aulas: 5 horas

Você já sabe: **a Inteligência Artificial mudou definitivamente a forma como desenvolvemos software.** Ferramentas como Claude Code, Cursor, GitHub Copilot e outros agentes conseguem gerar milhares de linhas de código em poucos minutos. **Mas isso criou um novo desafio**: quanto melhor a IA se torna para escrever código, mais importante passa a ser definir corretamente **o que deve ser construído**.

## Conceitos abordados

- Compreender como a IA está transformando a Engenharia de Software e o papel do desenvolvedor.
    
- Entender os princípios e fundamentos do Spec-Driven Development (SDD).
    
- Escrever especificações claras usando requirements, design e tasks.
    
- Transformar requisitos vagos em especificações completas e verificáveis.
    
- Organizar projetos Spec-Driven para equipes pequenas e grandes.
    
- Aplicar diferentes estratégias de SDD como Greenfield, Brownfield, MVP e Refatoração.
    
- Preparar especificações para trabalhar com agentes de IA como Claude Code e Cursor.
    
- Desenvolver um projeto prático completo utilizando uma empresa fictícia.

## Anotações

### Introdução

Nesse novo mundo de agentes muito poderosos, o desenvolvedor passa a ser um diretor do processo e não mais um executor.

Três princípio guiam esse novo paradigma:

- Agentes poderosos
	- Gerar o código não é mais demorado

- Velocidade extrema
	- Ter uma ideia implementada é mais rápido
	- ❓ Uma dúvida minha é em relação a precisa do que está sendo feito. Não adianta gerar qualquer coisa rápido, eu quero gerar exatamente o que eu quero.

- Ambiguidade custosa
	- Erros de spec geram horas de retrabalho

Principais problemas em desenvolvimento de software

- Requisitos incompletos
- Documentação desatualizada
- Código sem contexto
- Retrabalho constante
- Bugs recorrentes
- Conhecimento concentrado
- Onboarding difícil
- Manutenção cara
- Perda de contexto de negócio

Todos esse problemas continuam existindo utilizando IA no processo, a IA inclusive pode ser um agravante nesses casos.

### O que é Spec-Driven Development

#### Por que especificar antes de implementar?

Vibe coding e código tradicional

- Prompt vago gera código inconsistente
- retrabalho constante
- Ambiguidade acumulada
- IA "adivinha" a intenção

Com SDD

- Especificação clara gera comportamento previsível
- Menos iterações de correção
- Contratos explícitos entre componentes
- IA executa com precisão cirúrgica

#### Gerar código != Gerar Software

**Gerar código -** A IA produz linhas de código sintaticamente corretas. O resultado pode compilar, porém não tem garantia de que faz o que o negócio precisa. É *output técnico* sem compromisso semântico.

**Gerar software -** A IA produz um sistema que cumpre contratos definidos, passa em validações estruturadas e resolve o problema real. É *output funcional* com compromisso de comportamento verificável.

Ainda assim, nenhum dos dois, garante que estamos construindo as coisas certas. Não existe entrega de valor real, sem uso real do software.

#### O que uma especificação deve conter?

- Contexto
	- Qual problema estamos resolvendo? Por que agora? Quem é afetado?

- Comportamento
	- O que o sistema deve fazer - descrito em linguagem declarativa e sem ambiguidade

- Contratos
	- Interfaces, comunicação entre módulos e sistemas

- Restrições
	- Limites técnicos, de performance, segurança e de negócio que a IA deve respeitar

- Critérios de aceite
	- Condições verificáveis que definem "pronto". Cada critério vira um teste.

##### Erros comuns

- Specs gigantes

- Misturar requisitos e implementação

- Duplicar especificações

- Não atualizar a documentação

- Ignorar versionamento

- Tasks antes dos requisitos

### Princípios

- Especificação primeiro

- Especificação como fonte de verdade

- IA como implementadora

- Humano como revisor

- Iteração contínua

- Automação inteligente
	- Testes automáticos
	- Docs geradas
	- CI/CD orientado
	- Revisão automatizada

### Padrões de SDD

#### Workflow - Greenfield

Etapas:

- Especificação (O que e por quê?)
- Arquitetura (Como?)
- Tarefas (pequenas e verificáveis)
- Implementação
- Testes e Iteração
- Deploy

#### Workflow - Brownfield

Em sistemas ligados é necessário entender o sistema para começar a desenvolver uma especificação.

#### Workflow - Feature

Podemos também limitar a nossa aplicação de SDD a uma funcionalidade, reduzindo o escopo de especificação, já que a arquitetura e outras coisas já estão definidas no sistema maior.

### Anatomia de um projeto SDD

Simplificando um sistema SDD é composto por várias especificações. Cada especificação tem um escopo bem definido.

Uma especificação é definida por 3 arquivos:

- **requirements.md** - define o requisito
- **design.md** - define os aspectos técnicos do requisitos, como arquitetura, banco de dados, ferramentas
- **tasks.md** - define cada uma das tarefas que serão executadas para a IA implementar o sistema

Outros arquivos

- ADR
- Glossary
- Template
- Prompts
- Convenções
- Constituição

As especificações são versionadas, permitindo o acompanhamento da sua evolução.

