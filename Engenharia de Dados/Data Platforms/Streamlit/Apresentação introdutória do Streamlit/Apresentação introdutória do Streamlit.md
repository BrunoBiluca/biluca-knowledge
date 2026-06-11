# Streamlit

## História

- Foi comprado pelo Snowflake em 2022
- Integrado com o Snowpark: Streamlit Apps (SiS) -> Native Apps

## Funcionalidades

- RAD framework para experimentos de ciência de dados
	- Uma coisa que o Streamlit tenta resolver é permitir que os próprios cientistas de dados consigam criar aplicações para executar análises sobre suas bases de dados, facilitando seu próprio trabalho
	- Um **RAD Framework** (Rapid Application Development Framework) é um conjunto de bibliotecas, componentes e ferramentas reutilizáveis que aceleram o desenvolvimento de software

- Conecta a vários tipos de fontes de dados
	- Isso remove a necessidade de um backend provendo esses dados

- Renderiza gráficos ou conteúdos em HTML usando bibliotecas de terceiros
	- Ploty, pyDantic, D3 charts são algumas delas
	- Além das bibliotecas da comunidade


## Arquitetura do Front-End

![[front-end architecture.png]]

- Simple input controls: single event per control → trigger full page rerun
- Rich third-party output libraries & minimalistic layout components (as containers)
- Business logic (external!): database access (Snowflake), ML (PyTorch, TensorFlow)

## Anatomia de uma página

![[Exemplo de uma página do Streamlit.png]]


## Interação com Widgets

![[Exemplo de interação com Widgets.png]]

## Cache

![[Exemplo de Cache.png]]

## Session state

![[Session state.png]]

## Conexão com o Snowflake

![[Conexão com o Snowflake.png]]

## Programação Client-side vs Server-side

![[Programação Client-side vs Server-side.png]]

Dependendo do tipo de operação podemos demandar mais recursos do cliente ou do servidor.

## Publicação de uma aplicação Streamlit no Snowflake

![[Publicação de uma aplicação Streamlit no Snowflake.png]]

- Create and test as a local Streamlit web app
	- Create a local Streamlit app, with one or more Python files.
	- Connect locally to Snowflake through Snowpark.
	- Test your application as a local Streamlit web app.

- Deploy as a Streamlit in Snowflake app
	- Create a Snowflake database with a named stage.
	- Upload your Python and other app files into this stage.
	- Create a STREAMLIT object, mentioning the entry point file.
	- In Snowsight, start your new app in the new Streamlit tab.
	- Connect to Snowflake through get_active_session()
	- Continue editing, running, and testing the app in Snowsight.

## Publicação de uma aplicação Streamlit no Snowflake como aplicação nativa

- Create and test first as a local Streamlit web app
	- Create a script.sql file, to prepare data on the consumer’s side.
	- Create a readme.md file, for the first info page of the app.
	- Create a manifest.yml file, pointing to the two previous files.

- In Snowflake
	- Upload all your app files into a named stage.
	- Create an APPLICATION PACKAGE with the files uploaded in the stage.
	- Create an APPLICATION for this package.
	- Create a STREAMLIT object for the code.

- In Snowsight
	- Start your new app in the new Appstab.
	- Connect to Snowflake through get_active_session()
	- Continue editing, running, testing the app in Snowsight, as a producer.

- In the Marketplace/Data Exchange → public/private share
	- Create [and get approved by Snowflake] a provider profile.
	- Publish your app [and get approved in the Marketplace] as a Native App.

### Compartilhamento privado (Data Exchange)

![[Compartilhamento privado (Data Exchange).png]]

### Compartilhamento público (Snowflake Marketplace)

![[Compartilhamento público (Snowflake Marketplace).png]]