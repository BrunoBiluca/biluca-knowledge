# Solução - Reuso de formulários para edição

> [!example] Solução implementada em [[Projeto - Biblioteca de Jogos]]

Recursos utilizados do [[Angular]]:

- [[Frontend/Flutter/Recursos/Formulários|Formulários]]

Arquitetura:

- Formulário base
- Configuração do formulário de registro
- Configuração do formulário de edição

Utilizando essa divisão nós conseguimos garantir que o mesmo formulário está sendo utilizado, o que permite alterar tudo em um mesmo lugar.

### `base_form.ts`

> [!warning] Configuração do FormGroup
> É importante garantir que a configuração do FormGroup esteja utilizando os mesmo nomes para cada FormControl, já que eles serão utilizados diretamente no HTML.

```ts
export class BaseForm implements OnInit {

  // inputs
  form = input.required<FormGroup>();
  submitButtonLabel = input.required<string>();
  formTitle = input.required<string>();
  
  // outputs
  onSubmit = output<void>();

  // ... signals utilizados

  // inicializar signals
  ngOnInit(): void {}
}
```

### `registration.ts`

Esse componente define a configuração necessária para a configuração de um novo registro no sistema.

```ts
export class GameRegistrationForm {
  gameStore = inject(GameStore);
  private router = inject(Router);
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    name: ['', [Validators.required]],
    developer: ['', [Validators.required]],
    genres: new FormControl<string[]>([], [Validators.required]),
    releaseDate: new FormControl<Date>(new Date(), [Validators.required]),
    cover: [null, [Validators.required]],
    description: [''],
    synopsis: [''],
  });

  submit() {}
}
```

```html
// registration.html
<app-base-form
	[form]="form()!"
	submitButtonLabel="concluir"
	formTitle="Cadastrar jogo"
	(onSubmit)="submit()"
/>
```

### `edit.ts`

Esse componente define a configuração do formulário para a edição de um registro.

```ts
export class Edit implements OnInit {
  constructor() {
    effect(() => {
      if (!this.game()) return;
      this.buildForm();
    });
  }

  // Inicializa o registro que será editado
  ngOnInit(): void {}

  // Constrói o formulário a partir dos dados já preenchidos
  buildForm() {}

  submit() {}

  // Podemos adicionar funções específicas que apenas o formulário de edição terá
  deleteGame() {}
}
```

```html
// edit.html
<app-base-form
	[form]="form()!"
	submitButtonLabel="concluir"
	formTitle="Editar jogo"
	(onSubmit)="submit()"
/>
<!-- Nos permite adicionar novas funções específicas do formulário -->
<button type="button" (click)="deleteGame()">
  Deletar jogo
</button>
```


