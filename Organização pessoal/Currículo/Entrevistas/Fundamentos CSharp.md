# Fundamentos CSharp



> [!example] O que é deferred execution no LINQ?

**Conhecimentos abordados:**
- 

A query só é executada quando os dados são requisitados, por exemplo, por um foreach, toList, count. Dessa forma, é possível compor queries (plano lógico) e só requisitar a execução quando as informações são necessárias.


> [!example] O que é IDisposable e quando usar?

**Conhecimentos abordados:**
- 

 Interface para liberação de recursos não gerenciados pelo Garbage Collector (conexões, arquivos, handles). Para esses podemos criar um bloco de códiog com `using` para garantir que o recurso é liberado ao final do bloco.


> [!example] Diferença entre Func, Action e Predicate?

**Conhecimentos abordados:**
- 

`Func` retorna um valor
`Action` não retorna valor
`Predicate` retorna um valor boolean


> [!example] Como funciona o pipeline de middleware no [ASP.NET](https://asp.net/) Core?

**Conhecimentos abordados:**
- 

É uma cadeia de funções que processam a request em ordem e a resposta em ordem reversa. Cada middleware decide e chama o próximo.


> [!example] Como evitar N+1 no EF Core?

**Conhecimentos abordados:**
- 

- Use `Include`/`ThenInclude` (eager loading)
- Projeções com `Select`
- Split queries quando apropriado.


