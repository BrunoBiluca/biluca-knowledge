# Guia para desenvolvimento Web

## Configurações de projeto

### Modos da aplicação

Podemos executar a aplicação em diferentes modos como:

- `Standalone` ([[Modo Standalone]]) modo que o frontend funciona de forma isolada, principalmente utilizado para garantir o fluxo e estilização da aplicação. 
- `Local` modo que o frontend funciona conectando a serviços externos locais
- `Desenvolvimento`
- `Produção`

### Chaves

É importante garantirmos que as chaves dos nossos projetos sejam escondidas a fim de gerar falhas de seguranças em relação aos nossos dados e também evitar acesso indevido. No [[Frontend]] temos um problema ainda maior já que o **código é enviado diretamente** para os nossos clientes deixando ele vulnerável.

As chaves de API podem ser divididas em duas categorias:

1. Chaves Públicas por Natureza: algumas chaves de API foram feitas para rodar no navegador do cliente e o próprio fornecedor já sabe disso.

- **Exemplos:** Firebase, Google Maps, [[Supabase]], Stripe (Chave Pública/Publishable).
- **Por que é seguro?** Essas chaves sozinhas não dão acesso destrutivo à sua conta. A segurança delas é feita direto no painel do provedor (ex: bloqueando o Google Maps para funcionar **apenas** no seu domínio `seu-site.com`).

1. Chaves Privadas e Secretas: chaves que dão acesso total e irrestrito ao seu backend, banco de dados ou geram custos diretos por uso. Para resolver esse problema podemos utilizar o fluxo de autenticação [[On-Behaft-Of (OBO)]].

- **Exemplos:** OpenAI (ChatGPT), Stripe (Chave Secreta/Secret Key), SendGrid (envio de e-mails), chaves de bancos de dados.
- **Por que é perigoso?** O código do frontend geralmente é compilado junto com as credenciais. O nosso cliente pode verificar esse código apenas com uma inspeção do browser.

## Testes

[[Fundamentos de Software/Testes automatizados/Testes automatizados|Testes automatizados]]
[[Estratégias de testes (Web)]]

Para [[Frontend]] testes são muito importantes para garantir que a interação direta do usuário seja especificada, evitando problemas e garantindo que o usuário está seguindo um caminho otimizado para fazer o que ele precisa.

Assim, são coisas importantes para testar no Frontend:

- Comportamento dos componentes
	- Forma de renderização
	- Caminhos condicionais
		- Tratamento de erros
		- Carregamento de dados
	- Comunicação do componentes como a emissão de eventos a partir de ações dentro do componente.

- Controle de estado
	- Como os dados estão sendo gerenciado pela aplicação.
	- Como dados externos são recuperados.
		- Para dados externos podemos utilizar de mock para emular os dados

- Classes, funções ou módulos utilitários

- Fluxo do usuário
	- Testes para múltiplas ações, como por exemplo, testar uma página de gerenciamento de uma entidade, como adição, remoção e atualização de informações, todas ao mesmo tempo.

- Roteamento da aplicação

- Testes de acessibilidade
	- Verificar se campos de formulários tem labels associados
	- Bibliotecas como [jest-axe](https://github.com/nickcolley/jest-axe) ajudam a verificar se a aplicação segue alguns padrões de acessibilidade

- Testes de segurança
	- Limpeza de campos de texto, para garantir que nenhum SQL foi injetado