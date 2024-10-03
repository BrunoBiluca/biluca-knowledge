---
tags:
  - inteligência_artificial
---
> [!info] O que é?
> Design ou engenharia de comandos (Prompt engineering) é o processo de definir e refinar as entradas para o modelo a fim de estimular um resultado específico. Esse processo involve definir palavras chave, contexto e formatos de entrada para encorajar o modelo a produzir a resposta desejada.
> 
> Técnicas de engenharia de comandos podem ser utilizados para definir estilo, tom e formato da escrita na resposta gerada pelo modelo, por exemplo.

A utilização de IAs generativas dependem bastante da forma que as ações são especificadas, pode-se mudar completamente o resultado do que foi pedido dependendo da forma que foi descrito esse pedido.

> [!tip] Estratégias de design de comandos
> - [Estratégias gerais de comandos (Google)](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-design-strategies?hl=pt-br)
> - [Engenharia de comandos (AWS)](https://aws.amazon.com/what-is/prompt-engineering/)

Quando fazemos um pedido para uma IA podemos utilizar os seguintes elementos para a construção desse pedido:

- Instruções
- Contexto
- Dados de entrada
- Indicador de saída

> [!tip]- Comando mal estruturado
> 
> ```python
> # Instruções
> Gere um relatório de análise de mercado para uma nova categoria de produto.
> ```
> 
> Esse comando não foi indicado nem contexto, nem entradas nem formato de saída

> [!tip]- Comando bem estruturado
> 
> ```python
> # instrução
> Com base em uma lista de pedidos de clientes e inventário disponível, determine quais pedidos podem ser atendidos e quais itens precisam ser reabastecidos.  
> 
> # contexto
> Essa tarefa é essencial para os processos de gerenciamento de inventário e atendimento de pedidos em empresas de comércio eletrônico ou varejo.  
> 
> # dados de entrada
> Pedidos:
> 
> - Pedido 1: Produto A (5 unidades), Produto B (3 unidades)
> - Pedido 2: Produto C (2 unidades), Produto B (2 unidades)
> 
>   
> Inventário:
> 
> - Produto A: 8 unidades
> - Produto B: 4 unidades
> - Produto C: 1 unidade
> 
> # formato de saída
> Status de atendimento:
> ```
> Aqui já temos todos os principais componentes definidos para encorajar o modelo a produzir uma resposta.

# Técnicas na criação de prompts
### Técnicas do ponto de vista do usuário para melhorar o resultado obtido

- **Especificar as instruções:** quanto mais clara e objetiva uma instrução é mais chances a IA tem de fazer o que foi pedido
	- Iniciar com perguntas é sempre uma boa opção
- **Adicionar alguns exemplos (few-shot):** adicionar exemplos pode ajudar o modelo a identificar os padrões.
- **Detalhar por passo:** para tarefas que envolvem raciocínio, detalhar cada passo do processo ajuda a IA a gerar uma resposta mais coesa.
	- Caso você não saiba detalhar cada passo, peça para a IA pensar no passo a passo, isso também pode ajudar a gerar uma resposta mais coesa.
- **Especificar o formato de saída**
	- Usar diretivas para obter o tipo de resposta como "Forneça a resposta em uma frase completa".
- **Perguntar sobre o raciocínio que a IA utilizou para formular a resposta:** utilizando essa técnica é possível entender qual o caminho que a IA levou para formular a resposta e tentar identificar problemas nesse raciocínio.
- **Prompt negativo:** às vezes, é mais fácil orientar o modelo a gerar uma saída do que não é desejado.

### Técnicas na elaboração do prompt

- Elaboração de prompts zero-shot
- Elaboração de prompts few-shot
	- Pode ser principalmente utilizado para definir padrões personalizados de respostas, por exemplo o tom e estilo de escrita da resposta pode ser personalizado a partir de alguns exemplos fornecidos.
- Elaboração de prompts com cadeia de pensamento (CoT)
- Autoconsistência
- Árvore de pensamentos (ToT)
- [[RAG (Retrieval Augmented Generation)]]
- Raciocínio automático e uso de ferramentas (ART)
- Elaboração de prompts com ReAct

### Parâmetros de inferência

Ao interagir com modelos base, podemos configurar parâmetros de inferência para limitar ou influenciar a resposta do modelo. Estes se encaixam em diversas categorias, sendo *aleatoriedade e diversidade* e *comprimento* as duas mais comuns.

- *aleatoriedade e diversidade*: influenciam a variação nas respostas geradas, limitando as saídas a resultados mais prováveis ou alterando a forma da distribuição de probabilidade das saídas.
	- Temperatura: controla a aleatoriedade do modelo
	- Top P: limita o número de palavras que o modelo pode escolher de acordo com as probabilidades
	- Top K: limita as palavras mais prováveis, independentemente de suas probabilidades percentuais
- *comprimento*: configurações que controlam o comprimento máximo de saída gerada
	- Comprimento máximo: 
	- Sequências de interrupção: As sequências de interrupção são tokens ou sequências de tokens especiais que sinalizam ao modelo para parar de gerar outras saídas

# Riscos e usos indevidos de comandos

- Envenenamento: introdução intencional de dados maliciosos no conjunto de dados de treinamento
- Sequestro e injeção de comandos: o objetivo é sequestrar o comportamento do modelo e fazer com que ele produza saídas que se alinhem às intenções do invasor
- Exposição e vazamento de comandos: divulgação de dados ou entradas que sejam sensíveis ao modelo e não deveriam ser informadas a nenhum usuário.
- Jailbreak é a prática de modificar ou contornar as restrições e medidas de segurança implementadas em um modelo.

