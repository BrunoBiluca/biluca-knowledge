# StreamLit

[Documentação](https://docs.streamlit.io/)
[Principais conceitos](https://docs.streamlit.io/get-started/fundamentals/main-concepts)

> [!info]
> O StreamLit é um framework open-source em Python que premite cientistas e engenheiros de dados entregar aplicações dinâmicas de dados.

Esse framework tem integrações importantes com [[Snowflake]], sendo possível hospedar as aplicações no mesmo ambiente onde ficam os dados.

## Controle de estado

[Widgets com suporte a mudança de estados](https://docs.streamlit.io/develop/api-reference/caching-and-state/st.session_state#use-callbacks-to-update-session-state)

Quando a aplicação tem algum Widget que permite alterar o estado, o Streamlit roda todo o script de cima a baixo, alterando os estados atuais dos widgets para a variável correspondente.

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

## Caching

O cache de dados é definido utilizando o seguinte decorator:

```py
@st.cache_data
def load_data(nrows):
   ...
```

Dessa forma os dados são gerenciados pelo próprio [[StreamLit]] e são recarregados em duas situações:

- Diferentes inputs da função
- Alteração no código

## Layouts

[Layouts and containers](https://docs.streamlit.io/develop/api-reference/layout)