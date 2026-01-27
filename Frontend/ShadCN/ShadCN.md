# ShadCN

[Documentação](https://ui.shadcn.com/docs)

ShadCN é um conjunto de componentes desenhados para serem acessíveis e de fácil distribuição. Assim, qualquer projeto pode sair do papel com um design já bem refinado sem reinventar a roda.

Ele é construído para qualquer framework  [[React]], como [[Vite]] por exemplo. Ele não é uma biblioteca de componentes, ou seja, os componentes são gerados (a partir de templates) e então incorporados ao projeto. Essa filosofia facilita modificar os componentes gerados e criar novos componentes independente da versão da biblioteca.

**Requisito:** [[Tailwind]] 

Após instalado basta utilizar um comando em linha para gerar o componente.

```shell
# Cria o componente de botão
npx shadcn@latest add button
```

### Principais funcionalidades

O [[ShadCN]] provê principalmente:

- [Componentes](https://ui.shadcn.com/docs/components)
	- Elementos independentes para serem incorporados em qualquer projetos
- [Blocos](https://ui.shadcn.com/blocks)
	- Soluções completas para a aplicação como Dashboards, Sidebars e outros
- [Gráficos](https://ui.shadcn.com/charts/area)
	- Mais variados tipos de gráficos interativos 

Além das funcionalidades base existe um [repositório completo de componentes e blocos](https://ui.shadcn.com/docs/directory) desenvolvidos pela comunidade que fale a pena ser verificado.

### Configuração

A configuração do [[ShadCN]] é feita pelo arquivo `components.json` na raiz do projeto.

#### Alteração do caminho de criação dos componentes

No `comoponents.json` podemos alterar o caminho que os elementos são criados basta alterando o campo `aliases`:

```json
{
  ...
  "aliases": {
    "components": "src/components",         // por padrão "@/components"
    "utils": "src/lib/utils",               // por padrão "@/lib/utils"
    "ui": "src/components/ui",              // por padrão "@/components/ui" 
    "lib": "src/lib",                       // por padrão "@/lib"
    "hooks": "src/hooks"                    // por padrão "@/hooks"
  },
  ...
}
```