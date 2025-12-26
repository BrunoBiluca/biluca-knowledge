# Modularização em Streamlit

[[StreamLit]] não vem com uma arquitetura (modelo de estrutura de arquivos, módulos, components, etc...) padrão para a construção de aplicações, por esse motivo a arquitetura é definida por cada time levando em consideração o fluxo padrão do Streamlit (a cada mudança de dados ou código o script é recarregado).

Mesmo assim, [[StreamLit]] é um projeto python e pode seguir qualquer tipo de configuração de módulos disponível.

## Arquitetura proposta pelo Cristian Scutaru

Em seu curso [Deep dive into Streamlit, from local web application to Streamlit in Snowflake and Native Apps](https://www.udemy.com/course/streamlit-for-snowflake), Cristian sugere um modelo de arquitetura para aplicações do Streamlit hospedadas no Snowflake de forma a separar algumas responsabilidades em elementos no Frontend da aplicação.

Elementos principais

- Inputs
- Outputs
- Lógica de negócio
- Componentes de layout

```
🧾 app.py
📁 modules
  - 🧾 utils.py
  - 🧾 chats.py
  - 🧾 data.py
```

> [!tip] Acredito que uma abordagem mais semântica para cada projeto seja mais recomendada. Entender como os dados se relacionam e como isso é refletido na tela para o usuário, ajuda a manter a aplicação.
