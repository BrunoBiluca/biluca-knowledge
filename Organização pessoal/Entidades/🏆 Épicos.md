# 🏆 Épicos

> [!info] Definição
> Épicos são agrupamentos de [[🏗️ Execuções]] que apresentam um avanço grande na realização do [[Organização pessoal/Entidades/🌟 Valores|Valor]] relacionado.

Os Épicos são principalmente definidos durante o ritual de [[🔬 Refinamento]].

#### Propriedades

- **Nome** - Nome que representa o conjunto de tarefas
- **Período** - (Opcional) Define um período de início e término do Épicos, pode ser utilizado para ajudar na hora da priorização dos valores e até para datas limites
- **Criado em** - Data da criação do Épico
- **Arquivado** - Define se o épico foi finalizado ou não.
- **Completado em** - Data de finalização do Épico.

#### Relações

- **Valor** - Todo Épico deve estar associado a um Valor.
- **Execuções** - Todo Épico deve estar associado a mais de uma Execução

#### Fórmulas

- **Progresso tempo** - Quando definido o Período, a proporção de tempo do início até o término
- **Progresso** - Proporção das execuções concluídas pelo total. Muito útil para verificar o andamento do épico. Também se relaciona com o progresso de tempo que permite indicar se o Épico está atrasado ou não.
- **Prioridade** - Prioridade do Valor relacionado
- **Concluído** - Número de Execuções concluídas
- **Total** - Total de Execuções associadas
- **Está ativo** - Épicos ativos são aquelas que estão sendo trabalhados
	- Um Épico está ativo quando:
		- Não está congelado
		- Não está arquivado
		- Está com alguma Execução com estado "Em progresso" ou "Elencada"
- **Está congelado** - Quando a prioridade do Valor é considerada congelada

#### Visualizações

- **Todos** - Todos os Épicos criados
- **Ativos** - Todos os Épicos com a fórmula "Está ativo" verdadeira
- **Arquivados** - Todos os Épicos arquivados
- **Linha do tempo** - Exibição dos Épicos pelos seus Períodos

#### Conteúdo

- **Objetivo** - Definição clara do que se quer alcançar com o agrupamento das Execuções

#### Gestão

- **Execuções por estado** - Lista de execuções em cada momento dos seus estados
	- Agrupamento: estados das execuções
	- Propriedades:
		- Nome
		- Impacto