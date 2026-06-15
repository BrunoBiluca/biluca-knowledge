# Group

> [!info] Links
> - [Documentação](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-the-descendants-of-a-group)

Podemos utilizar o group para estilizar elementos baseados em descendentes de um elemento pai. Para isso marcamos o pai como `group` e usamos a variante `group-has-*` para estilizar o elemento alvo.

#### Exemplo

```html
<div class="group ...">
  <h4>Spencer Sharp</h4>
  <svg class="hidden group-has-[a]:block ..."><!-- ... --></svg>
  <p>Product Designer at <a href="...">planeteria.tech</a></p>
</div>
```

Nesse exemplo verificamos a utilização do `group`.

Quando o elemento pai (`div`) marcada como `group` tem um elemento filho do tipo `a` (link) ele aplica ao elemento `svg` a classe utilitária `block`.

## Group-hover

Também podemos utilizar o group-hover para quando queremos alterar o efeito de hover específico para cada elemento filho quando o elemento pai está ativo.

```html
<!-- Parent Container -->
<div class="group p-6 bg-white shadow-md hover:bg-blue-500 transition">
  
  <!-- Child Element 1: Text turns white on parent hover -->
  <h3 class="text-gray-900 group-hover:text-white font-bold">
    Card Title
  </h3>
  
  <!-- Child Element 2: Paragraph text shifts colors on parent hover -->
  <p class="text-gray-600 group-hover:text-blue-100">
    Hovering over anywhere inside this card triggers the group styles.
  </p>
</div>
```