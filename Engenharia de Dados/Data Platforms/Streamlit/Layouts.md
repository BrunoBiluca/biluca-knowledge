# Layouts

[Layouts and containers](https://docs.streamlit.io/develop/api-reference/layout)

## Containers

No  [[StreamLit]] é possível definir escopos para elementos dentro de containers:

```py
st.write("Container global")

with st.expander("Container expansível 1"):
  st.write("Dentro do Container expansível 1")
  
exp2 = st.expander("Container expansível 2")
exp2.write("Dentro do Container expansível 2")

left, mid, right = st.columns(3)
left.write("Dentro da coluna da esquerda")
mid.write("Dentro da coluna do centro")
right.write("Dentro da coluna da direita")
```

> [!warning] Componentes de layout não ativam eventos.
> Para isso é necessário um [[Widgets]] de entrada. Por exemplo, quando uma tab é exibida, não é possível associar um callback para carregar dados específicos.


