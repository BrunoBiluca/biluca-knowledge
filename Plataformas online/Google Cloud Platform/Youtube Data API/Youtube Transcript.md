# Youtube Transcript

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

É uma biblioteca que permite fazer download de legendas de vídeos, seja manual ou gerada automaticamente.

--- end-column ---

> [!info] Principais referências
> - [Github](https://github.com/BobLd/youtube-transcript-api)

--- end-multi-column

> [!warning]- Não é possível utilizar API Keys para baixar legendas de vídeos.
> Não é possível utilizar diretamente o Youtube Data API para pegar as legendas de vídeos com API Keys.
> 
> Mensagem de erro quando requisitando o serviço `GET https://www.googleapis.com/youtube/v3/captions/id` com Chave de API:
> 
> >"API keys are not supported by this API. Expected OAuth2 access token or other authentication credentials that assert a principal. See https://cloud.google.com/docs/authentication"

Para buscar as legendas é possível utilizar o [youtube-transcript-api-sharp](https://github.com/BobLd/youtube-transcript-api-sharp) ou [youtube-transcript-api](https://github.com/jdepoix/youtube-transcript-api) (python). Existem limitações em relação a essa biblioteca já que o próprio Youtube bloqueia IPs que estão utilizando essa biblioteca. Em um produto pode ser necessário pensar em como solucionar isso, talvez armazenando essas legendas.

#### Casos de uso

- [[Assistente para descoberta de conteúdo]] utiliza para fazer download de legendas que serão utilizadas para fazer resumos, sinopse e explicações sobre o conteúdo do vídeo
