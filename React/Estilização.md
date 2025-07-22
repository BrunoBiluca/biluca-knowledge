# Estilização

Bibliotecas de estilização:

- [[Mantine]]
- [[Tailwind]]

# Limitações da propriedade Style (inline styles)

- **Designing with constraints** — todos os valores passados para definir tamanho, cores, espaçamentos são números mágicos definidos. Mesmo que eles sejam definidos em classes de estilo, é necessário chamar cada nova estilização os valores lá definidos.

- **Media queries** — não é possível utilizar Media queries com a propriedade Style, para criar interfaces responsivas é necessário a utilização de algum sistema de CSS (como CSS Modules ou [[Tailwind]]).