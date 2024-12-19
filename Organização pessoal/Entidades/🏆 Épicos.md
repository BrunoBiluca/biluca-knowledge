# 🏆 Épicos

> [!info] Definição
> Épicos são agrupamentos de [[🏗️ Execuções]] que apresentam um avanço grande na realização do [[Organização pessoal/Entidades/🌟 Valores|Valor]] relacionado.

Os Épicos são parte fundamental do processo de organização por causa das suas características:

- **Objetivo** que é mais do que a soma individual das Execuções relacionadas
- **Escopo inicialmente delimitado** a fim de mitigar riscos
- **Período de execução** até sua conclusão

Os Épicos são principalmente definidos durante o ritual de [[🔬 Refinamento]], onde o objetivo, escopo, período de execução entre outras características são refinadas a fim de mitigar riscos e garantir fluidez sua execução. Durante o processo de refinamento também é importante ter um pensamento crítico em relação aos objetivos do Épico, seja para adicionar novas Execuções, remover Execuções que não agregam ou também concluir o próprio Épico.

Importante **diferenciar um Épico de uma Execução** e vice-versa, ter o claro entendimento entre as duas entidades é necessário para garantir que estamos criando a **melhor representação um avanço no Valor**.

De forma que:
- Se um Épico foi removido de todas as execuções relacionadas isso remove algum tipo de informação relevante à organização?
	- Em casos positivos dessa pergunta o Épico não é necessário e é apenas uma burocracia.

> [!tip] Enquanto uma 🏗️ Execução tem o escopo fechado uma 🏆 Épico tem um escopo possivelmente aberto.

O **escopo é possivelmente aberto** porque para se alcançar o objetivo de um Épico é necessário que a conclusão das suas Execuções agregadas gerem o Valor desejado. Isso pode ocorrer com um escopo fechado caso o processo de refinamento inicial foi altamente exitoso ou durante as demais iterações e incrementos feitos durante o desenvolvimento do Épico.

### Exemplos de Épicos ruins

#### Livros e Cursos

Por mais longos que sejam são Execuções, já que a união das atividades relacionadas para concluir não entregam na além do que a própria conclusão do livro.

### Exemplos de Épicos bons

#### Versões de softwares

O conjunto das Execuções levantadas entrega para além dos seus valores individuais um valor emergente que é a versão do software. Seja uma versão de MVP que sabemos das limitações desejadas, ou uma primeira versão que já entrega o software funcional e útil.

Se essas execuções não fossem delimitadas pela versão, poderíamos continuar implementando funcionalidades infinitamente e não teríamos uma versão para uso, ou seja, esse Épico define um escopo claro e minimiza o risco de não publicar.

#### Material de Injeção de dependências

Esse Épico foi levantado com o objetivo de gerar um material robusto relacionado a técnica de injeção de dependências em projetos de software. Ele foi separado em várias execuções divididas em estudos, desenvolvimento e descobertas onde cada contribuição individual contribuía na conclusão, porém apenas quando finalizado o Épico temos um material realmente robusto sobre o tema.

Durante o desenvolvimento desse Épico alguns novos estudos sofram propostos para buscar outras formas de explicar o tema. Esse processo foi feito até entender que o conjunto de Execuções concluídas cumpriu o objetivo do Épico.
## Campos

- **Nome** - Nome que representa o conjunto de tarefas
- **Período** - (Opcional) Define um período de início e término, pode ser utilizado para ajudar na hora da priorização dos valores e até para datas limites
- **Criado em** - Data da criação do Épico
- **Arquivado** - Define se o épico foi finalizado ou não.
- **Completado em** - Data de finalização do Épico.

## Propriedades

- **Progresso tempo** - Quando definido o Período, a proporção de tempo do início até o término
	- Essa fórmula nos ajuda a ter uma maior noção de tempo.
- **Progresso** - Proporção das execuções concluídas pelo total. 
	- Muito útil para verificar o andamento do épico. 
	- Também se relaciona com o progresso de tempo que permite indicar se o Épico está atrasado ou não.
- **Prioridade** - Prioridade do Valor relacionado
- **Concluído** - Número de Execuções concluídas
- **Total** - Total de Execuções associadas
- **Está ativo** - Épicos ativos são aquelas que estão sendo trabalhados
	- Um Épico está ativo quando:
		- Não está congelado
		- Não está arquivado
		- Está com alguma Execução com estado "Em progresso" ou "Elencada"
- **Está congelado** - Quando a prioridade do Valor é considerada congelada

## Relações

- **Valor** - Todo Épico deve estar associado a um Valor.
- **Execuções** - Todo Épico deve estar associado a mais de uma Execução

### Conteúdo

- **Objetivo** - Definição clara de um avanço considerável na realização do Valor.
- **Contexto** - Elemento de discussão da necessidade da conclusão do objetivo.
- **Discussão** - Elemento de discussão da execução, como backlog desqualificado, notas gerais, lembretes que não são aplicados a uma execução específica e sim ao conjunto.

### Gestão

- **Execuções por estado** - Lista de execuções em cada momento dos seus estados
	- Agrupamento: estados das execuções
	- Propriedades:
		- Nome
		- Impacto