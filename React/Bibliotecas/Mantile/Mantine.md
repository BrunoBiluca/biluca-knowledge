# Mantine

[Página do Mantine](https://mantine.dev/)
[Documentação](https://mantine.dev/getting-started/)

É uma biblioteca de componentes para [[React]] que oferece um conjunto de funcionalidades prontas para uso como componentes, hooks utilitários, recursos de estilização...

O Mantine é mais do que apenas uma biblioteca de estilização, ela define os comportamentos dos componentes e recursos para melhorar a experiência de desenvolvimento enquanto entrega uma experiência do usuário satisfatória. Assim, **para uma primeira versão de uma aplicação**, que ainda não tem estilo próprio definido, é uma ótima biblioteca a ser utilizada.

> [!tip] Mantine é opinativo
> O Mantine foca em definir todo o comportamento dos componentes e recursos para que o desenvolvedor não precise, por esse motivo é importante buscar entender bem cada componente e a utilização de seus recursos, caso contrário conflitos vão acontecer e uma briga com a biblioteca irá começar.

#### Principais funcionalidades

- **Componentes prontos**
- **Estilização fácil** com suporte de temas personalizáveis
- **Hooks úteis**, como `useMediaQuery` (para responsividade)
- **Integração simples** com [[Next.js]], [[Remix]], [[Vite]]
- **Ecossistema de extensões** que permitem adicionar novas funcionalidades como editores de texto, gráficos, sistema de notificação e mais
- Pacote exclusivo para **gerenciamento de formulários**

#### Alternativas

- [[Tailwind]]
	- Tailwind tem uma abordagem completamente diferente do Mantine, nele são disponibilizados as classes CSS utilitárias para a criação a estilização, e todo o trabalho de criação de componentes fica a cargo do desenvolvedor.
	- Assim é indicado utilizar o Tailwind quando já existem um sistema de componentes personalizados, já que o Mantine pode apresentar comportamentos padrão que destoem do sistema

## Estilizando os componentes

O Mantine já trás prontos uma série de componentes, mas nem por isso eles são fixos e não podem ser personalizados.

Para personalizar os componentes existem 3 formas principais:

- Propriedade Style
- Módulos CSS (recomendada)
- Configuração de temas (Theme tokens)

## Hooks utilitários

- [useHover](https://mantine.dev/hooks/use-hover/)
	- Nunca mais será necessário implementar o mesmo código para resolver quando um elemento tem o cursor sobre.
- [useMove](https://mantine.dev/hooks/use-move/)
	- Hook utilizado para mover elementos na tela