# Breakpoints

[[Tailwind]] permite definir nos próprios componentes suas quebras de acordo com as dimensões do viewport do browser.

```html
<div
  className="grid max-w-full grid-cols-1 gap-4 
	  sm:grid-cols-2
	  md:grid-cols-3 
	  lg:grid-cols-4"
  role="list"
>
	<component></component>
</div>
```

- **sm**
- **md**
- **lg**