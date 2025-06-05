# Zod

[https://zod.dev/](https://zod.dev/ "https://zod.dev/")

Validação de esquemas TypeScript-first com inferência de tipos estáticos.

Mesmo que o [[TypeScript]] forneça algum tipo de validação de dados em tempo de compilação, o Zod trás várias outros tipos de validações durante a execução para garantir que os dados estão seguros para serem usados.

```typescript
const UserSchema = z.object({
  name: z.string(),
  url: z.string().url().startsWith("https://"),
  age: z.number().min(18),
  email: z.string().email(),
});
```

Funcionalidades

- Inferência automática de tipos
- Validação customizável como strings, números
	- Isso economiza muito em tamanho de código
- Transformação de dados (Coerção e Parsing)
- Mensagens de Erro descritivas
- Evita problemas como SQL Injection ou XSS

Integra facilmente com [[NextJS]], [[React]]