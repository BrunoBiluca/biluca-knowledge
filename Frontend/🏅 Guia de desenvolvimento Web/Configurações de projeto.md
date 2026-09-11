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

2. Chaves Privadas e Secretas: chaves que dão acesso total e irrestrito ao seu backend, banco de dados ou geram custos diretos por uso. Para resolver esse problema podemos utilizar o fluxo de autenticação [[On-Behaft-Of (OBO)]].

- **Exemplos:** OpenAI (ChatGPT), Stripe (Chave Secreta/Secret Key), SendGrid (envio de e-mails), chaves de bancos de dados.
- **Por que é perigoso?** O código do frontend geralmente é compilado junto com as credenciais. O nosso cliente pode verificar esse código apenas com uma inspeção do browser.
