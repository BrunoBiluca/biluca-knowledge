---
tags:
  - inteligência_artificial
  - programação
  - programação/frameworks
---
# LangChain

> [!info] O que é?
> [Introdução ao LangChain](https://js.langchain.com/docs/get_started/introduction)
> 
> LangChain é um framework para desenvolvimento de aplicações alimentado por modelos de linguagem. Ele permite as aplicações:
> - Serem cientes de contexto: conecta um modelo de linguagem em fontes de contexto (instruções de comando, respostas, etc.)
> - Razão: confia em um modelo de linguagem para raciocinar e gerais melhores respostas

Componentes

- **LangChain Libraries**: The Python and JavaScript libraries. Contains interfaces and integrations for a myriad of components, a basic run time for combining these components into chains and agents, and off-the-shelf implementations of chains and agents.
- **[LangChain Templates](https://python.langchain.com/docs/templates)**: A collection of easily deployable reference architectures for a wide variety of tasks. (_Python only_)
- **[LangServe](https://python.langchain.com/docs/langserve)**: A library for deploying LangChain chains as a REST API. (_Python only_)
- **[LangSmith](https://smith.langchain.com/)**: A developer platform that lets you debug, test, evaluate, and monitor chains built on any LLM framework and seamlessly integrates with LangChain.

### Exemplo - Aplicação inicial

> [!info] Documentação
> - [Quickstart do LangChain](https://js.langchain.com/docs/get_started/quickstart)

In this quickstart, we will walk through a few different ways of doing that:

- We will start with a simple LLM chain, which just relies on information in the prompt template to respond.
- Next, we will build a retrieval chain, which fetches data from a separate database and passes that into the prompt template.
- We will then add in chat history, to create a conversational retrieval chain. This allows you interact in a chat manner with this LLM, so it remembers previous questions.
- Finally, we will build an agent - which utilizes an LLM to determine whether or not it needs to fetch data to answer questions.

Durante esse exemplo é feita uma simples integração com OpenAI, possibilitando também adicionar comportamentos esperados a resposta.

```js
import { ChatOpenAI } from "@langchain/openai";  
import { ChatPromptTemplate } from "@langchain/core/prompts";  

const chatModel = new ChatOpenAI({apiKey: "..."});

// Define que o sistema responderá como um escritor de documentação técnica
const prompt = ChatPromptTemplate.fromMessages([  
	["system", "You are a world class technical documentation writer."],  
	["user", "{input}"],  
]);

await chain.invoke({input: "what is LangSmith?"});
```

Resposta (gerador de lero lero total):

```
AIMessage {  
	content: 'LangSmith is a powerful programming language ...',  
	additional_kwargs: { 
		function_call: undefined, 
		tool_calls: undefined 
	}  
}
```

Podemos melhorar a qualidade da resposta fornecida provendo contexto adicional a LLM (Retrieval Chain).

```js
// Lendo o contexto que será adicionado ao LLM
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";  
const loader = new CheerioWebBaseLoader("https://docs.smith.langchain.com/user_guide");
const docs = await loader.load();

// Criando a estrutura que irá acoplar o contexto ao LLM
import { OpenAIEmbeddings } from "@langchain/openai";  
const embeddings = new OpenAIEmbeddings();

// Armazenando o contexto numa estrutura de VectorStore
import { MemoryVectorStore } from "langchain/vectorstores/memory";  
const vectorstore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);

////// INICIO: Configuração do retriever que será utilizado para enriquecer a resposta do LLM
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";  
import { ChatPromptTemplate } from "@langchain/core/prompts";  
import { createRetrievalChain } from "langchain/chains/retrieval";  
  
const prompt = ChatPromptTemplate.fromTemplate(
`Answer the following question based only on the provided context:  
  
<context>  
{context}  
</context>  
  
Question: {input}`
);  

const documentChain = await createStuffDocumentsChain({ llm: chatModel, prompt });  
const retriever = vectorstore.asRetriever();  
const retrievalChain = await createRetrievalChain({ combineDocsChain: documentChain, retriever });
////// FIM

const result = await retrievalChain.invoke({ input: "what is LangSmith?" });  
console.log(result.answer);
```

Após a configuração do retriever as respostas devem ser bem mais precisas:

```
LangSmith is a tool developed by LangChain that is used for debugging and monitoring LLMs, chains, and agents in order to improve their performance and reliability for use in production.
```

