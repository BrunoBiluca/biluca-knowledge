---
categoria: prática
---
### Formatador padrão

Necessário instalar o formatador autopep8.

```json
// settings.json
"[python]": {
	"editor.defaultFormatter": "ms-python.autopep8",
},
"autopep8.args": [
	"--max-line-length",
	"120"
]
```