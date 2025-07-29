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
