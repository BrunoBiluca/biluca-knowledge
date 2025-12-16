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