# Utilização de Token de Acesso

O Github mudou sua forma de acesso aos repositórios para a utilização de tokens de acesso no lugar de senhas.

Para utilizar os tokens de acesso para o controle de versão nos projetos precisamos fazer o seguinte:

- Criar um token com acesso ao conteúdo do repositório
	- [Página de tokens do usuário](https://github.com/settings/tokens)
	- [Documentação de gerenciamento de tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

- Caso o repositório já esteja clonado localmente precisamos alterar a referência remota para utilizar o token

```ps1
# adição da referência com o token criado
git remote set-url origin https://<USERNAME>:<TOKEN>@github.com/<USERNAME>/<REPO>.git
```

- Publicar a referência da branch atual no servidor remoto

```ps1
git push --set-upstream origin main
```

Com isso já temos todos os passos necessários para utilizar apenas o Token.