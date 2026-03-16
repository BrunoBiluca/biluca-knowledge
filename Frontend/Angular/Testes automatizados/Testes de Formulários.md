### Formulários

#### View to model

Quando queremos testar os elementos do template, como inputs.

```ts
it('should update the value of the input field', () => {
	const input = fixture.nativeElement.querySelector('input');
	const event = createNewEvent('input');
	input.value = 'Red';
	input.dispatchEvent(event);
	expect(fixture.componentInstance.favoriteColorControl.value).toEqual('Red');
});
```

#### Model to view

Quando queremos testar o comportamento do modelo e como ele impacta na visualização e nos inputs.

```ts
it('should update the value in the control', () => {
	component.favoriteColorControl.setValue('Blue');
	const input = fixture.nativeElement.querySelector('input');
	expect(input.value).toBe('Blue');
});
```