---
categoria: biblioteca
---
# Highcharts

> [!info] Documentação
> - [Geral](https://www.highcharts.com/docs/index)
> - [Hghcharts - React](https://www.highcharts.com/docs/react/getting-started)

É uma biblioteca para criação de gráficos de alta qualidade em múltiplas linguagens e frameworks, como [[React]], [[Angular]], [[Flutter]], [[Python]] por exemplo.

Principais recursos da biblioteca para [[React]]:

- Reativa por design
- [[TypeScript]]-first
	- `@highcharts/react` exporta tipagem
- Para para utilizar [[Next.js]] & SSR
- Integração com componentes customizáveis
- Suporte para ES Modules

### Precificação

O [Highcharts](https://www.highcharts.com/) adota um modelo de **licenciamento duplo**: é gratuito para uso pessoal, educacional ou sem fins lucrativos, mas exige uma licença paga e comercial para qualquer uso corporativo, interno ou comercial.

## Primeiro gráfico

O código abaixo demonstra a criação de um gráfico de linha com a adição dos módulos opcionais de [exportação](https://www.highcharts.com/docs/react/components/modules/exporting) e de [acessibilidade](https://www.highcharts.com/docs/react/components/modules/accessibility).

```jsx
import { Chart } from "@highcharts/react";
import { LineSeries } from "@highcharts/react/series/Line";
import { Accessibility } from "@highcharts/react/modules/Accessibility";
import { Exporting } from "@highcharts/react/modules/Exporting";

export default function ModulesChart() {
  return (
    <Chart>
      <Accessibility />   // módulo opcional
      <Exporting />       // módulo opcional
      <LineSeries data={[3, 4, 1, 5, 2]} />
    </Chart>
  );
}
```

## Manipulando dados

- Dados dinâmicos devem ser armazenados em estado
- Configurações estáticas como constantes ou na própria declaração
- Evitar atualizações diretas aos gráficos (isso pode causar inconsistências entre os dados e o gráfico exibido)
	- `chartRef.current.chart.setTitle({ text: 'Updated title' });`
	- `chartRef.current.chart.series[0].setData([5, 4, 3, 2, 1]);`
- Por padrão Highcharts **trata os dados como imutáveis**. 
- É possível obter ganhos de performance para grandes conjuntos de dados a partir da alteração mutação dos dados:
	- Opção do gráfico: `allowMutatingData: true`
- Os componentes `@highcharts/react` são reativos por design, eles sincronizam de forma fluída com armazenamentos externos como Redux utilizando o hook `useSelector`

### Adicionando Series dinamicamente

Como componentes `Series` são componentes Reacts, é possível adicionar eles ao estado ou propriedades.

```jsx
export default function ChartComponent() {

  // Inicia o estado com o id da primeira série
  // RECOMENDAÇÃO (evitando duplicação): armazenar o identificador e não a série em si 
  const [activeSeriesIds, setActiveSeriesIds] = useState(() => [
    seriesCatalog[0].id,
  ]);
  
  // Define a que será chamada sempre que uma Série for selecionada
  const toggleSeries = useCallback((seriesId) => {
    setActiveSeriesIds((current) => {
      ...
    });
  }, []);
  
  // Define as séries ativas
  // RECOMENDAÇÃO (otimização)
  // O useMemo garante que apenas quando as séries ativas mudarem esse gráfico será re-renderizado
  const activeSeries = React.useMemo(
    () => seriesCatalog.filter((series) => activeSeriesIds.includes(series.id)),
    [activeSeriesIds],
  );
  
  return (
    <div className="dynamic-basics-demo">
      <Chart>
        { activeSeries.map((series) => <Series ...series /> }
      </Chart>
      
      // componente customizado que apresenta os botões que gerenciam as séries disponíveis
      <SeriesControls
        activeSeriesIds={activeSeriesIds}
        onToggleSeries={toggleSeries}
      />
    </div>
  );
}
```

## Otimizações

Melhorias gerais:

- Definir os externos dos gráficos explicitamente apresenta um ganho de performance que pode chegar a ~10%
- Agregar dados no backend no geral é mais rápido que no cliente.

### Gráficos para grandes volumes de dados e atualizados em tempo real

O Highcharts disponibiliza um módulo específico para gráficos que precisam de muita performance chamado [Boost module](https://www.highcharts.com/docs/advanced-chart-features/boost-module). Ele pula algumas das funcionalidades do Highchart e utiliza WebGL para renderizar o gráfico o mais rápido possível.

Além do modulo de Boost, outra melhoria de performance é controlar a aplicação das mudanças. Existe 3 métodos que nos permite alterar dados em um gráfico no Highcharts:

- `addPoint`
	- adiciona um único ponto a série
	- Eficiente para poucos pontos
- `setData`
	- Atualiza todos os dados de uma série
	- Eficiente na maioria das vezes
- `update`
	- Atualiza qualquer propriedade do gráfico

Independente do método é importante executar o método de `redraw` para aplicar as alterações. Dessa forma, o gráfico só irá re-renderizar uma única vez para todas as mudanças definidas.

```js
// Get your series instance
const series = chart.series[0];

// Pass 'false' to prevent an instant graphical redraw
series.setData([10, 24, 32, 18], false); 

// Visually apply all stacked modifications in a single paint cycle
chart.redraw();
```

