---
categoria: prática
---
# Empacotamento de arquivo do PySpark

Nesse artigo demonstramos uma forma de organizar o código de um projeto em PySpark para submissão de jobs em um cluster. Com esse formato é possível **organizar o projeto em uma arquitetura limpa**.

Digamos que temos o seguinte projeto:

```
- src
   |- jobs
   |   L job_1.py
   |- common
   |   L common.py
   L main.py
```

Comando de submissão para a execução do projeto, partindo como o script `main.py` como entrada.

```
spark-submit --py-files src.zip main.py
```

Os scripts deve ter a referência a partir da pasta raiz

```python
# jobs_1.py
import src.common.common
common_function()

# main.py
from src.jobs import jobs_1
jobs_1.start()
```

Dessa forma os caminhos estarão corretos no projeto.