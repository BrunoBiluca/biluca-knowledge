---
categoria: prática
---

# Principais considerações de performance

Características que impactam na performance de consultas:

- Número de bytes lidos
- Complexidade das consultas
- Número de arquivos acessados: quanto mais arquivos são acessados mais lenta a consulta
- Paralelismo

Principais gargalhos de performance para big data e sistemas MPP:

- Problema de arquivos pequenos: pode resultar em limites do ES (IO)
	- Databricks automaticamente otimiza o tamanho dos Delta Lake tables para evitar esse problema
	- Databricks automaticamente compacta arquivos pequenos com o auto-optimize
- [[Inclinação de dados (Data Skew)]]
- Processar mais que o necessário
	- Data Skipping
	- Delta Lake e Z-Order utilizam uma técnica de indexação para evitar esses problemas
- Contenção de recursos: processar diferentes fluxos ao mesmo tempo utilizando os mesmos recursos


