# Assistente para descoberta de conteúdo

> [!info] Objetivo
> Criar um assistente de IA para a descoberta de conteúdo no Youtube de canais cadastrados. Esse assistente irá utilizar as informações disponíveis no Youtube integrado a um Modelo de linguagem para ajudar a pessoa a encontrar conteúdo específico, coisa que o Youtube não nos ajuda muito (você pesquisa uma coisa e depois de 4 vídeos na lista já trás coisa na a ver).

#### Motivação

Permitir ao usuário que está buscando por conteúdo específicos em canais do Youtube cadastrados ter uma **maior assertividade na sua busca**, em vez de ser influenciado pelo algoritmo do Youtube, que não presa pelo conteúdo e sim pela taxa de exibição de propaganda. Além disso, infelizmente esses conteúdos ficam escondidos para os usuários por conta da organização caótica do próprio Youtube, então permitir um acesso mais simples e direto a esses conteúdos ajuda aos usuários interessados.

Desenvolver **um caso de estudo** para tecnologias de integração entre modelos de linguagem e fontes de dados externas.

Fazer a **comparação** entre o desenvolvimento utilizando [[Model context protocol (MCP)]] e [[Semantic Kernel]] em relação a suas limitações, melhores práticas, ferramentas a fim de criar um material para definir a utilização dessas tecnologias em quais tipos de contextos.


![[Exemplo de pesquisa no youtube.png|Exemplo de pesquisa no youtube que mostra como é difícil de encontrar vídeos de um tema específico]]

#### Referências

Minha principal referência é o vídeo [C# Semantic Kernel Plugins: Get YouTube Video Info!](https://www.youtube.com/watch?v=DJvzBUI9SQ0). Nesse conteúdo o autor cria uma aplicação utilizando [[Semantic Kernel]] que busca informações no Youtube para permitir ao seu usuário pesquisar por vídeos utilizando as legendas como base para a explicação do conteúdo.

A ideia é avançar nesse exemplo, de forma a aprofunda-lo para criar funcionalidades mais amplas.

# Potenciais usuários

- **curioso específico** - pessoa interessada em explorar conteúdos sobre um assunto específico

# Requisitos

### RF 01 Pesquisa por conteúdo específico no título de vídeos de um canal específico

__Descrição__
Eu como curioso específico quero consultar pelo meu assunto de interesse que se encontra no título de vídeos de um canal específico.

__Impacto__
Irá permitir que o usuário encontre conteúdos para o seu assunto de interesse em um canal específico.

__Critérios de aceite__

- Quando a descrição do assunto estiver bem clara na mensagem para a assistente:
	- Deve retornar os vídeos (limitado a 5) que contém título relacionado
		- Informações necessárias
			- Título
			- URL
			- Quando foi publicado
	- Perguntas de exemplo:
		- Quais são 5 vídeos do JonesManoel que falam sobre o MST?

- Quando não existir conteúdo relacionado ao canal a assistente deve explicar isso ao usuário

__Qualidade__

- Capacidade de trazer conteúdos relacionados ao assunto de interesse descrito pelo usuário
	- Dados os vídeos previamente conhecimentos verificar o quão relevantes eles são em relação a busca do usuário

### RF 02 Resumo do vídeo

__Descrição__
Eu como curioso específico quero um resumo de um vídeo para avaliar se está relacionado com o assunto que estou pesquisando.

__Impacto__
O usuário irá poder verificar se o assunto e a abordagem do vídeo o interessa antes de ver, otimizando o tempo gasto na pesquisa de um assunto específico

__Critérios de aceite__

- Informado ao assistentes as informações de um vídeo ele deve trazer o resumo do texto baseado nas legendas.
	- Esse resumo deve ser breve e dar um contexto de todo o vídeo (caso possível já que LLM tem limitação de tokens)
	- Exemplo de mensagens para verificar esse critério:
		- Resuma o vídeo "vídeo"
		- O autor do vídeo cita algum exemplo sobre o assunto do vídeo?

__Qualidade__

- Síntese na elaboração do resumo
	- Capacidade do assistente de abordar de forma breve os principais pontos do vídeo

### RF 03 Perguntas sobre um vídeo específico

__Descrição__
Eu como curioso específico quero perguntar ao assistente questões específicas sobre um determinado vídeo a fim de sanar minhas dúvidas sem precisar de ver o vídeo.

__Impacto__
O usuário poderá antes de ver o vídeo, ter algumas de suas dúvidas sanadas, o que pode aumentar ou diminuir o interesse do usuário de assistir ao vídeo.

__Critérios de aceite__

- 

__Qualidade__

- 

# MVP

Implementação dos requisitos:

- RF 01
- RF 02

Esses requisitos serão implementados em duas versões

- Um terminal de comando de apenas texto utilizando o [[Semantic Kernel]]
- Ferramentas utilizadas na aplicação do Claude Desktop utilizando o [[Model context protocol (MCP)]]

Será utilizado como base de comparação um canal específico a definir, em relação aos últimos 6 meses de vídeos, onde será feita uma avaliação humana para a comparação com as respostas geradas.

#### Hipóteses

- Ao final do desenvolvimento será possível determinar qual ambiente foi mais simples de desenvolver a aplicação.

- Ao final do desenvolvimento será possível determinar qual assistente responde com conteúdos mais satisfatórios e diretos.

- Por utilizar o OpenAI como padrão do Semantic Kernel em contrapartida do Claude do MCP, o Semantic Kernel terá mais facilidade entender a necessidade do usuário.

- Será possível implementar todos os requisitos com ambos métodos.

- Ter um aprendizado das principais dificuldade de implementar design de comandos em relação aos modelos de linguagem.

# Arquitetura inicial

O contexto será o mesmo entre os dois cenários.

#### Tecnologias base

- C#
- [[Model context protocol (MCP)]]
- [[Semantic Kernel]]
- [YouTube Data API](https://developers.google.com/youtube/v3/docs?hl=pt-br)
	- Necessário configuração no [Google Cloud Console](https://console.cloud.google.com/)
	- (Necessário verificar) Existe limites de cotas para as requisições feitas
- (Necessário verificar) [youtube-transcript-api-sharp](https://github.com/BobLd/youtube-transcript-api-sharp)
- [OpenRouter](https://openrouter.ai/)
	- OpenRouter fornece um modelo gratuito do DeepSeek e vários outros modelos que podem ser utilizados para invocação de funções
- Postman para testes em relação a conexão de API

#### Semantic Kernel e OpenRouter

Nesse caso estamos desenvolvimento uma aplicação que acessa um endpoint customizado.

- [OpenAI ChatCompletion custom endpoint](https://learn.microsoft.com/en-us/semantic-kernel/support/migration/v2-openai-migration-guide#5-openai-chatcompletion-custom-endpoint)
	- Esse link tem a documentação para como o endpoint customizado deve ser definido durante a criação do Kernel

- Durante o desenvolvimento eu tentei utilizar o OpenRouter com um modelo gratuito do Deepseek, sem sucesso. Isso porque o modelo importa para o Semantic Kernel, ele precisa de ter a capacidade de chamar funções, o que o modelo do Deepseek previamente tentado não tinha. Quando o modelo foi alterado para `google/gemma-3-1b-it:free` funcionou. Mesmo assim o SDK deveria ter mensagens de erro melhores, já que 404 não informa bem o problema.

> [!warning] Function calling não funcionou
> Por algum motivo quando configurado o chat com um plugin ele não retorna nenhuma resposta.
> 
> Seria necessário um estudo mais aprofundado de invocação de funções
> - [Function calling with chat completion](https://learn.microsoft.com/en-us/semantic-kernel/concepts/ai-services/chat-completion/function-calling/?pivots=programming-language-csharp)


#### Claudie Desktop e MCP

A configuração inicial foi bem simples, mas isso porque não é necessário criar um cliente de IA.

Depuração

```ps1
npx @modelcontextprotocol/inspector uv run assistente_mcp.py
```

Limitações

Não é possível enviar um texto muito grande para o Claude entender, pelo menos na versão grátis. Nesse caso apenas 50 vídeos foram possíveis.

### Para RF 01

```
mensagem 
-> LLM chama função(plugin)
-> REQ todos vídeos do canal 
-> LLM avalia o título dos vídeos 
-> LLM formula resposta
-> apresentação da resposta
```

Exemplo de requisição por vídeos de um canal

```python
# criado pelo deepseek
import requests

API_KEY = 'SUA_CHAVE_DA_API'
CHANNEL_ID = 'ID_DO_CANAL'
url = f'https://www.googleapis.com/youtube/v3/search?key={API_KEY}&channelId={CHANNEL_ID}&part=snippet,id&order=date&maxResults=50'

next_page_token = None

while True:
    if next_page_token:
        response = requests.get(url + f'&pageToken={next_page_token}')
    else:
        response = requests.get(url)

    data = response.json()

    for item in data['items']:
        if item['id']['kind'] == 'youtube#video':
            print(f"Título: {item['snippet']['title']}")
            print(f"ID do Vídeo: {item['id']['videoId']}")
            print(f"Publicado em: {item['snippet']['publishedAt']}")
            print(f"url: {f'https://www.youtube.com/watch?v={item["id"]["videoId"]}'}")
            print("-" * 40)

    next_page_token = data.get('nextPageToken')

    if not next_page_token:
        break
```


### Para RF 02

```
mensagem 
-> LLM define o título desejado pelo usuário
-> LLM chama função(plugin) passando o título
-> REQ legendas do vídeo
-> LLM avalia as legendas
-> LLM formula remuso
-> apresentação da resposta
```

Para buscar as legendas é possível utilizar o [youtube-transcript-api-sharp](https://github.com/BobLd/youtube-transcript-api-sharp) ou [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api) (python). Existem limitações em relação a essa biblioteca já que o próprio Youtube bloqueia IPs que estão utilizando essa biblioteca. Em um produto pode ser necessário pensar em como solucionar isso, talvez armazenando essas legendas.

> [!warning]- Não é possível utilizar API Keys para baixar legendas de vídeos.
> Não é possível utilizar diretamente o Youtube Data API para pegar as legendas de vídeos com API Keys.
> 
> Mensagem de erro quando requisitando o serviço `GET https://www.googleapis.com/youtube/v3/captions/id` com Chave de API:
> 
> >"API keys are not supported by this API. Expected OAuth2 access token or other authentication credentials that assert a principal. See https://cloud.google.com/docs/authentication"