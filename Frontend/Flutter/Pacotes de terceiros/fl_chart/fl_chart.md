---
categoria: biblioteca
---
# fl_chart

>[!info] Documentação
> - [Página do pacote](https://github.com/imanneo/fl_chart)

Biblioteca de [[Flutter]] para a renderização de gráficos. Possui um grande número de tipos de gráficos disponíveis e várias opções.

- [Gráficos de barra](https://github.com/imaNNeo/fl_chart/blob/main/repo_files/documentations/bar_chart.md)

> [!warning] Problemas de renderização
> É comum enquanto estamos desenvolvendo um novo gráfico algumas informações não baterem e causarem erros, como é o caso de valores que não batem com os títulos, com o tooltip e etc. Nesses casos, o flutter não é muito bom em apresentar o erro e vai apresentar um erro interno.
> 
> Uma coisa que funcionou para mim foi sempre criar os gráficos de forma estática, com dados mockados e ir alterando para os dados reais a medida que garantimos que esses dados estão no formato esperado.

## Renderização de um gráfico

Os gráficos dessa biblioteca são bastante customizáveis, porém é necessário entender bem a estrutura para conseguir usufruir dessa qualidade.

Um gráfico sempre começa com a criação do Widget relacionado, por exemplo `BarChart` e `LineChart`.

Esses gráficos recebem um objeto que define os dados relacionados aos dados, cada gráfico tem sua forma de definir esses dados.

Existem algumas configurações comuns para alguns gráficos:

- `titlesData` renderiza os títulos
	- `bottomTitles`
	- `leftTitles`
	- `topTitles`
	- `rightTitles`
- `gridData` renderiza uma grade
- `borderData` renderiza as bordas internas
- `extraLinesData` renderiza linhas extras, utilizado por exemplo para mostrar um valor de média.

Exemplos:

- [[Exemplo - Gráfico de barras]]
- [[Exemplo - Linhas extras para exibir informações gerais]]