# Temas

> [!info] Referências
> - [Documentação](https://tailwindcss.com/docs/theme)
> - [Todas as variáveis](https://tailwindcss.com/docs/theme#theme-variable-namespaces)
> 	- Definir uma nova variável nesse formato criar uma classe utilitária e uma variante disponível no projeto


[[Tailwind]] é um framework criado para construir designs personalizados e para isso é necessário configurar tipografia, cores, sombras, pontos de quebra de responsividade e mais.

Basicamente definimos essas variáveis personalizadas no [[CSS]] na raiz do projeto.

```css
@import "tailwindcss";

@theme {
  --*: initial;                        /* Ignora completamente o tema original do Tailwind*/
  
  --color-*: initial;                  /* Sobrescreve todas as cores para seus valores iniciais */
  --color-white: #ffffff;              /* Configura a cor branca */
  --color-orange-base: #fbbf24;        /* Configura a cor laranja base */ 

  --font-sans: "Cairo", sans-serif;    /* Sobrescreve a --font-sans originalmente definida pelo Tailwind */
  
  --breakpoint-3xl: 120rem;            /* Definie um novo variante*/
}
```

Nesse exemplo podemos utilizar como classe utilitária a cor definida:

```html
<p class="bg-white text-orange-base">
Algum texto
</p>
```

> [!tip] Por que `@theme` em vez de `:root`?
> Variáveis do tema não são apenas variáveis do CSS, elas também são importantes para instruir [[Tailwind]] para criar novas classes utilitárias que serão utilizadas durante o projeto.
> Variáveis de tema deve ser definidas no nível mais alto e não aninhadas em outros seletores ou media queries.
