# Model context protocol (MCP)

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

MCP é um protocolo aberto, criado pela [Anthropic](https://www.anthropic.com/), que padroniza como aplicações fornecem contexto para [[Large Language Models]]. 

O MCP ajuda a criar agentes de linguagem natural (ChatGPT e similares) para outras fontes de dados fora os modelos criados. Por ser um protocolo aberto vários tipos de conectores estão sendo desenvolvido e disponibilizados.

--- end-column ---

> [!info] Principais referências
> - [Documentação](https://modelcontextprotocol.io/introduction)
>- [Github](https://github.com/modelcontextprotocol)
>- [Tutorial de desenvolvimento de MCP com LLMs](https://modelcontextprotocol.io/tutorials/building-mcp-with-llms)
>- [Conceitos arquiteturais](https://modelcontextprotocol.io/docs/concepts/architecture)
>
>- [MCP Python SDK](https://pypi.org/project/mcp/) tem apresenta uma parte da documentação que está melhor que no site principal

---

> [!quote]- Referências externas
>- [[Assistente para descoberta de conteúdo]] foi um MVP que implementei o algumas funcionalidades utilizando MCP

--- end-multi-column

![[Arquitetura MCP.png|Exemplo de uma arquitetura implementada utilizando MCP para fontes adicionais de informações]]

O MCP é basicamente composto de 5 entidades:

- **MCP Hosts** são os programas que acessam os dados pelo MCP
- **MCP Clients** são o clientes que mantém conexão com os servidores
- **MCP Servers** são os programas (geralmente leves, podem ser um AWS Lambda ou Azure Function) que especificam suas capacidades por meio da padronização do MCP
- **Fontes de dados locais**
- **Fontes de dados remotos**

O que acontece por baixo dos panos quando se fazer uma consulta com ferramentas integradas:

- O cliente envia a pergunta para o Claude
- O Claude analisa entre as ferramentas disponíveis qual deve usar
- O cliente executa a ferramenta escolhida a partir do servidor MCP
- Os resultados são enviados de volta ao Claude
- Claude formula uma resposta em linguagem natural
- A resposta é exibida para o usuário

Mesmo que o MCP tenha um principal modelo como backend ([Claude](https://www.anthropic.com/claude)) ele também pode ser utilizado com outras LLMs, como [[Microsoft OpenAI]] ou Google Gemini. Aqui tem um [exemplo de como utilizar outras LLMs com MCP](https://www.philschmid.de/mcp-example-llama).

Alguns [exemplos de serviços (MCP Servers)](https://modelcontextprotocol.io/examples) criados pela comunidade são:

- [Google Drive](https://github.com/modelcontextprotocol/servers/tree/main/src/gdrive)
- [Obsidian](https://github.com/smithery-ai/mcp-obsidian)

Outros componentes importantes para o desenvolvimento de serviços MCP:

- [Inspector](https://modelcontextprotocol.io/docs/tools/inspector) ferramenta iterativa para testes e depuração
- **Claude Desktop Developer Tools** pode ser utilizado para testar a integração com os serviços e pelo sistema de Log

### Serviços MCP

Serviços MCP podem providenciar principalmente 3 tipos capacidades:

- [Resources](https://modelcontextprotocol.io/docs/concepts/resources) são tipos de arquivos lidos pelo cliente (como requisições API ou arquivos), ajuda a IA ter noção de quais recursos estão disponíveis para a execução da consulta
	- Ele pode ser utilizado como base para todas as consultas no chat. Por exemplo, no assistente teste os canais disponíveis eram disponibilizados em um recurso.
- [Tools](https://modelcontextprotocol.io/docs/concepts/tools): são funções chamadas pelo LLM
- [Prompts](https://modelcontextprotocol.io/docs/concepts/prompts): são templates pré-escritos que ajudam o usuário a cumprir algumas tarefas específicas. Mais sobre em [[Design de comandos (Engenharia de prompts)]].

### Limitações

> [!quote]- (Artigo) - [Anthropic's MCP: First impressions as a developer](https://www.chriswere.com/p/anthropics-mcp-first-impressions)
> Primeiras impressões desenvolvendo utilizando MCP (27/11/2024)

O MCP é muito dependente da forma que o **desenvolvedor descreve seus serviços.** O LLM irá apenas chamar o serviço se entender que a intenção do usuário seja executar a ação. Nesses casos quanto melhor a descrição das funções e de seus parâmetros mais chances do LLM executa-lo.

