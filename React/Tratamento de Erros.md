# Tratamento de Erros

Erros no React podem ser tratados a partir de gerenciamento de estado.

Como no exemplo abaixo que gerencia o erro de uma requisição a partir da variável de estado `error`.

```js
function ComponenteComFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api.example.com/data")
      .then((res) => res.json())
      .then(setData)
      .catch((err) => setError(err.message)); // Captura erros do fetch
  }, []);

  if (error) return <p>Erro ao carregar dados: {error}</p>;
  return <div>{data ? data : "Carregando..."}</div>;
}
```

Esse é um método muito repetitivo e oneroso de tratamento de erros, por isso existem bibliotecas que já fazem grande parte do trabalho, como [react-error-boundary](https://github.com/bvaughn/react-error-boundary).

Existem também alternativas quando utilizamos frameworks como [[Remix]] e [[Next.js]] para tratamento de erros, cada um desses frameworks implementa o seu modelo de tratamento.