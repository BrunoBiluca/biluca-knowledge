---
categoria: biblioteca
---
# Highcharts

É uma biblioteca para criação de gráficos de alta qualidade em múltiplas linguagens e frameworks, como [[React]], [[Angular]], [[Flutter]], [[Python]] por exemplo.

Principais recursos da biblioteca para [[React]]:

- Reativa por design
- [[TypeScript]]-first
- Para para utilizar [[Next.js]] & SSR
- Integração com componentes customizáveis
- Suporte para ES Modules


### Precificação

O [Highcharts](https://www.highcharts.com/) adota um modelo de **licenciamento duplo**: é gratuito para uso pessoal, educacional ou sem fins lucrativos, mas exige uma licença paga e comercial para qualquer uso corporativo, interno ou comercial.

## Primeiro gráficos

O código abaixo demonstra a criação de um gráfico de linha com a adição dos módulos opcionais de [exportação](https://www.highcharts.com/docs/react/components/modules/exporting) e de [acessibilidade](https://www.highcharts.com/docs/react/components/modules/accessibility).

```jsx
import { Chart } from "@highcharts/react";
import { LineSeries } from "@highcharts/react/series/Line";
import { Accessibility } from "@highcharts/react/modules/Accessibility";
import { Exporting } from "@highcharts/react/modules/Exporting";
export default function ModulesChart() {
  return (
    <Chart>
      <Accessibility />   
      <Exporting />
      <LineSeries data={[3, 4, 1, 5, 2]} />
    </Chart>
  );
}
```