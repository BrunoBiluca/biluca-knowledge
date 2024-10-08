# ACID

ACID é uma conjunto de características que suportam as transações atômicas muito utilizadas em bases de dados. Elas garantem que a base de dados irá manter uma imagem consistente do mundo dos dados.

- *Atomicity*
	- Garante que uma conjunto de alterações seja registrado como uma unidade.
- *Consistency*
	- Qualquer leitura a uma base de dados irá retornar a última versão do item recuperado.
- *Isolation*
	- Define que se duas atualizações estão correndo concorrentemente para a mesma coisa, o estado final da base de dados será executado em ordem sequencial
- *Durability*
	- Indica que os dados registrados nunca serão perdidos

Características:
- ➕ Simplifica bastante o desenvolvimento de aplicações
- ➖ A fim de garantir consistência verificações são definidas impactando na performance do sistema

Exemplo: Conta de banco
Um usuário que enviar R$ 100,00 da conta A para a conta B.

Em um sistema ACID a operação para isso ser possível é feita da seguinte maneira:

```mermaid
flowchart TB

classDef f stroke:#f00 
classDef s stroke:#0f0

subgraph e1 ["Estado inicial"]
b("Conta A : R$ 500,00")
c("Conta B : R$ 200,00")
end

subgraph e3 ["Estado revertido"]
b1("Conta A : R$ 500,00")
c2("Conta B : R$ 200,00")
end

a("Verifica-se se conta A tem os fundos")

subgraph Transaction
direction LR
h("Atualiza conta A (-R$ 100,00)")
i("Atualiza conta B (+R$ 100,00)")
end

sucesso("Sucesso: todas as alteração são registradas")
falha("Falha: todas as alterações são revertidas")

subgraph e2 ["Novo estado"]
direction LR
f("Conta A : R$ 400,00")
g("Conta B : R$ 300,00")
end

a --> e1
e1 --> Transaction
Transaction --> sucesso:::s
sucesso --> e2
Transaction --> falha:::f
falha --> e3
```