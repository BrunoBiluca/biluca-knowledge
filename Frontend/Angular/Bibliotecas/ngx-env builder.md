# ngx-env builder

O pacote `@ngx-env/builder` resolve perfeitamente o problema de **não expor as chaves no GitHub** (segurança no código-fonte), mas ele **não esconde** as chaves no navegador do usuário final (segurança em tempo de execução).

Para entender o risco e saber o que fazer, divida as chaves de API em duas categorias:

### 1. Chaves Públicas por Natureza (Seguro com @ngx-env/builder)

Algumas chaves de API foram feitas para rodar no navegador do cliente e o próprio fornecedor já sabe disso.

- **Exemplos:** Firebase, Google Maps, Supabase, Stripe (Chave Pública/Publishable).
- **Por que é seguro?** Essas chaves sozinhas não dão acesso destrutivo à sua conta. A segurança delas é feita direto no painel do provedor (ex: bloqueando o Google Maps para funcionar **apenas** no seu domínio `seu-site.com`).
- **Como o pacote ajuda:** Excelente para trocar a chave de homologação pela de produção sem deixar rastros no Git.

### 2. Chaves Privadas e Secretas (INSEGURO com @ngx-env/builder)

Chaves que dão acesso total e irrestrito ao seu backend, banco de dados ou geram custos diretos por uso.

- **Exemplos:** OpenAI (ChatGPT), Stripe (Chave Secreta/Secret Key), SendGrid (envio de e-mails), chaves de bancos de dados.
- **Por que é perigoso?** O Angular compila todo o código para JavaScript. O `@ngx-env/builder` apenas injeta o texto da sua chave `.env` dentro desse JavaScript. Qualquer usuário que abrir o site, apertar **F12**, ir na aba _Network (Rede)_ ou inspecionar o arquivo `.js` compilado **vai encontrar a sua chave em texto limpo**.