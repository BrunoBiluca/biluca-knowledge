---
categoria: prática
---
# Otimizações - Databricks

Para além das [[Otimizações no Delta Lake]] a própria plataforma do [[Databricks]] tem suas considerações de performance, por ser uma plataforma hospedada na cloud.

Características que impactam na performance de consultas:

- Número de bytes lidos
- Complexidade das consultas
- Número de arquivos acessados: quanto mais arquivos são acessados mais lenta a consulta
- Paralelismo

Principais gargalhos de performance para big data e sistemas MPP:

- **Problema de arquivos pequenos:** pode resultar em limites do ES (IO).

- [[Inclinação de dados (Data Skew)]]

- **Processar mais que o necessário**
	- [[Salto de dados (Data skipping)]]
	- Delta Lake e Z-Order utilizam uma técnica de indexação para evitar esses problemas

- **Contenção de recursos:** processar diferentes fluxos ao mesmo tempo utilizando os mesmos recursos

### Problema de arquivos pequenos

[Documentação de controle de tamanho de arquivos no Databricks](https://docs.databricks.com/en/delta/tune-file-size.htm)

Databricks automaticamente otimiza o tamanho dos arquivos em tables Delta Lake utilizando o [[Auto Optimize]]do [[Delta lake]]. Tabelas com valores especificados não são ajustados.

O Databricks ajusta automaticamente o tamanho dos arquivos baseados em dois casos:

- **Ajuste por carga:** para operações intensivas em escritas (ex: MERGE ou operações DML) o Databricks otimiza os arquivos para um tamanho ainda menor que o definido nas escritas otimizadas do Delta Lake.
	- Esse comportamento pode ser definido pela propriedade: `delta.tuneFileSizesForRewrites`
	- Quando essa propriedade não é explicitamente definida o Databricks verifica as últimas operações da tabela e caso 9 de 10 sejam `MERGE` ele automaticamente define a propriedade para `true`
- **Ajuste por tamanho da tabela:** para tabelas menores que 2.56 TB, os arquivos são otimizados para um tamanho máximo de 256 MB. A medida que o tamanho da tabela aumento o tamanho dos arquivos também.