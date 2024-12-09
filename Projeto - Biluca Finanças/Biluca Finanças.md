---
categoria: projeto
ano: 2024
última atualização: 2024-12-09
---
# Biluca Finanças


--- start-multi-column: ID_e76b

```column-settings
Number of Columns: 2
Column Size: [59%, 40%]
border: off
shadow: off
```

Aplicativo centralizador de todas as informações para o controle das finanças de um pessoa ou família.

O serviço deve ser o mais automatizado possível, de forma que o usuário não tenha que ficar cadastrando ou gerenciando informações.

--- column-break ---

> [!info] Links
> 
> - [Repositório](https://github.com/BrunoBiluca/biluca-finances)
> - [Documentação (Obsidian)](https://github.com/BrunoBiluca/biluca-finances/tree/main/docs)

---

> [!quote] Referências
>- [[Curso - Flutter Clean Architecture Full Course For Beginners - Bloc, Supabase, Hive, GetIt]]
>    - Refatoração do código e estruturação do projeto

--- end-multi-column

#### Galeria

--- start-multi-column: ID_pert

```column-settings
Number of Columns: 3
Column Size: [33%, 33%, 33%]
border: off
shadow: off
```

![[Página inicial do Biluca Finanças.png|Página inicial do Biluca Finanças|%cheio]]

--- column-break ---

![[Tabela de prestação de contas.png|Tabela de prestação de contas|%cheio]]

--- column-break ---

![[Importação a partir de um extrato do Nubank.png|Importação a partir de um extrato do Nubank|%cheio]]

--- end-multi-column

#### Principais funcionalidades

- Controle de contas
	- Identificação das despesas e receitas
- Importação de extratos de vários bancos como Itaú e Nubank
- Visualização gráfica de gastos e receitas do mês
	- Discriminação por identificação
	- Comparação com médias dos últimos meses

#### Tecnologias

- [[Flutter]]
	- [[Dart]]
	- [[fl_chart (gráficos)]]
	- [[GetIt]]
	- [[Logging]]
	- [[Mocktail]]
	- [[StaggeredGrid]]
	- [[Flutter/SQLite]]

- [[Python]]
	- SKLearn
	- [[pypdf]]
	- [[PyInstaller]]

- [[SQLite/SQLite|SQLite]]

- [[Inno Setup]] utilizada na compilação do pacote e criação de instalador para windows

#### Motivação

- **Uso da própria aplicação**, ter esse aplicativo me ajuda no dia a dia a controlar contas e investimentos, sem precisar gastar muito tempo com isso, além de confiar na matemática implementada (Nubank por exemplo usa para demonstrar ganho na carteira valores brutos e não líquidos).

- **Estudar um novo framework** de desenvolvimento multiplataforma [[Flutter]]

- Experimentar na criação de **algoritmos ML de categorização** com [[Python]] e SKLearn

- Criar um projeto que irá funcionar como **template para projetos futuros**. Esse projeto está sendo feito de forma que todas as decisões de desenvolvimento sejam documentadas, essas escolhas serão utilizadas como um guia para projetos futuros. Estava precisando de fazer algo assim já que todos os meus projetos tem muitas inconsistências entre eles, mesmo que a filosofia seja bem estruturada.

#### Papéis

Nesse projeto eu desempenhei as seguintes funções:

- Idealizador: levantamento de funcionalidades
- Coordenador: organização de definição das tarefas
- Arquiteto: arquitetura geral da aplicação, definição das tecnologias utilizadas, modelagem dos dados
- Desenvolvedor: implementação do frontend ([[Flutter]]), backend ([[Python]]) e banco de dados [[SQLite/SQLite|SQLite]]
- Designer: criação da experiência de usuário, criação do layout

#### Considerações

- Início muito custoso. Como eu comecei o projeto apenas olhando para a documentação do Flutter foi muito difícil criar momento e avançar nas funcionalidades, por mais básica possível.

- Após a parte mais íngreme da curva de aprendizado, o projeto começou a avançar bastante e está bem legal de desenvolver

- O ambiente de desenvolvimento de Flutter é muito bom (para um framework recente), simples de ser configurado e com ferramentas satisfatórias

- A primeira versão do projeto já entrega todas as funcionalidades planejadas.






