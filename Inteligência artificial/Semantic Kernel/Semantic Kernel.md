# Semantic Kernel

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Semantic Kernel é um kit de desenvolvimento open-source, desenvolvido pela Microsoft, para permitir criar simples aplicações integradas a [[Large Language Models]].

--- end-column ---

> [!info] Principais referências
> - [Documentação](https://learn.microsoft.com/en-us/semantic-kernel/overview/)
>- [Github](https://github.com/microsoft/semantic-kernel)
>- [Guia de início rápido](https://learn.microsoft.com/en-us/semantic-kernel/get-started/quick-start-guide?pivots=programming-language-csharp)

---

> [!quote]- Referências externas
> Considerações sobre a referência

--- end-multi-column

Alternativas

- [[Model context protocol (MCP)]]

O Semantic Kernel pode ser facilmente configurado para acessar qualquer LLM disponível.

![[dotnetmap.png|Passo a passo do processo de desenvolvimento de um Kernel que interage com serviços de IA]]


Principais conceitos

- **Kernel** é o principal componente e age como um container de injeção de dependência que gerencia todos os serviços e plugins necessários para executar a aplicação.
- **Plugins** são aplicações chamadas diretamente pelo modelo de linguagem. Podem ser utilizado para acessar recursos externos, como banco de dados ou executar qualquer outra operação.
	- Plugins devem ser bem descritos para que o modelo de linguagem saiba como utilizá-los.
	- Podem ser importados de duas formas: código nativo (simples) ou especificação da OpenAI (serviços externos, como [REST API](https://learn.microsoft.com/en-us/semantic-kernel/concepts/plugins/adding-openapi-plugins?pivots=programming-language-csharp))
- **Planning** e a habilidade da aplicação definir quais são as funções chamadas pelo modelo. O plano nada mais é do que a invocação de uma função com os parâmetros corretos.

### Serviços AI

Uma das principais funcionalidades do Semantic Kernel é possibilitar adicionar diferentes tipos de serviços de IA ao Kernel da aplicação.

- **Chat completion** permite simular uma conversa com um agente de IA. É muito útil para criar chat bots autônomos que completem processos de negócio gerem código e outras ações.
	- É importante que o modelo utilizado tenha a funcionalidade de executar funções, caso contrário não será possível o modelo chamar o código existente.
- **Embedding generation** permite ao modelo geral Vetores ([[Large Language Models#Vetores de embedding]])


### Exemplos

> [!quote]- (Vídeo) - [C# Semantic Kernel Plugins: Get YouTube Video Info!](https://www.youtube.com/watch?v=DJvzBUI9SQ0)
> Tutorial de criação de plugins utilizando Kernel Plugins no contexto de buscar informações sobre vídeos do Youtube.
> 
> Demonstra também algumas limitações e dificuldades em requisitar as tarefas providas pelo plugin, como foi o caso do modelo de linguagem não retornar as legendas do vídeo mesmo que essa informação foi disponibilizada pelo plugin.


