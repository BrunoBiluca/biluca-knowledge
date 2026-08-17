# JSX

**JSX (JavaScript XML)** é uma extensão de sintaxe para JavaScript, muito utilizada com **React** para descrever a estrutura da interface do usuário (UI) de forma declarativa. Ele permite escrever **HTML-like** dentro do código JavaScript, facilitando a criação de componentes [[React]].

- Sintaxe semelhante ao HTML, mas é JavaScript
- Permite incorporar expressões Javascript
- Componentes React são descritos como Tags (diferente do [[Angular]] que faz referência por texto)
- Atributos são passados como objetos para os componentes

> [!info] O JSX parece HTML, mas na verdade é convertido em chamadas de função JavaScript (`React.createElement()`).
> 
> ```jsx
> const element = <h1>Olá, mundo!</h1>;
> ```
> 
> É transformado em:
> 
> ```javascript
> const element = React.createElement("h1", null, "Olá, mundo!");
> ```

Mesmo que o [[React]] já forneça a função para transformar JSX em Javascript, o [[Babel]] é amplamente utilizado por vários outros motivos.