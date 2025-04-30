# Memória

O [[Apache Spark]] disponibiliza uma série de recursos que utilizam memória durante o processamento. Sobre memória é importante levar em consideração:

- [[Cache]]
- [[Broadcast]]
- [[Garbage Collection]]
- Os principais tipos de transformações (principalmente Wide Transformations)

É possível configurar ([[Configurações do Apache Spark]]) de acordo com o volume de processamento necessário. Para isso podemos fazer o seguinte:

1. **Monitore** o uso de memória (UI do Spark/YARN, logs).
2. **Ajuste incrementalmente** se ocorrerem `OOM errors` ou `GC overhead`. 
3. **Teste** diferentes configurações para otimizar o throughput (quantidade de trabalho realizado em um tempo unitário).

Para a máquina que executa o **processo do Driver** é importante levar em consideração

- A coleta de grandes resultados `collect()` ou `take(n)` que é feita na máquina do Driver
	- Definir um limite do tamanho máximo de dados serializados
- Processar muitos metadados (ex. muitas partições e operações de shuffle)

Com isso em mente:

- `4G - 8G` para trabalhos padrões
- `8G - 16G+` para operações que acumulam dados no Driver

Para as máquinas que executam os **processos Executores** devemos considerar:

- **Overhead de memória** (Java Heap + memória off-heap)
- **Tamanho das partições** (evite partições muito grandes)
- Limitar a quantidade de dados que são automaticamente transmitidos por toda a rede ([[Broadcast]])
- **Operações custosas** (joins, agregações, UDFs)
- Diminuir o número de núcleos disponíveis para cada nó executor
	- Como cada núcleo é responsável pelo processamento de uma partição, ter menos núcleos significa menos partições carregadas para memória, num contexto que múltiplos executores estão definidos no mesmo nó, isso pode evitar problemas de OOM

Configuração sugerida:

- `4GB – 8GB` por Executor (para workloads leves)
- `8GB – 16GB` (balanceamento entre paralelismo e uso eficiente)
- `16GB – 32GB+` (evite executores muito grandes para prevenir GC pauses)
