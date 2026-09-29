# Solução - Campo de imagens

> [!example] Solução implementada em [[Projeto - Biblioteca de Jogos]]

Essa solução utiliza [[Frontend/Angular/Recursos/Formulários|Formulários em Angular]] do modelo Reative Forms.

```ts
export class Form {
  private readonly _fb = inject(FormBuilder);
  form = this._fb.group({
    cover: [null, [Validators.required]],
  });
  cover = signal<File | null>(null);
  coverPreview = computed(() =>
    this.cover()
      ? URL.createObjectURL(this.cover()!)
      : 'assets/generic.png',
  );

  constructor() {
    effect(() => {
      this.form().get('cover')?.setValue(this.cover());
    });
  }
}
```

A ideia aqui é que conseguimos exibir a imagem a medida que o usuário a adicione ao formulário.

```html
<input
	#coverInput
	style="display: none"
	type="file"
	accept="image/*"
	(change)="onCoverChange($event)"
/>
<button type="button" (click)="coverInput.click()">
	Select File
</button>
<img [src]="coverPreview()" />
```

Então, por essa solução o **controle do arquivo do é gerenciado pelo signal**, ativando a re-renderização sempre que uma nova imagem é selecionada, enquanto isso mantemos o **controle do formulário pelo FormControl.**
