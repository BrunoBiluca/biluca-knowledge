# Re-tentativas

Em qualquer integração externa de um serviço de [[Backend]] é importante pensarmos em um sistema de re-tentativas. São várias variáveis que podem deixar um serviço indisponível temporariamente.

## Estratégias

### Exponential backoff

**Exponential backoff** é um algoritmo ou estratégia de gerenciamento de erros que **atrasa repetidamente o tempo entre as tentativas de uma operação** (como uma requisição de rede) até que a operação tenha sucesso ou o limite máximo de tentativas seja atingido.

```js
async function fetchWithBackoff(url, retries = 5, delay = 1000) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Erro na requisição');
    return await response.json();
  } catch (error) {
    // Se não houver mais tentativas restantes, joga o erro
    if (retries === 0) throw error;

    // Adiciona Jitter (aleatoriedade) para evitar o efeito manada
    const jitter = Math.random() * 200; 
    const nextDelay = delay * 2 + jitter;

    // Aguarda o tempo calculado antes de tentar de novo
    await new Promise(resolve => setTimeout(resolve, delay));
    
    // Chama a função recursivamente diminuindo o contador de tentativas
    return fetchWithBackoff(url, retries - 1, nextDelay);
  }
}
```

Nesse tipo de solução é comum adicionarmos também um elemento que impede o "efeito manada" (vários dispositivos conectarem ao mesmo tempo). Esse elemento é um valor aleatório chamado `jitter` que faz com que as **chamadas sejam enviadas de forma a onerar menos o serviço** que estamos requisitando.

### Timeout e deadlines

As tentativas de conexão também não podem rodar infinitamente. É importante darmos uma resposta para o usuários.

Para isso precisamos pensar em duas coisas:

- timeouts que são os tempos limites para fazer uma única operação
- deadlines que é o tempo total que vamos considerar para finalizar a requisição

Por exemplo, podemos definir um timeout de 2 segundos para uma consulta ao banco de dados e um deadline de 5 segundos para toda a requisição que o cliente fez ao serviço.

