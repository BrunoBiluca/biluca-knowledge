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

## Falhas de serviços externos

É muito comum utilizarmos serviços externos para exibir informações aos nossos usuários, porém esses serviços podem apresentar diversos tipos de indisponibilidades como um erro no sistema ou apenas uma falha de comunicação.

A implementação a seguir já leva em consideração os seguintes aspectos:

- Escreve no console no [[Standalone mode]] o erro e mais detalhes
- Habilita re-tentativas para qualquer falhas
- Desabilita re-tentativas em casos de falhas catastróficas, já que nesses casos não adianta o usuário ficar repetindo a operação

```ts
import { isStandalone } from "@app/testing/standalone-mode/standalone-mode";
import { ExternalError } from "@lib/external-error";
import * as React from "react";

export class ErrorBoundary extends React.Component<{
  fallback: React.ReactNode;
  children: React.ReactNode;
}> {
  state: { hasError: boolean; allowRetry?: boolean };
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, allowRetry: error instanceof ExternalError };
  }

  componentDidCatch(error: any, info: any) {
    if (isStandalone()) {
      console.log(error, info.componentStack, React.captureOwnerStack());
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          {this.props.fallback}
          {this.state.allowRetry ? (
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-gray-500 bg-gray-200 px-3 py-2 transition hover:cursor-pointer hover:bg-gray-100"
              onClick={() => this.setState({ hasError: false })}
            >
              Retry
            </button>
          ) : (
            <span>
              Esse serviço está indisponível no momento, por favor contate o
              suporte caso necessário.
            </span>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

```

