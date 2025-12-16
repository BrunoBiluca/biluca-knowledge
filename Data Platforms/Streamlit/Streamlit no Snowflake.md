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

