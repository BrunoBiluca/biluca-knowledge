# Widgets

[Comportamentos dos Widgets](https://docs.streamlit.io/develop/concepts/architecture/widget-behavior)

## Alteração dinâmica de conteúdo

É possível alterar na mesma execução do script o conteúdo de um texto, para isso utilizamos o `st.empty()` como um espaço reservado e alteramos seu conteúdo posteriormente.

```python
import streamlit as st
import time

# Cria um espaço vazio na tela
placeholder = st.empty()

# Exibe um texto inicial
placeholder.text("Texto original na tela.")

# Aguarda 3 segundos
time.sleep(3)

# Substitui o texto original por um novo
placeholder.text("Texto atualizado na tela usando st.empty.")
```

## Mudança de estados

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

> [!info] Para manter estado entre os recarregamentos das páginas utilizar [[Session State]]

## State-full button

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

## Fragmentos

[Documentação de fragmentos](https://docs.streamlit.io/develop/concepts/architecture/fragments)

Fragmentos são principalmente utilizados quando não queremos o comportamento (padrão do Streamlit) de reexecutar todo o script a cada mudança de estado da aplicação. Eles executam independentemente do código principal.

Nesse caso, quando temos um fragmento declarado, apenas a execução da função que cria esse fragmento é reexecutada.

Fragmentos **não são estruturas que devem ser utilizadas para compartilhar dados** com o resto da aplicação. Caso, esse seja um requisito outros elementos do Streamlit como container, Session State ou importação de módulos são recomendados.

## Callbacks

Alguns widget permitem associar uma função para ser chamada quando acontece uma mudança do valor (`on_change`) ou um clique (`on_click`).

```py
def on_button_click(msg):
	st.write(msg)

st.button("Show: Hello World!", key="my-button", on_click=on_button_click, args=("Hello World!",))
```

Isso irá acionar um recarregamento total da página resultando apenas na mensagem sendo escrita após o carregamento.