# Serviços

Serviços em [[Angular]] devem ser utilizados para manipular dados, como busca de informações em API externas, arquivos e outros tipos e operações que não envolvam renderização.

## Requisições HTTP

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

## Serviços Globais

Esse é uma implementação bem básica para a criação de estados globais na aplicação (Padrão Observable).

```ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GlobalStateService {
  private state = new BehaviorSubject<any>({});
  currentState = this.state.asObservable();

  updateState(newState: any) {
    this.state.next({ ...this.state.value, ...newState });
  }
}

// Para atualizar
this.globalStateService.updateState({ user: userData });

// Para acessar
this.globalStateService.currentState.subscribe(state => {
  this.user = state.user;
});
```

O serviços `GlobalStateService` mantem a referência do estado e em qualquer ponto da aplicação que injete esse serviço pode aguardar por alterações nesse estado ou alterar o estado.