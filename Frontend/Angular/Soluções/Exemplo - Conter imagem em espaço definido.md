# Exemplo - Conter imagem em espaço definido

Uma solução muito comum de desenvolvimento [[Frontend]] é conter uma imagem dentro de um espaço definido. 

Esse problema é facilmente resolvido em [[Angular]] e [[Tailwind]] da seguinte maneira:

```html
<div class="w-full h-48">
	<img
		class="object-cover h-full w-full"
		src="https://placehold.co/600x400"
		alt=""
	/>
</div>
```

Para o **container** é necessário definir explicitamente suas dimensões:

- `w-full`
- `h-48`

Para a imagem definimos que ela irá ocupar todo o espaço permitido, porém sendo coberta pelo container. Dessa forma a imagem mesmo que com dimensões do container irá ser dimensionada ao espaço permitido.

- `object-cover`
	- Conteúdo é redimensionado para conter no container enquanto mantém a proporção (aspect ratio)
- `h-full`
- `w-full`