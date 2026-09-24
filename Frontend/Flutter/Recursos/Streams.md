# Streams

- [Documentação - StreamBuilder](https://api.flutter.dev/flutter/widgets/StreamBuilder-class.html)

### StreamBuilder com delay

```dart
class StreamBuilderExample extends StatefulWidget {
  const StreamBuilderExample({required this.delay, super.key});

  final Duration delay;

  @override
  State<StreamBuilderExample> createState() => _StreamBuilderExampleState();
}

class _StreamBuilderExampleState extends State<StreamBuilderExample> {

  // Abre o controlador do stream que será responsável por notificar sobre novas informações
  late final StreamController<int> _controller = StreamController<int>(
    onListen: () async {
      await Future<void>.delayed(widget.delay);

      if (!_controller.isClosed) {
        _controller.add(1)
      }

      await Future<void>.delayed(widget.delay);

      if (!_controller.isClosed) {
        _controller.close();
      }
    },
  );

  @override
  void dispose() {
    if (!_controller.isClosed) {
      _controller.close();
    }
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return StreamBuilder<int>(
      stream: _controller.stream,
      builder: (BuildContext context, AsyncSnapshot<int> snapshot) {
        List<Widget> children;
        if (snapshot.hasError) {
          ...
        }

		  switch (snapshot.connectionState) {
			case ConnectionState.none:
				...  // dados iniciais
			case ConnectionState.waiting:
				...  // uma operaçõa assíncrona inicial
			case ConnectionState.active:
				...  // alguns dados já estão disponíveis, mas podem mudar
			case ConnectionState.done:
				...  // dados disponíveis
		}

        ...
	});
  }
}
```