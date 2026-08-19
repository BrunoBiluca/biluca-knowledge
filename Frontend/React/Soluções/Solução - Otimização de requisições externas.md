# Solução - Otimização de requisições externas com Promise.all

Um problema muito comum em projeto [[Frontend]] é carregar dados a partir de uma fonte externa. Existem várias formas de resolver esse problema.

Um dos mais simples é utilizar o `Promise.all()`, função nativa do [[Javascript]].

Se vc tem chamadas `.then()` encadeadas:

```jsx
useEffect(() => {
  loadCancellations(); // Inicia, mas não espera
  
  MotivoCancelamentoService.getAll().then(...)  // Inicia requisição 1
  ProdutoService.getAll({}).then(...)           // Inicia requisição 2
  ProdutoTipoService.getAll({}).then(...)       // Inicia requisição 3
}, []);
```

Quando cada requisição finalizar será ativado uma re-renderização.

Podemos otimizar esse processo utilizando:

```jsx
useEffect(() => {
  const fetchData = async () => {
    try {
      const [cancellations, motivos, produtos, tipos] = await Promise.all([
        loadCancellations(),
        MotivoCancelamentoService.getAll(),
        ProdutoService.getAll({}),
        ProdutoTipoService.getAll({})
      ]);

      setMotivosCancelamento(
        motivos.data.data.filter(row => row.flag_ativo === 1)
      );
      setProdutos(produtos);
      setProdutosTipo(tipos);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  fetchData();
}, []);
```

Nesse caso o `Promise.all()` apena resolve quando todas as requisições foram concluídas. O tempo total de espera é o tempo da requisição mais lenta. Após todas as requisições concluírem apenas uma re-renderização é ativada com todas as alterações.

Além disso, o V8 engine do Javascript é otimizado para aplicar operações agrupadas.