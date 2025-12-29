# Streamlit no Snowflake

[Documentação do Streamlit no Snowflake](https://docs.snowflake.com/en/developer-guide/streamlit/about-streamlit)

## Limitações

O [[StreamLit]] apresenta certas limitações quando utilizado dentro do [[Snowflake]] Apps.

[Documentação das limitações](https://docs.snowflake.com/en/developer-guide/streamlit/limitations)

- Não é possível utilizar o `set_page_config()`, dessa forma não é possível utilizar nativamente aplicações com múltiplas páginas

## Conexão

[Conexão do Snowflake pelo Streamlit](https://docs.streamlit.io/develop/tutorials/databases/snowflake)

There are three places [[StreamLit]] looks for your connection parameters: keyword arguments in `st.connection`, `.streamlit/secrets.toml`, and `.snowflake/configuration.toml`.

Utilização da conexão com o Snowflake:

```py
# streamlit_app.py

import streamlit as st

conn = st.connection("snowflake")
df = conn.query("SELECT * FROM mytable;", ttl="10m")

for row in df.itertuples():
    st.write(f"{row.NAME} has a :{row.PET}:")
```

Também é possível utilizar a conexão a partir de uma sessão (estilo de operações de dataframe):

```py
# streamlit_app.py

import streamlit as st

conn = st.connection("snowflake")

@st.cache_data
def load_table():
    session = conn.session()
    return session.table("mytable").to_pandas()

df = load_table()

for row in df.itertuples():
    st.write(f"{row.NAME} has a :{row.PET}:")
```

### Aplicativos nativos do Snowflake

Para aplicativos nativos podemos utilizar a biblioteca `snowspark` para já garantir a sessão ativa na aplicação.

```py
# Import python packages
import streamlit as st
from snowflake.snowpark import Session

# Write directly to the app
st.title("Hello Snowflake - Streamlit Edition")
st.write(
   """The following data is from the accounts table in the application package.
      However, the Streamlit app queries this data from a view called
      code_schema.accounts_view.
   """
)

# Get the current credentials
session = Session.builder.getOrCreate()

#  Create an example data frame
data_frame = session.sql("SELECT * FROM code_schema.accounts_view")

# Execute the query and convert it into a Pandas data frame
queried_data = data_frame.to_pandas()

# Display the Pandas data frame as a Streamlit data frame.
st.dataframe(queried_data, use_container_width=True)
```

### Sessão ativa e fallback para desenvolvimento local

No [[SnowFlake]] a conexão ativa (`get_active_session()`) é sempre o modo preferencial de obtenção da sessão, já que dessa maneira o usuário já é autorizado de acordo com seus respectivos papéis, limitando seu acesso.

```py
import os, configparser
import streamlit as st
from snowflake.snowpark import Session
from snowflake.snowpark.context import get_active_session

# Mantém a conexão ativa
@st.cache_resource(show_spinner="Connecting to Snowflake...")
def getSession():
    try:
	    # Busca a sessão ativa do SnowFlake
        return get_active_session()
    except:
		# Cria uma instância partir do config file
	    parser = configparser.ConfigParser()
        parser.read(os.path.join(os.path.expanduser('~'), ".snowsql/config"))
        section = "connections.demo_conn"
        pars = {
            "account": parser.get(section, "accountname"),
            "user": parser.get(section, "username"),
            "password": os.environ['SNOWSQL_PWD']
        }
        return Session.builder.configs(pars).create()

```

O código acima permite que consigamos utilizar tanto a conexão a partir do SnowFlake como também um arquivo de configuração para desenvolvimento local.

### Diferenças entre Snowpark e SnowConnector

- **SnowConnector** (Python connector) executa a lógica de negócios no cliente antes de enviar para o servidor computar os dados

- **Snowpark** executa a lógica de negócios no servidor e apenas ao UI é computado no cliente
	- Isso permite que aplicações sejam executadas diretamente no servidor reduzindo o tráfego de dados entre cliente e servidor.

## Computar funções python como procedure

É possível a partir do conector (Snowpark) registrar uma função para ser executada como uma procedure no [[Snowflake]]. Isso nos permite gerenciar pipelines de dados mais complexos utilizando o ambiente nativo do Snowflake, em vez de apenas o sandbox de python que é criado.

[snowfalke.snowpark.functions.sproc](https://docs.snowflake.com/en/developer-guide/snowpark/reference/python/1.6.1/api/snowflake.snowpark.functions.sproc)

## Precificação

[Documentação sobre precificação de aplicações Streamlit no Snowflake](https://docs.snowflake.com/en/developer-guide/streamlit/object-management/billing)

[[StreamLit]] no [[Snowflake]] é precificado de acordo com o ambiente de execução da aplicação e query warehouse.

## Fluxo de desenvolvimento

Para aplicações [[StreamLit]] hospedadas no [[Snowflake]], o [[Curso - Training with Streamlit for Snowflake Masterclass Hands-On]] recomenda o seguinte fluxo:

- Crie e teste aplicações Streamlit no seu formato local
	- Crie um aplicativo local Streamlit
	- Conecte localmente ao Snowflake pelo Snowpark
	- Teste sua aplicação

- Publique como um aplicativo Streamlit nos aplicativos do Snowflake
	- Crie uma base de dados com um stage nomeado
	- Faça upload do seus arquivos em python no state nomenado
	- Crie um objeto STREAMLIT, definindo como ponto de entrada o arquivo python
	- Conecte ao Snowflake pelo `get_active_session()`
	- Continue a edição, execute e teste a aplicação no SnowFlake.
