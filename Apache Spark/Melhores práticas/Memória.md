# Memória

É possível configurar ([[Configurações do Apache Spark]]) de acordo com o volume de processamento necessário.

Para isso podemos fazer o seguinte:

1. **Monitore** o uso de memória (UI do Spark/YARN, logs).
2. **Ajuste incrementalmente** se ocorrerem `OOM errors` ou `GC overhead`. 
3. **Teste** diferentes configurações para otimizar o throughput (quantidade de trabalho realizado em um tempo unitário).

Para a máquina que executa o **processo do Driver** é importante levar em consideração

- A coleta de grandes resultados `collect()` ou `take(n)` que é feita na máquina do Driver
- Processar muitos metadados (ex. muitas partições e operações de shuffle)

Com isso em mente:

- `4G - 8G` para trabalhos padrões
- `8G - 16G+` para operações que acumulam dados no Driver

Para as máquinas que executam os **processos Executores** devemos considerar:

- **Overhead de memória** (Java Heap + memória off-heap)
- **Tamanho das partições** (evite partições muito grandes)
- **Operações custosas** (joins, agregações, UDFs)

Configuração sugerida:

- `4GB – 8GB` por Executor (para workloads leves)
- `8GB – 16GB` (balanceamento entre paralelismo e uso eficiente)
- `16GB – 32GB+` (evite executores muito grandes para prevenir GC pauses)