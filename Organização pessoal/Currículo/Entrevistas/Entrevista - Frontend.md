# Entrevista - Frontend

Conteúdo relacionado a perguntas para entrevistas técnicas de [[Frontend]].

## Geral

Temas gerais:

- Componentes e estrutura de projeto
	- Ciclo de vida
- [[Frontend/React/🏅 Melhores práticas/Gerenciamento de estado|Gerenciamento de estado]]
- Gerenciamento de estado assíncrono (dados externos)
	- [[Cache no Frontend]]
	- Revalidação de cache
- Filtros em tempo real
	- Debounce
- [[Paginação]]
	- OFFSET/LIMIT
	- Cursor-based
	- Keyset-based com indexação
- Roteamento
	- Compartilhamento pela URL
- Server-side render

## [[React]]

### Possíveis perguntas

> [!example]- Você precisa construir uma página de portal com listagem de projetos, filtros em tempo real e roteamento dinâmico. Como você estruturaria isso em Next.js? Quais hooks e padrões usaria para performance?

**Conhecimentos abordados:**

- Base: [[React]], [[Next.js]]
- [[Frontend/React/🏅 Melhores práticas/Gerenciamento de estado|Gerenciamento de estado]]
	- Assíncrono, por exemplo com [[TanStack Query]]
	- Aplicação, por exemplo com [[Zustand]]
- [[Cache no Frontend]]
	- Junto com a cache vem as estratégias de revalidação de cache
- Filtros em tempo real
	- [[Solução - Filtros em tempo real]]
- [[Paginação]]
	- OFFSET/LIMIT
	- Cursor-based
	- Keyset-based com indexação
- Roteamento no [[Next.js]]
	- Permitir compartilhar filtros pela URL da aplicação

**Resposta:**

Para a integração com serviços externos utilizaria a biblioteca TanStack para **gerenciamento de estado assíncrono**, isso me permite utilizar seus recursos de **cache** para consultas já desempenhadas pelo usuário. Porém, é necessário ter atenção ao configurar `staleTime` para garantir que o usuário esteja sempre vendo **dados atuais**, em caso de atualização ou remoção de dados, a cache deve ser invalidada. Pensando em **paginação** podemos utilizar um sistema básico de OFFSET/LIMIT, Cursor-based ou Keyset-based com indexação (se os campos de filtros forem indexados).

Para os **filtros em tempo** real utilizar alguma biblioteca para controle de **estado da aplicação**, como o Zustand. Como podemos ter filtros por texto, é importante aplicarmos uma estratégia de **Debouncer** para reduzir o número de chamadas aos serviços externos.

Também podemos permitir que o usuário **compartilhe** a página com filtros previamente selecionados. Isso é possível utilizando o **roteador** do Next.js pelo **hook useRouter**. Assim, na inicialização da página, lemos os parâmetros passados na URL para popular os filtros e o Zustand.

Para páginas de detalhes, como uma página de um produto, por exemplo, podemos utilizar a capacidade do Next.js de **gerar páginas estáticas** em tempo de construção, melhorando a performance tanto no frontend como reduz a carga no servidor.

### [[Angular]]

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