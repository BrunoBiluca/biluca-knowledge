# Fundamentos Angular

[[Angular]]

> [!example] Que tipo de estruturas implementam os conceitos de autenticação e autorização no Angular?

**Conceitos abordados:**

- [[Roteamento|Roteamento no Angular]]

**Resposta:**

No Angular para rotas inteiras podemos utilizar o sistema de Guardas, dado pela propriedade `canActivate` de cada rota. Essas rotas são personalizáveis e podem  ser definidas de acordo com a autenticação ou com os papéis do usuário.

Por exemplo, a página de perfil do usuário só pode ser acessada caso o usuário esteja autenticado, uma página administrativa interna do sistema só pode ser acessada por usuários com a permissão para isso.

```ts
// AuthGuard: autenticação (tem token válido?)
canActivate(): boolean { return this.auth.isAuthenticated(); }

// RoleGuard: autorização (tem a role necessária?)
canActivate(route): boolean {
  return this.auth.hasRole(route.data.role);
}
```