# Curso - The Complete Flutter Guide build Android, iOS and Web apps

> [!info] Informações gerais
> 
> [Página do curso](https://www.udemy.com/course/flutter-the-guide-to-build-android-ios-and-web-apps)
> 
> Instrutores
> [Sagnik Bhattacharya](https://www.udemy.com/user/sagnik-bhattacharya-5/)
> [Paulina Knop](https://www.udemy.com/user/paulina-knop/)
> 
> Aulas
> 25 horas

## Objetivo de aprendizado

Meu objetivo com esse curso é fundamentar os meus conhecimentos de [[Flutter]]. Eu comecei a aprender Flutter para um projeto específico ([[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]]) que já utilizo a bastante tempo e agora que avançar para o próximo nível com esse projeto. Então, ao final desse curso espero a partir de minha experiência prévia, verificar boas práticas nesse tipo de projeto e buscar possíveis melhorias no que já tenho hoje.

Além disso, irei passar novamente pelos principais conceitos do framework, o que pode ajudar em futuros projetos que eu decida utilizar-lo.

## Conceitos abordados

- Fundamental Flutter concepts e.g. Stateful vs. Stateless Widgets, Widget tree, state management, animations, JSON handling, and much more for Android, IOS, and Web
    
- Fundamental Dart concepts e.g. lists, maps,  loops, futures, streams, mixins, classes, objects, and much more.
    
- Having an in-depth understanding of Flutter Animations and Flutter Layouts.
    
- A hands-on approach for going through more than 150 flutter widgets e.g MaterialButton, TextEditingController, Gesture detector, URL Launcher, Dio, Drawers, and so much more.
    
- Responsive handling to make sure your flutter app fits almost every screen
    
- Flutter Navigations
    
- Portfolio of apps to impress recruiters and clients
    
- Flutter Streams & Flutter Future
    
- State management from basics to advanced topics like Provider & Riverpod & Hooks & Flutter multithreading
    
- Flutter Web free hosting on Firebase
    
- Domain name transfer, Flutter Firebase CLI
    
- Flutter Email authentication, FlutterGoogle authentication for web and mobile
    
- Deep dive into No-SQL database (Firestore)
    
- CI using Github actions.
    
- Software architectures like MVVM (Model View View-Model), Bloc, MVC, Clean architecture

## Anotações

### Arquitetura do Flutter

[[Flutter]] é um framework que permite a compilação de código [[Dart]] em código nativo das plataformas disponíveis.

### Widgets

Dentro de uma linha ou coluna, o tamanho na direção cruzada (cross) é dado pelo maior widget filho.

Tipos de containers para disposição de elementos:

- **Column**
- **Row**
- **Wrap** - funciona como um flexible container e ajuda a disposição dos filhos de acordo com o tamanho da tela
- **Stack** - empilha os elementos filho um sobre o outro
	- Muito utilizado com o widget **Positioned** para definir a posição específica de um widget interno

#### AppBar

- **iconTheme** pode ser utilizado para alterar o tema de todos os ícones utilizados dentro da AppBar.

#### MouseEnter

Cria uma região para capturar os eventos do mouse, como `onEnter`, `onLeave`

### Animations

#### AnimationDefaultTextStyle

Cria uma animação em relação ao estilo do texto.

O elemento de text interno não deve ser estilizado para permitir que o `AnimationDefaultTextStyle` aplique as mudanças.

> [!tip] Animação de texto sublinhado
> Não existe uma propriedade específica para aumentar o espeço entre o texto e a linha.
> 
> Isso pode ser realizado da seguinte forma:
> - Alteramos a cor do texto para transparente
> - Utilizamos a propriedade de sombra com o offset posicionado acima da linha

#### SingleTickerProviderStateMixin

Esse mixin adiciona a funcionalidade ao widget de ter acesso ao Ticker que atualiza um StatefulWidget sempre que um novo frame é gerado pela aplicação.

To create the [AnimationController](https://api.flutter.dev/flutter/animation/AnimationController-class.html) in a [State](https://api.flutter.dev/flutter/widgets/State-class.html) that only uses a single [AnimationController](https://api.flutter.dev/flutter/animation/AnimationController-class.html), mix in this class, then pass `vsync: this` to the animation controller constructor.

```dart
class AnimatedWidget extends State<AnimatedWidget> 
	with SingleTickerProviderStateMixin {
	
	// Cria a instância do controller de animação
	late AnimationController _controller = AnimationController(
		vsync: this,
		durantion: const Duration(seconds: 4),
	)..repeat()
	
	// Exemplo de animação de translação do elemento
	late Animation<Offset> _animation = Tween(
		begin: Offset.zero,
		end: Offset(0, 8)
	).animate(_controller)
	
	@override
	Widget build(context) {
		...
	}
}
```

### Formulários

#### TextInputField

Propriedades:

- **inputFormatters** - define os valores aceitos de entrada do usuário
- **validator** - valida o valor de entrada
- **autoValidator** - define o comportamento que o campo de texto será validado e ativará o texto de erro

### Navigation

Tipos de navegações em aplicações Flutter:

- **Navigator e context** - formato mais básico, cada página é empilhada no histórico de navegação
- **Routes** - formato mais sofisticado que permite uma configuração a partir de nomes das páginas para guia a navegação

Para evitar que um hash `#` seja adicionado a URL da aplicação, podemos utilizar a função  `setUrlPathStrategy()` na raiz do projeto.

#### Deep link

Para deep link podemos utilizar [[go_router]].

### Ferramentas e recursos auxiliares

#### Icon kitchen

[icon.kitchen](icon.kitchen) é um site para a criação de ícones para a aplicações.

Permite criar ícones para todas as plataformas disponíveis.

#### Dartpad

Dartpad é um website que permite criar pequenos códigos em Dart ou Flutter. Muito bom para experimentar.

#### Firebase

Firebase é um conjunto de serviços de backend.

Pode ser utilizado para hospedagem, armazenamento, banco de dados (padrão e real-time).

