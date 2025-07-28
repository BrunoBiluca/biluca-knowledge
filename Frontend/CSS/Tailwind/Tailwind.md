# Tailwind

> [!info] Links
> - [Página do Tailwind](https://tailwindcss.com/)
> - [Documentação](https://tailwindcss.com/docs/installation/using-vite)
> - [HyperUI](https://www.hyperui.dev/) coleção de componentes prontos para Tailwind CSS v4
> 	- Só copiar o código e colar no projeto

Tailwind constrói um CSS estático a partir de todos os arquivos HTML, Javascript e outros tipos de templates do projeto.

Tailwind disponibiliza uma série de classes utilitárias que definem o CSS, isso é uma forma muito mais flexível e simples de estilizar o HTML do que o que estamos acostumados.

O código abaixo cria uma caixa de informação que exibe quando uma nova mensagem está disponível:

```html
<div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">
  <img class="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo" />
  <div>
    <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>
    <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>
  </div>
</div>
```

![[Exemplo de utilização do Tailwind.png]]

Construir HTML dessa forma pode contradizer vários dos princípios que estamos acostumados, porém a documentação do Tailwind diz que aplicando esse forma temos vários benefícios como:

- **Não é necessário pensar em nomes de classes**
- **Não é necessário alternar entre arquivos HTML e CSS para fazer estilização**
- **Adicionar ou remover uma classe utilitária apenas altera o comportamento daquele elemento**, ou seja, alterar uma classe no CSS não altera em múltiplos elementos que utilizam essa classe
- O **código é mais portátil**, como tanto a estrutura quanto a estilização está no mesmo lugar, mover código entre projetos é bem mais simples.
- **CSS para de crescer**, como as classes utilitárias são reutilizáveis, não é necessário escrever mais CSS a cada nova funcionalidade no projeto

#### Principais funcionalidades

- **Fácil estilização de estados hover e focus** 
- **Media queries** são implementadas de forma direta a partir das classes utilitárias de forma muito simples
- **Dark mode** pode ser facilmente configurado
- **Seletores complexos** são utilizado para definir combinações de condições para estilizar certo elemento
	- Ex: `dark:lg:data-current:hover:bg-indigo-600`
	 - Tradução
		 - O efeito `bg-indigo-600` é aplicado quando
		 - O elemento está em modo escuro
		 - Para telas grandes (`lg`)
		 - O atributo `data-current` existe
		 - E quando está hover
- **Variáveis de tema** ([documentação](https://tailwindcss.com/docs/theme)) são utilizadas para definir cores, tipografia, sombras e outros aspectos do design de uma aplicação