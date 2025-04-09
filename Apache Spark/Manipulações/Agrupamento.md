# Agrupamento

Podemos agrupar dados relacionados a colunas utilizando o `groupBy`.

Quando aplicamos o `groupBy` por baixo dos panos, os dados são distribuídos pelo cluster (Shuffle) de forma que cada particionamento é dado pelo identificador do agrupamento.

Por exemplo, sejam os dados de vendas de uma loja e queremos agrupar por mês. Os dados inicialmente no cluster estão espalhados pelas partições da seguinte maneira:

```py
- datanode_1
	- partição_1
		- Jan item1
		- Fev item1
		- Abr item2
	- partição_2
		- Jan item2
		- Mar item1

- datanode_2
	- partição_1
		- Fev item2
		- Abr item1
	- partição_2
		- Jan item1
		- Mar item2
```

Caso quisermos aplicar um agrupamento por mês e conta a quantidade de itens vendidos:

```py
df.groupBy("mês").agg(count("item")).show()
```

Por meio da operação de Shuffle no cluster esses dados são redistribuídos levando em consideração o agrupamento definido:

```py
- datanode_1
	- partição_1
		- Jan item1 # mantido
		- Jan item2 # datanode_1.partição_2
		- Jan item2 # datanode_2.partição_2
	- partição_2
		- Fev item1 # datanode_1.partição_1
		- Fev item2 # datanode_2.partição_1

- datanode_2
	- partição_1
		- Mar item1 # datanode_1.partição_2
		- Mar item2 # datanode_2.partição_2
	- partição_2
		- Abr item2 # datanode_1.partição_1
		- Abr item2 # datanode_2.partição_1
```

Após a redistribuição dos dados que será feita a contagem de cada partição e então essa contagem será carregada no processo do Driver para exibição do comando `show()`.