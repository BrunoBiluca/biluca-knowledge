#roles

Um dos fatores que complicam o desenvolvimento de software é a falta de clareza nas atribuições de cada colaborador ao projeto. 

> 💡 Ter clareza no papel de cada integrante no projeto facilita a comunicação e acelera o processo de desenvolvimento.

A clareza na definição dos papéis dentro de um projeto resolve vários dos problemas comuns que acontecem no desenvolvimento de software, como:

- Configuração do time mal definida
- Todos os colaboradores fazem de tudo no projeto
- Falta de clareza quando necessário reportar um problema específico
- Falta de responsabilidade na execução do projeto (o famoso isso é fulano que faz)

Uma forma de reverter esse tipo de problema é definir os papéis dentro do time.

- Criar um documento com as definições dos papéis dentro da equipe.
  - Esse documento deve definir todos os papéis dentro do time, desde o programador e design na ponta até a maior hierarquia (cuidado com hierarquias, elas são gargalos no desenvolvimento e devem ser evitadas) dentro do time.
  - Deve apresentar exemplos de atribuições para cada papel dentro da equipe
- Criar cultura da importância dessas definições.
- Esse documento deve ser mantido e atualizado a cada alteração na equipe e no projeto.

> ⚠️ O **Gestor** é o papel responsável pela criação e manutenção da documentação de definições de papéis de todo o time.

A utilização de uma documentação clara das definições dos papéis de uma equipe geram várias vantagens durante o desenvolvimento, entre elas:

- Visibilidade dos integrantes do time
	- Cada integrante sabe exatamente qual a sua responsabilidade dentro do desenvolvimento
- Visibilidade dos canais de comunicação
	- Quando um bloqueio se mostra diante do time, dada a definição da natureza do bloqueio é simples de identificar os responsáveis pela remoção do bloqueio
- Onboarding de novos membros facilitado
	- Novos integrantes do time conhecem cada atribuição de uma vez

# Papéis

- [[PO - Product Owner (Gestor do projeto)]]
- [[Desenvolvedor]]
- [[QA - Quality Assurance]]
- [[Stakeholders]]
- [[Game Designer]]
- [[Artista Designer]]

# Documento de definição de papéis dentro do time

> **Nome do documento:** Papéis do time

```md
<!-- Nome do arquivo: Papéis do time -->

# Integrantes do time

| Integrante | Papéis                              | Contato               |
| ---------- | ----------------------------------- | --------------------- |
| Fulano 1   | Frontend developer                  | email                 |
| Fulano 2   | Backend developer                   | email                 |
| Ciclano 1  | Backend developer, System Architect | email                 |
| Ciclano 2  | SM                                  | email                 |
| Beltrano 1 | QA                                  | email                 |
| Beltrano 2 | Manager                             | email, Whatapp número |

# Grupos de conversa do time

| Nome             | Plataform | Descrição                                            |
| ---------------- | --------- | ---------------------------------------------------- |
| Grupo Tal        | Whatsapp  | Grupo de conversa sobre tecnologia dentro do projeto |
| Grupo Tal Gestão | Whatsapp  | Grupo de gestão dentro do projeto                    |

# Links relacionados

Referencia para o documento de `objetivo do projeto`;

```

### Fluxo de levantamento de papéis para projetos legados

```mermaid
flowchart TB

dtm(Definir o Gestor)
dr(Definir os papéis do projeto)
ar(Levantar os papéis de cada integrante)
rp(Redefinir os papéis de cada integrante)
doc(Documento criado/atualizad0)

teamManager1{{Gestor}}
teamManager2{{Gestor}}
teamManager3{{Gestor}}
teamManager4{{Gestor}}
integrante{{Integrantes}}

teamManager1 --> teamManager2 --> teamManager3 --> integrante --> teamManager4

dtm --> dr --> ar --> rp --> doc
```

### Fluxo de levantamento de papéis para projetos novos

```mermaid
flowchart TB

dtm(Definir o Gestor)
dr(Definir os papéis do projeto)
ar(Buscar na equipe integrantes)
rp(Atribuir os papéis de cada integrante)
doc(Documento criado)

teamManager1{{Gestor}}
teamManager2{{Gestor}}
teamManager3{{Gestor}}
teamManager4{{Gestor}}
integrante{{Integrantes}}

teamManager1 --> teamManager2 --> teamManager3 --> integrante --> teamManager4

dtm --> dr --> ar --> rp --> doc
```

# Desenvolvedor

O desenvolvedor é o responsável por trabalhar nas necessidades do produto.

> 💡 O principal papel do desenvolver é garantir que as funcionalidades sejam implementadas de uma forma otimizada e que satisfaçam o requisitos do produto.

Principais responsabilidades dentro do time:

- Desenvolvimento do produto
  - Garantir que a funcionalidade implementada satisfaça o requisito do produto
- Levantamento de otimizações
- Refinamento das Histórias
	- O refinamento pode ser feito de várias maneiras como prototipação, reunião de refinamento, estudo de viabilidade.

## Líder técnico

O Líder de desenvolvimento é uma função adicional ao papel de desenvolvedor que visa mobilizar a equipe levantar e seguir disciplinas de desenvolvimento. O Líder técnico pode ser qualquer integrante do time e é uma boa prática que esse papel seja rotacionado durante o desenvolvimento do projeto.

As principais responsabilidades dentro do time são:

- Mobilizar a equipe técnica a criar processos e padrões de desenvolvimento
- Documentar os processos e padrões criados
- Levantar Histórias de automação desses processos e padrões a fim de melhorar o trabalho desempenhado pelo time.

O Líder técnico pode começar com um dos integrantes mais experientes do time, que pode ser alterado de tempos em tempos de acordo com disponibilidade.

> [!tip] Como não ser um Líder técnico
> O Líder técnico não define nenhum tipo de implementação ou solução na História que não é responsável. 
> Ele deve ser tratado como um desenvolvedor qualquer dentro do time técnico, e qualquer consideração de melhoria deve ser apresentada no Code Review como qualquer outro integrante.