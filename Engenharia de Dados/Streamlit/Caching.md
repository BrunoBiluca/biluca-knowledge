# Caching

O cache de dados é definido utilizando o seguinte decorator:

```py
@st.cache_data
def load_data(nrows):
   ...
```

Dessa forma os dados são gerenciados pelo próprio [[StreamLit]] e são recarregados em duas situações:

- Diferentes inputs da função
- Alteração no código

> [!tip] Todos os cacheamentos de dados são **compartilhados entre todos os usuários e sessões**, dessa forma as aplicações são mais rápidas por executarem computações onerosas apenas uma única vez.

#### Modos de cache

- **cache_resources**
	- Armazena um dataframe como um objeto vivo, assim, qualquer alteração aos dados irá implicar em uma alteração nas referências
- **cache_data**
	- Armazena objetos serializáveis em memória como uma cópia para futuras consultas

