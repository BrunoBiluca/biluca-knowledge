# Role-based access control (RBAC)

O RBAC é um modelo onde o acesso aos recursos não é dado diretamente ao usuário, mas sim à **função (ou cargo)** que ele ocupa dentro da organização. O usuário recebe permissões ao ser associado a uma função, e essa função possui as permissões necessárias para executar determinadas tarefas.

**Os 3 pilares do RBAC:**

- **Usuário:** A pessoa que opera o sistema.
    
- **Função (Role):** O cargo ou conjunto de tarefas (ex: "Gerente Financeiro", "Analista de RH").
    
- **Permissão:** A autorização para executar uma ação específica (ex: "Ler arquivo X", "Aprovar pagamento").

**Regra de Ouro:** O usuário **herda** as permissões da função. Se o João é promovido de "Assistente" para "Gerente", você não altera as permissões do João; você apenas troca a função dele.

**Exemplo prático:**  
Em um sistema de folha de pagamento:

- Função **"Auditor"** → Permissão: _Apenas visualizar_ salários.
    
- Função **"Gerente de RH"** → Permissão: _Visualizar, editar e aprovar_ salários.
    
- Função **"Funcionário"** → Permissão: _Visualizar apenas o próprio_ salário.
   

**Vantagens:** Facilita a gestão em larga escala (gerenciar 50 funções é mais fácil do que gerenciar 1.000 usuários individuais) e garante o princípio do **Menor Privilégio** (o usuário só tem acesso ao estritamente necessário para seu cargo).