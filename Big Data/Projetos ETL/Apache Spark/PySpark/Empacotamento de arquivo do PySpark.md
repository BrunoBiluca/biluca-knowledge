# Empacotamento de arquivo do PySpark

### Utilização do múltiplos arquivos

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