# Configuração do VSCode

Existem algumas configurações do [[VSCode]] que possibilitam ter uma experiência melhor de desenvolvimento com o [[Tailwind]].

### Quebra de linha entre as classes

Por padrão o [[VSCode]] não quebra linhas entre as classes de uma elemento [[HTML]], por esse motivo, podemos ter linhas muito grandes quanto utilizamos [[Tailwind]].

Para uma melhor experiência de desenvolvimento removendo a necessidade de rolagem horizontal, podemos aplicar a seguinte configuração.

```json
// project.code-workspace
{
  "settings": {
    "editor.formatOnSave": true,
    "editor.rulers": [120],                 // define linha na coluna 120
    "html.format.wrapAttributes": "auto",   // habilita quebra de linha em atributos HTML
    "editor.wordWrapColumn": 120,           // quebra de linha na coluna 120
    "editor.wordWrap": "bounded",
  },
}
```

###  Extensões

Recomendadas

- [[Tailwind CSS IntelliSense]]