### NgRx

[Documentação](https://ngrx.io/docs)

É um framework para criação de aplicações reativas com [[Angular]].

NgRx vem com duas soluções para contextos diferentes de aplicações:

- Gerenciamento global e recorrente de dados, recomenda-se @ngrx/store
	- Essa solução é recomendada apenas para casos mais robustos como descrito em [Por que usar NgRx Store para gerenciamento de estado](https://ngrx.io/guide/store/why)

- Gerenciamento em nível de componente e poucas propriedades, recomenda-se @ngrx/signals