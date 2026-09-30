# Solução - Responsividade

> [!example] Projetos relacionados
> - [[Projetos/Projeto - Biluca Finanças/Biluca Finanças|Biluca Finanças]]

Todo projeto de [[Frontend/Frontend]] precisa garantir que possa ser apresentado em vários tipos de telas.

No [[Flutter]] temos dois tipos de estruturas para nos informarmos:

- `BuildContext` disponibiliza informações gerais, como o tamanho da tela por exemplo
- `LayoutBuilder` disponibiliza informações locais do container que o Widget se encontra.

## LayoutBuilder

O LayoutBuilder é muito importante para exibir elementos de acordo com o que já está sendo renderizado. Por exemplo, o tamanho da tela de um dispositivo muito raramente irá mudar, talvez no caso do navegador mude mais, porém o que está sendo exibido muda constantemente, como uma barra lateral que pode expandir e comprimir de acordo com o uso do usuário.

### Reagir a largura do container

```dart
LayoutBuilder(builder: (context, constraints) => {
	constraints.maxWidth // largura do container atual que o LayoutBuilder será renderizado
})
```