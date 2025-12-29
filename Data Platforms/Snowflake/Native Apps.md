# Native Apps

## Streamlit como aplicativo nativo

É possível empacotar uma aplicação do [[StreamLit]] como um aplicativo nativo.

Os pacotes são separados em contas provedoras e consumidoras. Provedoras são responsáveis pela aplicação, as consumidoras irão utilizar a aplicação.

### Fluxo de desenvolvimento

- Crie e teste primeiro como uma aplicação Streamlit web local
	- Crie um arquivo `script.sql`, para preparar os dados do lado do consumidor
	- Crie um arquivo `readme.md`, para a página de informações da aplicação
	- Crie um arquivo `manifest.yml`, apontando os dois arquivos anteriores

- No [[Snowflake]]
	- Publique todos os arquivo em um stage nomeado
	- Crie um `APPLICATION PACKAGE` com os arquivos publicados
	- Crie um `APPLICATION` para este pacote
	- Crie um objeto `STREAMLIT` para o código

- Teste seu aplicativo no Snowsight

- Publique o aplicativo no Marketplace para que outros usuários tenham acesso
	- Nesse estágio é possível definir várias informações de como que tipo de usuário tem acesso ao seu aplicativo dentro do [[Snowflake]]
	- Necessário criar um Perfil de publicador no Provider Studio