# Estratégias de renderização

Existem pelo menos 4 estratégias de renderização em aplicações web:

- CSR - Client Side Render
	- Renderização é totalmente guiada pelo cliente (browser)
	- Tecnologias que implementam esse tipo de renderização
		- [[React]]

- SSR - Server Side Render
	- Renderização é feita principalmente no servidor, pode ser mais rápido e tem algumas vantagens em relação a SEO
	- Tecnologias
		- [[Next.js]]
		- [[Remix]]
		- [[React Router]] pode ser configurado para utilizar SSR

- SSG - Static Side Generation
	- O website é criado a no momento de construção e publicado de forma estática

- ISR - Incremental Static Generation
	- Combina SSG e SSR, onde algumas páginas serão estática e algumas páginas são renderizadas no servidor
	- Websites que não são muito atualizados são um bom caso de uso para ISR

