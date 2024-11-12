# Databricks CLI

A plataforma[[Databricks]] provê a [[Databricks API]] para gerenciamento de forma automatizada de seus componentes. Um do modos de utilizar essa API é o [Databricks CLI](https://docs.databricks.com/en/dev-tools/cli/commands.html).
### Criando um workflow em Python

Criando um workflow programaticamente utilizando a própria API do Databricks:

```python
import time

from databricks_cli.sdk.api_client import ApiClient
from databricks_cli.pipelines.api import PipelinesApi

# Set up the entry point with authentication
api_client = ApiClient(
  host  = db_instance,
  token = db_token
)

# Instantiate a PipelinesApi object
pipelines_api = PipelinesApi(api_client)

pipeline = pipelines_api.get(f"{DA.pipeline_id}")
try:
  state = pipeline.get("latest_updates")[0]["state"]
  # Check if running
  not_done = ["WAITING_FOR_RESOURCES", "INITIALIZING", "SETTING_UP_TABLES", "RUNNING"]
  done = ["COMPLETED", "FAILED", "CANCELED"]

  if state in not_done:
      print(f"Pipeline is running (State: {state})")
      print("Excellent work!!")
  elif state in done:
      print(f"Pipeline is done (State: {state})")
      print("Excellent work!!")
  else:
      print("Something must be wrong. Double-check that you started the pipeline")
except:
  print("Something must be wrong. Double-check that you started the pipeline")
```
