# RAG (Retrieval Augmented Generation)
Em português: Geração aumentada de recuperação.

  
> [!info] Definição
> Retrieval-augmented generation (RAG) is an AI framework for improving the quality of [LLM-generated](https://www.youtube.com/watch?v=hfIUstzHs9A) responses by grounding the model on external sources of knowledge to supplement the LLM’s internal representation of information.
> 
> - It ensures that the model has access to the most current, reliable facts
> - Users have access to the model’s sources, ensuring that its claims can be checked for accuracy and ultimately trusted.
>   
>  [Artigo sobre RAG da Amazon](https://aws.amazon.com/pt/what-is/retrieval-augmented-generation/)

O processo de geração de respostas precisas e úteis precisa ser bem sucedido em vários aspectos da pergunta como:

- Compreensão da pergunta
- Recuperação de informações relevantes
- Compreensão do contexto
- Raciocínio e inferência
- Geração de resposta
- Avaliação da Qualidade da Resposta

Processo de geração aumentada de recuperação

- Criação de dados externos (Dados externos são todo dado que não faz parte do conjunto de treinamento inicial)
- Recuperação de informações relevantes
- Enriquecimento de prompts (entrada do usuário) fornecidos ao LLM
- Atualização de dados externos

O diagrama a seguir mostra o fluxo conceitual do uso de RAG com LLMs.

![[Fluxo conceitual do uso de RAG com LLMs.jpg|Fluxo conceitual do uso de RAG com LLMs|500]]

### Serviços de RAG cloud

- [[Amazon Bedrock]]
- [Amazon Kendra](https://aws.amazon.com/pt/kendra/): um serviço de pesquisa empresarial inteligente, com as soluções de pesquisa tradicionais.
