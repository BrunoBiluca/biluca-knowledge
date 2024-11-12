---
categoria: prática
---
# Otimizações no Delta Lake

O [[Delta lake]] provê uma série de otimizações a partir de suas configurações. Para **cada tipo de problema a configuração correta pode proporcionar ganhos muito grandes de performance**. 


> [!quote]- (Documentação) - [Otimizações de OSS](https://docs.delta.io/latest/optimizations-oss.html)
> Apresenta uma lista de considerações na hora de otimizar o Delta Lake para o seu caso.

# Considerações sobre versionamento (time travel)

O Delta lake pode sofrer com **problemas de performance** a medida que seu estado é alterado. Isso ocorre porque são criados vários arquivos pequenos a cada transformação feita, o que faz a consulta desse histórico ser mais onerosa a cada consulta feita.

É indicado utilizar o **versionamento do Delta lake apenas para versões mais recentes** e de tempos em tempos remover os registros mais antigos.

```sql
-- exemplo de limpeza de base
VACUUM students RETAIN 0 HOURS

-- para exibir os resultados removidos antes da operação
VACUUM students RETAIN 0 HOURS DRY RUN
```
