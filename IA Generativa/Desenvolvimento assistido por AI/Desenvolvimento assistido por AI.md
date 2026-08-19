# Desenvolvimento assistido por AI

Com as AI generativas aumentando as suas capacidades um novo formato de trabalho está tomando lugar. Esse formato utiliza principalmente 3 novos elementos: Agentes, MCP e Skills. Os Agentes como a "mão de obra" autônoma, MCP são as "ferramentas" que eles usam, e Skills são o "conhecimento especializado" que eles aplicam.

> [!info] Referências
> 
> - [awesome-copilot](https://github.com/github/awesome-copilot) repositório com várias informações consolidadas para desenvolvimento assistido
>   - disponibiliza Agentes, Instruções, Skills, Plugins e Cookbooks

## Configuração de um projeto

Para utilizar em todo o seu potencial o desenvolvimento assistido é necessário adicionar alguns elementos a estrutura de arquivos de um projeto de software.

Estou levando em consideração para esse exemplo:

- [[Github]]
- [[Github Copilot]]
- [[VSCode]]

### Agentes

Configuração geral do projeto:

- `AGENTS.md` arquivo que descreve informações do projeto
	- Ele age como um centralizador de informações que o Agente terá acesso
	- Todo prompt utiliza esse arquivo como ponto de entrada
	- Um boa prática é adicionar esse arquivo para cada um dos projetos, como backend e frontend
- `copilot-instructions.md` arquivo para permitir utilizar o code review automático do Copilot

Agentes customizados podem ser adicionados para garantir que cada um execute bem a sua parte do processo. Fazer essa separação reduz o contexto necessário para o agente entender melhorando seu resultado.

Exemplos de agentes:

- Agente orquestrador
- Agente planejador
- Agente codificador

![[Agentes|Relação entre os agentes de um projeto]]

> [!tip] O próprio agente geral pode recomendar agentes específicos a partir da descrição do projeto.

### Hooks

Hooks permitem executar scripts automaticamente em momentos-chave do ciclo de vida do agente, como antes ou depois de ele usar uma ferramenta.

Exemplos de hooks:

- Executar prettier sempre que o agente modificar um arquivo de código
- Escanear senhas e credenciais sempre que gerar arquivos de configuração
- Auditoria de código, para verificar a qualidade do código criado

 No [[VSCode]] criamos uma pasta `hooks` contendo:
 
- `*.sh` ou `*.ps1` cada um dos scripts que serão executados
- `hooks.json` utilizado para configuração dos scripts

### Instructions

Instructions são instruções específicas definidas para o agente verificar.

Podemos referenciar esses arquivos de instrução no `AGENTS.md` para deixar o agente sempre ciente dessas instruções, ou podemos referenciar esses arquivos sob demanda.

Formato típico:

```md
---
description: "instrução xpto"
applyTo: "**"
---

bla bla bla
```

Dentro das instruções é uma boa prática **definir o que esperamos e o que não esperamos do agente**, isso leva a um melhor resultado.

Podemos também explicar onde essa instrução se aplica no campo `applyTo`, por exemplo: `**.js` aplica a instrução apenas aos arquivos Javascript.

Exemplos de instruções:

- Garante que o código de UI segue as regras de acessibilidade do [[WCAG]]

### Prompts

Prompts são arquivos de comandos que podem ser reutilizados durante o desenvolvimento do projeto.

### Skills

Skills são pacotes modulares e reutilizáveis que transforma um agente geral em um especialista em um domínio específico.

 Este arquivo contém as instruções, guias e referências que o agente deve seguir. Por exemplo, uma Skill para "Testes de Aplicações Web" com Playwright teria instruções sobre como criar e executar testes.
 
As Skills usam um sistema inteligente de "revelação progressiva" para não sobrecarregar o contexto do agente.

### Workflows

Workflows são uma funcionalidade específica do [[Github]] que permite executar [[Github Actions]] a partir de instruções.

Exemplos:

- Gerar um relatório de problemas detectados diariamente

### MCP Servers

MCP Servers são integrações com outros serviços.

Exemplos:

- Playwright - avaliar a interface gerada
- Github - integração com o Github