# Flutter-Python starter kit para gRPC

É possível empacotar um servidor rodando python junto com a aplicação. Dessa forma podemos encapsular algumas funcionalidades para esse servidor local ou remoto. Para aplicativos desktop podemos utilizar o servidor local e para aplicativos mobile e web servidores remotos.

> [!Documentação]
> - [Guia de integração do Flutter com Python](https://dev.to/maximsaplin/integrating-flutter-all-6-platforms-and-python-a-comprehensive-guide-4ipo)
>   - [Resumo e código da integração](https://github.com/maxim-saplin/flutter_python_starter)

Esse repositório foca na criação de um servidor gRPC que o flutter irá fazer o acesso.

# Empacotamento de servidor python

Recursos necessários:

- [[Python#PyInstaller]] utilizado para gerar o executável do servidor python

Componentes
- Aplicativo flutter: processo principal
- Servidor python: processo executa em segundo plano

### Criação do bundle

Feito o empacotamento do servidor python é necessário adicioná-lo em um local acessível pelo aplicativo flutter, nesse caso dentro da pasta `assets`. Para isso é necessário definir ao `pubspec.yaml` o seguinte bloco de texto:

```yml
flutter:
  # ...outras configurações
  assets:
    - assets/
```

Como o servidor é um componente deve ser atualizado a cada nova versão podemos criar uma pasta chamada `gen` para identificar esse tipo de componente gerado. A hierarquia de pastas fica da seguinte forma:

```
- assets
	- gen
		- server_win
		- server_lnx
		- server_mac
```
### Inicialização

A inicialização do servidor python é feito pelo aplicativo flutter que atua como o processo pai:

```dart
import 'dart:io'; // biblioteca responsável por iniciar processos

void main() async {
	// ...outras inicializações  
	await executePredictServer();
	// ...outras inicializações  
	runApp(const App());
}

Future<void> executePredictServer() async {
	var serverProcess = await Process.start("assets/gen/server/predict_win/predict_win.exe", []);
	stdout.addStream(serverProcess.stdout); // ligamos as saídas do processo do servidor ao processo do aplicativo
	stderr.addStream(serverProcess.stderr); // dessa forma temos visão do que está ocorrendo
	
	int? exitCode;
	serverProcess.exitCode.then((v) {
		exitCode = v;
	});
	await Future.delayed(const Duration(seconds: 1)); // tempo para aguardar a inicialização do servidor
	
	if (exitCode != null) {
		log.severe("Servidor de predição não foi inicializado com sucesso");
	}
}
```

### Término dos processos

Os processos executantes mesmo que relacionados eles não são compartilhados, assim caso o aplicativo seja encerrado precisamos manualmente finalizar a execução do servidor. Para isso definimos na raiz da nossa aplicação a interface chamada `WidgetsBindingObserver` e implementar o método `didRequestAppExit()` que é executado quando o aplicativo é finalizado.

Outra consideração é o nome do processo, ele é definido pelo nome do arquivo executado, no nosso caso `server_win.exe`

```dart
// app.dart
class App extends StatelessWidget with WidgetsBindingObserver {
	const App({super.key});
	
	@override
		Future<AppExitResponse> didRequestAppExit() async{
		print("Encerrando servidor de predição...");
		await Process.run('taskkill', ['/F', '/IM', "server_win.exe"]); 
		print("Servidor de predição encerrado com sucesso");
		return super.didRequestAppExit();
	}
	
	// ... demais código
	
	@override
	Widget build(BuildContext context) {
		WidgetsBinding.instance.addObserver(this); // adiciona esta instância para ser notificada
		return ...widget
	}
}
```

> [!info]- WidgetsBindingObserver
> É uma interface utilizada para se registrar ao controlador do widget e ser notificada de alterações no ambiente, como métricas do dispositivo ou configurações de acessibilidade.
> - [Documentação](https://api.flutter.dev/flutter/widgets/WidgetsBindingObserver-class.html)

Além dessa alteração precisamos inicializar as ligações entre os widget para que as classes sejam devidamente notificadas.

```dart
// main.dart
void main() {
	WidgetsFlutterBinding.ensureInitialized();
	// ...demais inicializações
	runApp(const App());
}
```