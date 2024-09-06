---
tags:
  - inteligência_artificial
---
A utilização de IAs generativas depende bastante da forma que as ações são especificadas, pode-se mudar completamente o resultado do que foi pedido dependendo da forma que foi descrito esse pedido.

> [!tip] Estratégias de design de comandos
> - [Conceitos básicos de comandos multimodais](https://cloud.google.com/vertex-ai/generative-ai/docs/multimodal/design-multimodal-prompts?hl=pt-br)
> - [Estratégias gerais de comandos](https://cloud.google.com/vertex-ai/generative-ai/docs/learn/prompts/prompt-design-strategies?hl=pt-br)

Técnicas do ponto de vista do usuário para melhorar o resultado obtido:

- **Especificar as instruções:** quanto mais clara e objetiva uma instrução é mais chances a IA tem de fazer o que foi pedido
- **Adicionar alguns exemplos (few-shot):** adicionar exemplos pode ajudar o modelo a identificar os padrões.
- **Detalhar por passo:** para tarefas que envolvem raciocínio, detalhar cada passo do processo pode não só gerar a resposta desejada como ajudar a IA criar a resposta correta.
- **Especificar o formato de saída**
- **Perguntar sobre o raciocínio que a IA utilizou para formular a resposta:** utilizando essa técnica é possível entender qual o caminho que a IA levou para formular a resposta e tentar identificar problemas nesse raciocínio.

Técnicas de prompts:

- Elaboração de prompts zero-shot
- Elaboração de prompts few-shot
- Elaboração de prompts com cadeia de pensamento (CoT)
- Autoconsistência
- Árvore de pensamentos (ToT)
- [[RAG (Retrieval Augmented Generation)]]
- Raciocínio automático e uso de ferramentas (ART)
- Elaboração de prompts com ReAct