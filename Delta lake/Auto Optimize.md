# Auto Optimize

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

**Auto Optimize** é uma funcionalidade que permite ao [[Delta lake]] automaticamente compactar arquivos pequenos.

--- end-column ---

> [!info] Principais referências
> - [Documentação - O que é Auto Optimize?](https://docs.databricks.com/en/delta/tune-file-size.html#what-is-auto-optimize-on-databricks)
>- 

--- end-multi-column

Ele é composto de dois processos:

- **Optimized writes:** com essa funcionalidade ativa, Databricks tenta escrever arquivos de pelo 128MB por repartição. Esse processo visa melhorar o problema de pequenos arquivos por meio de aglutinar esses pequenos arquivos em arquivos maiores.
- **Auto compaction:** verifica se o arquivo pode ser ainda mais compactado. Em caso positivo, executa um processo OPTIMIZE (não suporta Z-Ordering) com arquivos de tamanho 128MB (em vez de 1GB do tamanho padrão do processo OPTIMIZE).
	- Processo assíncrono executado após a finalização das escritas da tabela.
	- Auto compaction não suporta Z-Ordering já que Z-Ordering é mais caro computacionalmente que apenas compactação. Para utilizar o Z-Ordering ele deve ser executado independente do processo de compactação.