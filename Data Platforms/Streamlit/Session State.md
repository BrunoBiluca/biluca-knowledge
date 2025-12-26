# Session State

[Documentação do Session State](https://docs.streamlit.io/develop/api-reference/caching-and-state/st.session_state)

Para controle maior de estado, o Session state é uma forma de compartilhar variáveis entre as execuções.

Session state tem integração bi-direcional (Two-way binding) com widgets a partir do parâmetro `key=`. Dessa forma é bem simples de atualizar os valores de widgets no Session State.

```py
# automaticamente cria um chave 'slider' no st.session_state
number = st.slider("A number", 0, 10, key="slider")
```