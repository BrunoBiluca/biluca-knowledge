---
categoria: biblioteca
---
# React Testing Library

 React Testing Library é uma solução leve para testes em componentes do [[React]]. Esse biblioteca é baseado no DOM  e visa possibilitar a criação de testes que se assemelham a forma como o software é utilizado.

> [!info] Principais referências
>- [Documentação](https://testing-library.com/docs/react-testing-library/intro/)
>- [Guia de princípios](https://testing-library.com/docs/guiding-principles/)

# Guia de princípios

> [!tip] Guia
> Quanto mais parecidos os seus testes são do uso real da aplicação, mais confiança eles podem te fornecer.

Com a frase acima em mente são pensados alguns princípios:

- Componentes devem ser manuseados a partir dos nós do DOM
- Encorajar os testes baseados no uso real dos componentes
- APIs e implementações de utilidades (códigos auxiliares aos testes) devem ser simples e flexíveis.

Ordem de prioridade na hora de implementar testes

1. Consultas acessíveis a todos: consultas que refletem a experiência do usuário
	- `getByRole` pode ser usado para elementos expostos para o usuário.
	- `getByLabelText` pode ser usado para campos de formulários.

2. Consultas semânticas

3. Test IDs deve ser utilizado apenas quando não é possível consultar por role (papel) ou o texto é dinâmico.

# Casos de uso

### Act

Act é utilizado para simular eventos assíncronos, permitindo que o teste sempre esteja no estado esperado.

```ts
it('should add todo', () => {
	const { result } = renderHook(() => useTodoList())
	
	act(() => {
	  result.current.addTodo('Test todo')
	})
	
	expect(result.current.todos).toHaveLength(1)
	expect(result.current.todos[0].text).toBe('Test todo')
	expect(result.current.todos[0].completed).toBe(false)
})
```

No exemplo acima, o `act` é utilizado para atualizar o estado do Hook de uma lista de tarefas, permitindo assim verificar o estado esperado logo após a invocação da função.

# Eventos de usuários

Para eventos de usuários existe um biblioteca específica que pode ser utilizada [user-event](https://testing-library.com/docs/user-event/intro). Ela foi criada para criar uma versão mais alto nível dos eventos que o DOM dispara facilitando a escrita de testes a partir de uma perspectiva voltada a ações executadas pelo usuário.