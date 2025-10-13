# Angular CDK

É um conjunto de ferramentas e utilidades providas pelo time do Angular para reuso de funcionalidades comuns de aplicações em [[Angular]]

Exemplos de utilidades:

- Drag and Drop
- Overlay
- Scrolling
- Clip board

# Clipboard

[Documentação](https://material.angular.dev/cdk/clipboard/overview)

Ajuda a trabalhar com o Clipboard do sistema.

```html
<button [cdkCopyToClipboard]="value">Copiar</button>
```

Para textos pequenos pode-se utilizar apenas o método de copy `clipboard.copy(string)`.

Para textos maiores o navegador precisa de tempo para realizar a operação. Nesses casos é necessário fazer um sistema de tentativas em caso o navegador cancele a operação de cópia.