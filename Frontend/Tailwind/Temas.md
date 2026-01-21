# Temas

[Documentação](https://tailwindcss.com/docs/theme)

[[Tailwind]] é um framework criado para construir designs personalizados e para isso é necessário configurar tipografia, cores, sombras, pontos de quebra de responsividade e mais.

Basicamente definirmos essas variáveis personalizadas no CSS na raiz do projeto.

```css
@import "tailwindcss";

@theme {
  --color-*: initial;                  /* Sobrescreve todas as cores para seus valores iniciais */
  --color-white: #ffffff;              /* Configura a cor branca */
  --color-orange-base: #fbbf24;        /* Configura a cor laranja base */ 

  --font-sans: "Cairo", sans-serif;
}
```

Nesse exemplo podemos:

```html
<p class="bg-white text-orange-base">
Algum texto
</p>
```

## Layers (camadas)

[[Tailwind]] divide todas as suas classes em 3 categorias

- **base:** estilos base, como cabeçalhos, parágrafos e imagens
- **utilities:** classes de uma única propriedade, como `text-sm`
- **components:** css com múltiplas propriedades, como botões, containers.

```css
// app.css
/* Modifica a camada base */
@layer base {
	/* Aplica ao h1 as propriedades */
	h1 { @apply text-2xl font-bold text-black; }
	h2 { @apply text-xl font-semibold text-black; }  
}

.btn-blue { @apply px-4 py-2 inline-block bg-blue-500; }

@layer components {
	.btn-red { @apply px-4 py-2 inline-block bg-red-500; } 
}
```

Utilizar camadas também nos permite definir modificadores para as regras, como focus, hover ou responsividade.

```html
// app.html

<!-- Não aplica os estilos do btn-blue quando a tela é pequena -->
<button type="button" class="hidden sm:btn-blue">
    Button
</button>

<!-- Aplica os estilos do btn-red quando a tela é pequena -->
<button type="button" class="hidden sm:btn-red">
    Button
</button>
```

> [!tip] **@apply** dentro ou fora da camada?
> Utilizar dentro de uma camada garante que as definições só entrarão na compilação dos estilos quando forem utilizadas, otimizando um pouco a performance por reduzir o tamanho do arquivo de estilos.

> [!warning] Compilação de estilos
> Remover estilos pode ser algo bom para o projeto por otimizar o tamanho do arquivo de estilos, mas pode não ser algo que queremos sempre. Por exemplo, caso componentes sejam retornados por um backend, precisamos garantir que seus estilos estejam definidos no projetos.
> 
> Assim, é importante saber os requisitos do projetos para definir qual o comportamento esperado.

