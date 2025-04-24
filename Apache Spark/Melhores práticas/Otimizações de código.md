# Otimizações de código

- Em código de produção ter apenas operações de escrita e leitura de arquivos. Evitar `count()`, `show()` e outras operações que executem as tasks.
- Evitar operações que são executadas no nó driver como código python/pandas single threaded.
- Evitar UDFs que executem linha a linha. No lugar utilizar funções nativas do pyspark ou Pandas UDFs para UDFs vetorizados.
- Usar Dataframes e Datasets em vez de RDDs.
- Ter atenção a casos de [[Derramamento de dados (Spill)]]

> [!tip] Dica de performance
> Sempre que possível tente utilizar a biblioteca padrão Spark SQL, ela é um pouco mais rápida na compilação, trata valores nulos e performa um pouco melhor que UDFs