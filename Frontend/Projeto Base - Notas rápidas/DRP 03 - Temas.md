# DRP 03 - Temas

> [!important] Resumo
> Deve ser possível alterar entre diversos temas previamente registrados pela própria aplicação.
> Nessa funcionalidade será considerada apenas as cores do tema.

Objetivos:

- Cada usuário pode ter uma estética da aplicação diferente, o que permite maior personalização da aplicação

# Contexto

### Hipóteses

- A partir da implementação de temas é possível abordar vários conceitos de Frontend:
	- Variáveis globais de estilização
	- Gerenciamento de estado global
	- Entrada de configurações por usuário

### Restrições

- Pelo máximo dois temas serão definidos na aplicação

### Dependências

- [[DRP 02 - Notas]] implementado, já que aqui serão definidos todos os principais elementos que serão estilizados

### Dúvidas

- Nenhuma

### Fora do escopo

- Configurar qualquer aspecto estético além de cores

### Referências

- Temas claro/escuro
- Temas de IDEs de desenvolvimento

# Usuários

- Usuário: usuário autenticado

# Requisitos

**Índice**

- [[#RF 01 - Exibição dos temas preestabelecidos]]
- [[#RF 02 - Troca de tema]]
- [[#RF 03 - Manter o último tema escolhido]]

### RF 01 - Exibição dos temas preestabelecidos

__Descrição__
Como usuário quero ver quais são os temas disponíveis para quando quiser escolher qual tema aplicar.

#### Critérios de aceite

**Cenário:** Exibição dos temas
- **Dado** que estou na página de Notas
- **Então** quero ter a visualização dos temas disponíveis
- **E** quero ver o tema atualmente aplicado de forma destacada

### RF 02 - Troca de tema

__Descrição__
Como usuário quero poder escolher um dos temas disponíveis para aplicá-lo.

#### Critérios de aceite

**Cenário:** Troca de tema
- **Dado** que estou na página de notas
- **Quando** eu seleciono um tema diferente do que está aplicado
- **Então** eu vejo a mudança das cores da aplicação (ver seção de performance)

### RF 03 - Manter o último tema escolhido

__Descrição__
Como usuário quero poder abrir a aplicação e carregar o último tema selecionado.

#### Critérios de aceite

**Cenário:** Primeiro tema escolhido
- **Dado** que estou na página inicial no meu primeiro acesso
- **Então** o tema claro será aplicado e é considerado o escolhido

**Cenário:** Último tema escolhido
- **Dado** que estou em qualquer página da aplicação
- **Então** o último tema selecionado deve ser aplicado

# Especificação de arquitetura

## Modelagem

#### Configuração

- Cada tema deve definir:
    - Cores primárias (`primary`).
    - Cores secundárias (`secondary`).
    - Cores de fundo (`background`).
    - Cores de texto (`text`).
    - Cores de bordas (`border`).

## Requisitos não funcionais

#### Performance

A troca de tema não deve causar **recarregamento da página**.

# Qualidade

#### Acessibilidade

Oferecer um tema **high-contrast** (opcional para acessibilidade).

# Esboços ou protótipos de UX

- Tela: nome da tela
- Imagem da tela
- Explicação de cada elemento da tela
- Explicação dos comportamentos da tela