## Widgets

[Comportamentos dos Widgets](https://docs.streamlit.io/develop/concepts/architecture/widget-behavior)

### Mudança de estados

[Widgets com suporte a mudança de estados](https://docs.streamlit.io/develop/api-reference/caching-and-state/st.session_state#use-callbacks-to-update-session-state)

Quando a aplicação tem algum Widget que permite alterar o estado, **o Streamlit roda todo o script de cima a baixo**, alterando os estados atuais dos widgets para a variável correspondente.

```py
import streamlit as st

# 👈 this is a widget 
x = st.slider('x') 

st.write(x, 'squared is', x * x)
# 👈 Cada execução o é atualizado o valor de 'x' para o valor do slide
```

> [!warning] Preocupações em relação a Performance
> Caso a aplicação do Streamlit tenha vários widget que alteram uma reexecução do script, é necessário ter uma ótima combinação de caches e controles de estado para funcionar.
> 
> [Mais discussões sobre performance](https://discuss.streamlit.io/t/large-complex-streamlit-apps-performance/22265)

#### Session State

[Documentação do Session State](https://docs.streamlit.io/develop/api-reference/caching-and-state/st.session_state)

Para controle maior de estado, o Session state é uma forma de compartilhar variáveis entre as execuções.

Session state tem integração bi-direcional (Two-way binding) com widgets a partir do parâmetro `key=`. Dessa forma é bem simples de atualizar os valores de widgets no Session State.

```py
# automaticamente cria um chave 'slider' no st.session_state
number = st.slider("A number", 0, 10, key="slider")
```

### Stateful button

Botões ativam a mudança de estado quando eles são clicados, para manter esse estado em múltiplas reexecuções podemos utilizar o Session State.

```py
import streamlit as st

if 'clicked' not in st.session_state:
    st.session_state.clicked = False

def click_button():
    st.session_state.clicked = True

st.button('Click me', on_click=click_button)

if st.session_state.clicked:
    # The message and nested widget will remain on the page
    st.write('Button clicked!')
    st.slider('Select a value')
```

### Fragmentos

[Documentação de fragmentos](https://docs.streamlit.io/develop/concepts/architecture/fragments)

Fragmentos são principalmente utilizados quando não queremos o comportamento (padrão do Streamlit) de reexecutar todo o script a cada mudança de estado da aplicação. Eles executam independentemente do código principal.

Nesse caso, quando temos um fragmento declarado, apenas a execução da função que cria esse fragmento é reexecutada.

Fragmentos **não são estruturas que devem ser utilizadas para compartilhar dados** com o resto da aplicação. Caso, esse seja um requisito outros elementos do Streamlit como container, Session State ou importação de módulos são recomendados.