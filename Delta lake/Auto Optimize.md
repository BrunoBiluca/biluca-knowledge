# Auto Optimize

**Auto Optimize** é uma funcionalidade que permite ao Delta Lake automaticamente compactar arquivos pequenos. 

Ele é composto de dois processos:

- **Optimized writes:** com essa funcionalidade ativa, Databricks tenta escrever arquivos de 128MB por repartição.
- **Auto compaction:** verifica se o arquivo pode ser ainda mais compactado. Em caso positivo, executa um processo OPTIMIZE (não suporta Z-Ordering) com arquivos de tamanho 128MB (em vez de 1GB do tamanho padrão do processo OPTIMIZE).
	- Processo assíncrono executado após a finalização das escritas da tabela.
	- Auto compaction não suporta Z-Ordering já que Z-Ordering é mais caro computacionalmente que apenas compactação. Para utilizar o Z-Ordering ele deve ser executado independente do processo de compactação.