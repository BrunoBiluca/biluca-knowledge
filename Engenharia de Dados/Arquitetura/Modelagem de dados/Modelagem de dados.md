---
tags:
  - modelagem_de_dados
---
# Tipos de modelagem de dados

Dependendo do problema podemos abordar a modelagem de dados de várias maneiras, desde dados altamente normalizado o que pode economizar em armazenamento até modelagens que tem o foco em pesquisas e agregações mais rápidas.

- [[Normalização]]
- [[Kimball]]
- [[Inmon]]
- [[Data vault]]

## Esquema Estrela (Star Schema)

Esquema estrela representa o modelo do negócio, onde uma tabela fato é cercada apenas das dimensões necessárias. Esse esquema captura lógica do negócio e deve ser flexível o bastante para responder questões críticas.

# Técnicas

- [[Mudança lenta de dimensões]]

# Problemas de modelagem

- [[Inclinação de dados (Data Skew)]]