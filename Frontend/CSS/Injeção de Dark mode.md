# Injeção de Dark mode

Código para injetar Dark mode quando este não está disponível para utilização

```javascript
(function(){
    let style = `<style>
/*change your style here*/
body {
  background-color: Canvas;
  color: CanvasText;
  color-scheme: light dark;
}

pre {
    color: black;
}
</style>`;

document.head.insertAdjacentHTML("beforeend", style);
})();
```