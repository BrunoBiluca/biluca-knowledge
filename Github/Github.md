---
categoria: serviço
---
# Github

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Website que disponibiliza armazenamento grátis para versionamento de projetos utilizando Git.

--- end-column ---

> [!info] Principais referências
> - [Página inicial](https://github.com/)
>- [Página de tokens do usuário](https://github.com/settings/tokens)

--- end-multi-column

# Utilização de Token para versionamento

O Github mudou sua forma de acesso aos repositórios para a utilização de tokens de acesso no lugar de senhas.

Para utilizar os tokens de acesso para o controle de versão nos projetos precisamos fazer o seguinte:

- Criar um token com acesso ao conteúdo do repositório
	- [Página de tokens do usuário](https://github.com/settings/tokens)
	- [Documentação de gerenciamento de tokens](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens)

- Caso o repositório já esteja clonado localmente precisamos alterar a referência remota para utilizar o token

```ps1
# remoção da referência original
git remote remove origin

# adição da referência com o token criado
git remote add origin https://<TOKEN>@github.com/<USERNAME>/<REPO>.git
```

- Publicar a referência da branch atual no servidor remoto

```ps1
git push --set-upstream origin main
```

Com isso já temos todos os passos necessários para utilizar apenas o Token.

# Publicações de versão

Uma funcionalidade muito comum durante o desenvolvimento de um projeto é disponibilizar versões do software de acordo com o avanço das funcionalidades. Isso nos permite testes versão específicas facilitando a verificação de problemas.

> [!quote]- (Tipo) - [Documentação da API de releases do Github](https://docs.github.com/pt/rest/releases/releases?apiVersion=2022-11-28)
> Principais endpoints utilizados para criar, atualizar e subir arquivos de uma publicação no Github.

O processo de publicação de versão pode ser feito em 3 etapas:

- Criar uma marcação da nova versão do projeto (tag)
- Criar uma publicação para essa nova versão
- Registrar o pacote compilado da nova versão pela url de upload criada a partir do passo anterior

Para utilizar o script é necessário

- Ter o git instalado
- Definir as configurações iniciais
- Criar um token de acesso com direitos a escrita e leitura de conteúdos

#### Configurações iniciais

```ps1
$versionFilePath = "..." # caminho para o arquivo que mantém a versão
$newVersionLine = "..." # nova versão
$package_filename = "..." # caminho para o arquivo compilado do projeto para a nova versão
$token = Get-Content "..." # caminho com o arquivo contendo o token de acesso
$github_username = "..."
$github_repo = "..."
```

#### Criação da marcação

```ps1
git add $versionFilePath
git commit -m "Deployment of version $newVersionLine"
git push
git push origin $newVersionLine
```

#### Criação da publicação

```ps1
$body = @{
    tag_name = $newVersionLine
    target_commitish = "main"
    name = $newVersionLine
    draft = $false
    prerelease = $false
    generate_release_notes = $true # pode ser definido para criar as notas de release automaticamente
} | ConvertTo-Json

$api_uri = "https://api.github.com/repos/$github_username/$github_repo"
$r = Invoke-WebRequest -Uri "$api_uri/releases" -Method Post `
  -Headers @{
      "Accept" = "application/vnd.github+json"
      "Authorization" = "Bearer $token"
      "X-GitHub-Api-Version" = "2022-11-28"
  } `
  -Body $body
```

#### Publicação do arquivo compilado

```ps1
$release_content = ConvertFrom-Json $r.Content
$upload_url = $release_content.upload_url
$upload_url = $upload_url -replace '\{\?name,label\}', "?name=$package_filename"

$ProgressPreference = 'SilentlyContinue' # Necessário já que a API Invoke-WebRequest é muito lenta sem isso
Invoke-WebRequest -Uri $upload_url -Method Post `
  -Headers @{
    "Authorization" = "Bearer $token"
    "Content-Type" = "application/octet-stream"
  } `
  -InFile "./dist/$package_filename"
```
