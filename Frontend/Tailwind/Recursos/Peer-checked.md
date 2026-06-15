# Peer-checked

> [!info] Links
> [Documentação](https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-the-descendants-of-a-peer)

Peer checked é uma classe utilitária que permite estilizar um elemento irmão (mesma hierarquia) quando um input está marcado.

```html
<label class="flex items-center gap-2">
  <!-- 1. Mark the source input with "peer" -->
  <input type="checkbox" class="peer" />
  
  <!-- 2. Use "peer-checked:" on the following sibling -->
  <span class="text-gray-500 peer-checked:text-blue-600 peer-checked:font-bold">
    Toggle Text Color
  </span>
</label>
```

Quando o `input` estiver marcado o `span` irá aplicar a classe utilitária `text-blue-600`.

> [!info] Aplicação
> Esse tipo de solução é muito utilizada quando precisamos de **estilizar um input** do navegador, porém queremos manter a funcionalidade.

