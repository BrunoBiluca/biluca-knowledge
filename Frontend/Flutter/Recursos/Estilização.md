# Estilização

Problemas comuns

- [[Solução - Conflito de cor entre texto e fundo personalizado]]

## Textos

Principais estilos de texto dentro de uma aplicação [[Flutter]] (inspirado no [[Material Design]]):

1. **Display** (Maior destaque, telas grandes)
    
2. **Headline** (Títulos de seção)
    
3. **Title** (Títulos de componentes, como AppBar)
    
4. **Body** (Texto principal de leitura)
    
5. **Label** (Textos de botões, legendas, badges)

```dart
// Exemplo de configuração
TextStyle(
  fontFamily: fontGeist,
  fontSize: 36,
  fontWeight: FontWeight.w700,
  color: textHigh,
  letterSpacing: -0.03,
  height: 1.22,
)
```