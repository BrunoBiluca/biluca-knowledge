# Formulários

> [!info] Links
> - [Documentação](https://angular.dev/guide/forms)

[[Angular]] apresenta duas formas de manipular relatórios:

- **Reativa**
	- forma mais escalável (reuso) e fácil de testar
	- O modelo de dados é estruturado e imutável e seu fluxo síncrono
	- Sua validação é feita a partir de funções vinculadas ao `FormControl`
	- Permite testes a partir dos modelos de dados sem a necessidade de renderizar a UI

- **Guiada a templates**
	- pode ser utilizado em cenários mais simples
	- O modelo de dados é desestruturado (diretivas) e mutável e seu fluxo assíncrono
	- Sua validação é feita ligada ao template das diretivas e deve prover diretivas para validação personalizadas

## Formulários reativos

Os formulários podem ser configurados todos em um objeto que é atualizado a partir do `FormControl` ou `FormGroup`.

#### Exemplo de formulário de cadastro de Usuário

> [!quote] Utilizado em
> - [[Biluca Notas Rápidas (Angular)]] para a criação de usuários.

```ts
// Exemplo da classe responsável pelo cadastro de um usuário
export class Signup {
  // username
  // adiciona um validador personalizado que verifica se o usuário já existe
  nonExistingUserValidator = inject(NonExistingUserValidator);
  username = new FormControl('', [
    Validators.required,
    this.nonExistingUserValidator.check(),
  ]);
  usernameError = signal('');
  
  // email
  // Adiciona validadores de necessário e de formato de email
  email = new FormControl('', [Validators.required, Validators.email]);
  emailError = signal('');
  
  // password
  // Adiciona validadores de necessário e de tamanho mínimo
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  passwordError = signal('');
  
  // Inscreve os sinais de erro a qualquer mudança nos campos do formulário
  onInit() {
    merge(this.username.statusChanges, this.username.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateUsernameError());

    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateEmailError());

    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updatePasswordError());
  }
  
  ...
}
```

#### Testes

**View to model**

```ts
it('should update the value of the input field', () => {
	const input = fixture.nativeElement.querySelector('input');
	const event = createNewEvent('input');
	input.value = 'Red';
	input.dispatchEvent(event);
	expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
});
```

**Model to view**

```ts
it('should update the value in the control', () => {
	component.favoriteColorControl.setValue('Blue');
	const input = fixture.nativeElement.querySelector('input');
	expect(input.value).toBe('Blue');
});
```
