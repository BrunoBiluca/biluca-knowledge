# Testes assíncronos (Vitest)

Para o [[Frontend/Vite/Vitest/Vitest|Vitest]] é necessário implementar um outro modelo para testes assíncronos já que não existe uma implementação do `zone.js` vinculada.

```ts
describe('', () => {
  beforeEach(async () => {
	...
	beforeEach(() => {
		vi.useFakeTimers();         // Habilita o uso dos timers falsos
	});
	
	afterEach(() => {
		vi.useRealTimers();         // Desabilita o uso dos timers falsos    
	});

    it('', async () => {
		await vi.runAllTimersAsync();       // Executa todos os timers agendados
		...
	});
});
```