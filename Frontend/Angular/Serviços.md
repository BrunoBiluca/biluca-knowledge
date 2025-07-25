# Serviços

Serviços em [[Angular]] devem ser utilizados para manipular dados, como busca de informações em API externas, arquivos e outros tipos e operações que não envolvam renderização.

#### Requisições HTTP

```ts
type Bar = {
  userId: number;
  completed: boolean;
  title: string;
  id: number;
};

@Inject({
...
})
class BarService {
	http = inject(HttpProvider)

	getBar() {
		const url = "http://.....";
		return this.http.get<Array<Bar>>(url); // retorna um Observable
	}
}

@Component({
...
})
export class BarComponent implements OnInit {
	barService = inject(BarService)
	ngOnInit(): void {
		this.barService.getBar()
			.pipe(
				catchError((err) => ...)
			)
			.subscribe((bars) => ...)
	}
}
```