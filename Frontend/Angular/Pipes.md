# Pipes

[Documentação](https://angular.dev/guide/templates/pipes)

[[Angular]] pipes são usados para transformar dados diretamente nos templates dos [[Frontend/Angular/Componentes|Componentes]]

Existem vários Pipes prontos para uso e é possível construir seus próprio de acordo com as suas necessidades.

Principais Pipes prontos:

- AsyncPipe
- DatePipe
- JsonPipe
- TitleCasePipe
- UpperCasePipe

#### Exemplo: Criação de um pipe no filtro de uma lista

```js
@Pipe(
...
)
export class FilterItemsPipe implements PipeTransformation {
	transform (list: Items[], searchTerm: string): Items[] {
		return items.filter(i => i.includes(searchTerm)));
	}
}
```