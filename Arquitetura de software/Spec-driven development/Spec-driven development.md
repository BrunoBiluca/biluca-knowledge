# Spec-driven development

> [!quote]- (Aula) - [O que é Spec-driven development por Balta](https://www.youtube.com/watch?v=z6Dg0UhcOvo)
> Explicação geral dos conceitos de Spec-driven development

O Spec-driven development veio como uma forma de trabalho que se contrapõe ao Vibe Coding.

O Vibe Code utiliza como fonte de verdade do projeto o código, porém como esse código passa por muitas mudanças ao longo do tempo, esse formato de trabalho apresenta limitações severas em relação a escala do sistema como:

- Sistema que vive por anos, com manutenção
- Mais de uma pessoa mexendo no mesmo código
- Requisito com regra de negócio de verdade

|                          | Vibe coding             | SDD                       |
| :----------------------- | :---------------------- | :------------------------ |
| **Fonte da verdade**     | O código gerado         | A especificação           |
| **Onde vive o contexto** | Na janela do chat       | No repositório            |
| **Ordem**                | Gerar e depois entender | Entender e depois gerar   |
| **Revisão**              | Opcional                | Em porções, entre fases   |
| **Rastreabilidade**      | Nenhuma                 | Requisito, tarefa, commit |
| **Custo inicial**        | Quase zero              | Alto                      |
| **Custo da mudança**     | Cresce rápido           | Mais estável              |
| **Time**                 | Uma pessoa              | Vários                    |

## Básico

No caso do Spec-Driven Development o código deixa de ser a fonte de verdade e a especificação toma seu lugar. O código passa a ser apenas um elemento gerado pela IA.

- Você escreve a intenção primeiro, em linguagem natural estruturada
- A especificação vive no repositório, versionada com o código
- O código é gerado a partir dela, não o contrário.

> [!warning] Uma dúvida a consolidar
> Me parece um processo muito caro (uso de tokens) esse modelo de desenvolvimento. Quero entender mais sobre esses custos para entender onde esse processo é viável financeiramente, ou até se uma abordagem híbrida pode ajudar.

O Spec-Driven Development se baseia em 4 princípios:

- **Intenção antes de implementação** - primeiro o quê e o porquê
	- Erro comum: citar a stack na spec
- **Especificação executável** - ela alimenta a geração, não só o leitor
	- Erro comum: requisito sem critério
- **Contexto explícito** - nada de regra viva só na cabeça de alguém
	- Erro comum: decisão só no chat
- **Portões de revisão** - humano valida entre uma fase e outra
	- Erro comum: aprovar sem ler

Diferente de uma abordagem Waterfall no Spec-Driven Development o ciclo é curto e a spec muda o tempo todo. O que não muda é a ordem. A spec é versionada em git, com branch e pull request. O custo de mudar a spec tem que ser baixo.

## Etapas

Os elementos (etapas) de uma abordagem Spec-Driven Development são:

- **Constituição** - Princípios do projeto que todas as fases seguintes leem e precisam respeitar
	- `constitution.md`

- **Especificação** - O quê e o porquê
	- `spec-v1.md`

- **Clarificações** - remove ambiguidade
	- `spec-v2.md`
	- Opcional nessa etapa: Portão humano

- **Plano** - O como técnico
	- `plan.md`

- **Tarefa** - Unidades ordenadas de trabalho
	- `tasks.md`

- **Análise** - checagem cruzada
	- `relatório`

- **Implementação** - execução do plano
	- `code/commit`

Cada fase produz um arquivo. Cada arquivo alimenta a fase seguinte. Isso permite uma processo mais claro e remove ambiguidade do que a IA irá gerar.

### Passo 0: Constituição

A constituição é o que não queremos repetir em todo prompt pelo resto da vida. São as regras do projeto que valem pra qualquer funcionalidade a ser adicionada.

- Padrão de código, arquitetura, camadas...
- Política de testes e cobertura mínima
- Requisitos de segurança e tratamento de dados
- Convenções de nomes, commits, estrutura de pastas

Todos os itens da constituição precisam ser verificáveis, então atente-se ao que é tangível ou não durante sua descrição. "Escrever código limpo" não é uma regra, é um desejo. "Nenhum acesso a dados dentro do endpoint" é uma regra, porque dá pra olhar o código e dizer se foi cumprida ou não.

Seu objetivo aqui é editar o arquivo  e adicionar as definições da constituição do projeto, seguindo os critérios que vimos no vídeo.

A constituição fica definida no arquivo `constitution.md`. Abaixo está um template (apenas como sugestão) para implementação da sua constituição.

```md
# Constituição do projeto

## Stack
--

## Arquitetura
--

## Qualidade
--

## Convenções
--

## Governança
--
```

### Passo 1: Especificação

A especificação é onde definimos o escopo do que queremos construir.

- Histórias de usuário e fluxo principal
- Requisitos funcionais numerados
- Casos de borda e o que acontece quando dá errado
- Fora de escopo, tão importante quanto o escopo

> [!tip]
> Uma dica importante aqui é que não entra NADA de tecnologia no Spec, ou seja, nada de EF Core, Postgres, versão de .NET, Minimal API, nada.
> 
> Se você já escreve a stack aqui, você amarrou a solução antes de entender o problema. A especificação responde duas perguntas: o quê e por quê. O como fica pro plano, daqui a pouco.

A especificação fica arquivo `spec.md`. Abaixo está um template (apenas como sugestão) para implementação da sua especificação.

```md
# Gerador de Senhas Fortes

## Problema
--

## Objetivo
--

## Usuários
--

## Histórias
--

## Requisitos funcionais
--

## Regras de negócio
--

## Casos de borda
--

## Fora de escopo
--

## Critérios de aceite
--
```

### Passo 2: Clarificação

A IA para de adivinhar e passa a perguntar.

- O agente lê a spec e aponta o que ficou ambíguo
- Ele faz perguntas fechadas, com opções
- Sua resposta é gravada de volta na spec
- Esse passo pode definir o custo do projeto a longo prazo

### Passo 3: Plano

O plano é o momento que falamos como vamos implementar as especificações.

- Stack, arquitetura, modelo de dados
- Contratos com API e integrações
- Decisões técnicas com a justificativa junto
- Conferência automática contra a constituição

Agora a gente pode falar de tecnologia com uma ressalva: Toda decisão vem com a justificativa do lado. Não é "vamos usar Postgres". É "vamos usar SQLite porque o a regra XYZ exige que a senha seja persistida no banco". Daqui a seis meses alguém vai perguntar por que a escolha foi essa, e a resposta vai estar escrita.

O Plano fica definido no arquivo `plan.md` com as definições do planejamento técnico do projeto Abaixo está um template (apenas como sugestão) para implementação do seu plano.

```md
# Plano técnico

## Contexto
--

## Arquitetura
--

## Decisões
--

## Modelo de dados
--

## Contratos
--

## Riscos
--
```

### Passo 4: Tarefas

Tarefa boa é pequena, ordenada e verificável sozinha. Além disso, é importante que cada tarefa aponte para o requisito que a originou.

- O plano vira uma lista ordenada de tarefas
- Cada tarefa tem critério de conclusão claro
- Dependências ficam explícitas
- Dá para virar issue e distribuir no time

Por que tem que ser pequena? Porque um agente de IA com tarefa grande demais se perde. Ele começa bem, e lá pela metade esquece uma decisão que você tomou lá no começo.

Embora não exista uma “forma correta” de especificar estas tarefas, abaixo tem um exemplo de como elas podem ser feitas:

| ID   | Tarefa                                    | Origem             | Depende de       | Concluída quando                        |
| ---- | ----------------------------------------- | ------------------ | ---------------- | --------------------------------------- |
| T-01 | Criar projeto e estrutura de pastas       | Constituição       |                  | Projeto compila                         |
| T-02 | Modelar a entidade Link e a migração      | RF-01, RF-08       | T-01             | Migração aplica no banco                |
| T-03 | Gerar código aleatório de 7 caracteres    | RF-02, D-03        | T-01             | Teste unitário cobre formato e alfabeto |
| T-04 | Validar URL de destino                    | RN-02, borda 2048  | T-01             | Teste cobre http, https e inválidos     |
| T-05 | Criar link com código automático          | RF-01              | T-02, T-03, T-04 | Teste de integração cria e retorna 201  |
| T-06 | Aceitar código próprio com unicidade      | RF-03, RN-01, D-04 | T-05             | Código duplicado retorna 409            |
| T-07 | Redirecionar por código                   | RF-04              | T-05             | Teste de integração retorna 302         |
| T-08 | Incrementar contador de forma atômica     | RF-05, RN-04, D-02 | T-07             | Teste concorrente não perde contagem    |
| T-09 | Endpoint de estatísticas com chave        | RF-07, DC-03       | T-05             | Chave errada retorna 401                |
| T-10 | Cache em memória dos links mais acessados |                    | T-07             | Latência de redirect cai                |

As tarefas ficam definidas no arquivo `tasks.md` com as definições das tarefas do plano técnico projeto. Abaixo está um template (apenas como sugestão) para implementação das tarefas como acima.

```md
# Tarefas

| ID | Tarefa | Origem | Depende de | Concluída quando |
|---|---|---|---|---|
| T-01 | Criar projeto e estrutura de pastas | Constituição | | Projeto compila |

```

### Passo 5: Portões de qualidade

Aqui a IA revisa o trabalho da própria IA, antes de escrever código.

- Análise cruzada entre constituição, spec, plano e tarefas
- Aponta contradição, requisito órfão, tarefa sem origem
- Checklists de qualidade por tipo de risco
- Tudo isso ainda sem uma linha de código escrita

### Passo 6: Implementação

O agente executa tarefa por tarefa, com um mapa na mão.

- Execução incremental, na ordem definida
- Cada tarefa gera um commit rastreável
- Falho? Volta para tarefa, não pro prompt
- A revisão humana continua obrigatória

Agora chegou a hora de gerar o sistema, utilizando o **prompt** descrito abaixo. No **Visual Studio Code** e na lateral direita, na coluna do **Copilot**, digite o seguinte prompt:

```md
Implemente APENAS a tarefa XXX do arquivo tasks.md.

Contexto obrigatório, siga à risca:
[cole constitution.md]
[cole a seção Decisões do plan.md]

Regras:
- Não implemente nenhuma outra tarefa
- Não altere arquivos fora do escopo da tarefa XXX
- Escreva o teste unitário junto, conforme a constituição
- Ao final, liste o que você mudou e qual requisito isso atende
```

Não esqueça de substituir as variáveis no prompt com seus dados reais.

### Ciclo na termina na entrega

Mudou o requisito? Muda a spec primeiro, sempre.

- Nova funcionalidade abre um novo ciclo
- Correção de comportamento atualiza a spec
- Spec e código evoluem no mesmo commit
- Spec desatualizada volta a ser documentação morta

## Ferramentas

- [Spec Kit](https://github.com/github/spec-kit) do Github

É um kit de ferramentas código aberto que permite estruturar o processo que os agentes utilizam para gerar código.

- Copilot, Claude Code, Cursor, Gemini CLI

São os Harnesses que permitem alterar arquivos no seu computador e executar programas

- Todos os artefatos gerados são markdown no seu repositório

É possível fazer SDD sem nenhuma ferramenta, já que trata de uma disciplina adotada no projeto.