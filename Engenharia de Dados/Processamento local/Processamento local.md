# Processamento local

Uma necessidade muito comum a projeto de [[Enganharia de Dados]] é criar uma esteira de processamento local para análise exploratória. Outra vantagem da utilização do processamento local é a barreira de entrada do projeto, já que a configuração inicial é muito mais simples em relação a uma esteira mais completa, como utilizando [[Apache Spark]] e [[Apache Airflow]].

Mesmo assim, precisamos que esse esteira de processamento local consiga resolver algumas funcionalidades básicas para esse tipo de projeto. São elas:

- Ordem dos scripts
- Passagem de parâmetros
- Relatórios de sucesso ou falha.

### Pipeline runner

Esse script foi utilizado no [[Projeto Crivo]] para a execução do processamento local utilizando notebooks Jupyter.

Sua utilização permitiu acelerar o processo de exploração de dados enquanto também já criava o próprio repositório de dados.

**Funcionalidades**

- Configuração dos scripts
- Parametrização específica dos jobs de processamento
- Parametrização global
- Arquitetura em camadas simplificada
	- Interpolação de parâmetros a partir das camadas definidas
	- Facilita em muito a configuração
- Registros (Logs)
	- Registro detalhado de falhas
	- Registros de informações durante o processamento

**Dependências**

- [papermill](https://papermill.readthedocs.io/en/latest/)
	- Parametrização e execução de Notebooks Jupyter
- [yaml](https://pypi.org/project/PyYAML/)
	- Serialização de arquivos yaml
	- Utilizado na configuração da esteira de processamento


```py
import papermill as pm
import os
import sys
import yaml
import logging
from datetime import datetime
from pathlib import Path
import traceback
import json


class PipelineRunner:
    def __init__(self, config_path="config.yaml"):
        self.config = self._load_config(config_path)
        self.setup_logging()
        self.execution_results = []

    def _load_config(self, config_path):
        with open(config_path, "r", encoding="utf-8") as f:
            return yaml.safe_load(f)

    def setup_logging(self):
        log_dir = Path(self.config.get("log_dir", "logs"))
        log_dir.mkdir(exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        log_file = log_dir / f"pipeline_{timestamp}.log"

        logging.basicConfig(
            level=getattr(logging, self.config.get("log_level", "INFO")),
            format="%(asctime)s - %(levelname)s - %(message)s",
            handlers=[
                logging.FileHandler(log_file, encoding="utf-8"),
                logging.StreamHandler(sys.stdout),
            ],
        )
        self.logger = logging.getLogger(__name__)

    def execute_notebook(self, notebook_path, parameters=None, stage_name=None):
        try:
            notebook_path = Path(notebook_path)
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")

            self.logger.info(f"Executando {stage_name or notebook_path.name}...")
            self.logger.info(f"  Notebook de entrada: {notebook_path}")

            # Executa o notebook
            pm.execute_notebook(
                input_path=str(notebook_path),
                output_path=None,
                parameters=parameters or {},
                kernel_name=self.config.get("kernel_name", "python3"),
                progress_bar=True,
                log_output=True,
            )

            self.logger.info(
                f"✓ {stage_name or notebook_path.name} executado com sucesso!"
            )

            return {
                "stage": stage_name or notebook_path.name,
                "status": "SUCCESS",
                "timestamp": timestamp,
            }

        except Exception as e:
            error_msg = f"❌ FALHA em {stage_name or notebook_path.name}: {str(e)}"
            self.logger.error(error_msg)
            self.logger.error(traceback.format_exc())

            # Retorna erro e encerra o pipeline
            return {
                "stage": stage_name or notebook_path.name,
                "status": "FAILURE",
                "error": str(e),
                "traceback": traceback.format_exc(),
            }

    def run_pipeline(self):
        self.logger.info("=" * 60)
        self.logger.info("INICIANDO PIPELINE DE PROCESSAMENTO DE DADOS")
        self.logger.info("=" * 60)

        start_time = datetime.now()
        layers = self.config["layers"]

        for stage_config in self.config["pipeline_stages"]:
            stage_name = stage_config["name"]
            layer = layers[stage_config["layer"]]
            notebook_path = stage_config["notebook"]

            parameters = stage_config.get("parameters", {"debug": False})
            parameters.update(self.config.get("global_parameters", {}))

            for l in layers:
                for k in parameters:
                    parameters[k] = parameters[k].replace(
                        "${" + l + "}", layers[l]["data"]
                    )

            result = self.execute_notebook(
                notebook_path=layer["code"] + "/" + notebook_path,
                parameters=parameters,
                stage_name=stage_name,
            )

            self.execution_results.append({**result, "parameters": parameters})

            if result["status"] == "FAILURE":
                self.logger.error("=" * 60)
                self.logger.error("PIPELINE INTERROMPIDO DEVIDO A FALHA!")
                self.logger.error("=" * 60)
                self._save_execution_report()
                sys.exit(1)

        end_time = datetime.now()
        duration = end_time - start_time

        self.logger.info("=" * 60)
        self.logger.info("PIPELINE CONCLUÍDO COM SUCESSO!")
        self.logger.info(f"Tempo total: {duration}")
        self.logger.info("=" * 60)

        self._save_execution_report()
        return True

    def _save_execution_report(self):
        """Salva relatório da execução"""
        report_dir = Path(self.config.get("output_dir", "output"))
        report_dir.mkdir(exist_ok=True)

        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        report_file = report_dir / f"execution_report_{timestamp}.json"

        report = {
            "timestamp": timestamp,
            "results": self.execution_results,
            "all_successful": all(
                r["status"] == "SUCCESS" for r in self.execution_results
            ),
        }

        with open(report_file, "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2, ensure_ascii=False)

        self.logger.info(f"Relatório salvo em: {report_file}")


def main():
    """Função principal"""
    try:
        runner = PipelineRunner("config.yaml")
        runner.run_pipeline()
    except Exception as e:
        logging.error(f"Erro fatal no pipeline: {str(e)}")
        logging.error(traceback.format_exc())
        sys.exit(1)


if __name__ == "__main__":
    main()

```

A classe `PipelineRunner` define os seguintes métodos:

- `_load_config()`
- ``setup_logging()`
- `execute_notebook()`
- `run_pipeline()`
- `_save_execution_report()`

#### Exemplo de configuração

A configuração a seguir define a seguinte estrutura do projeto

- logs
- runner_out
- processing/1_bronze
- processing/2_silver
- processing/3_gold
- config.yaml


```yaml
# Diretórios
log_dir: "logs"
output_dir: "runner_out"

# Configurações de execução
kernel_name: "python3"
log_level: "INFO"

layers:
  inputs:
    code: ""
    data: "inputs"

  bronze:
    code: "processing/1_bronze"
    data: "data/bronze"

  silver:
    code: "processing/2_silver"
    data: "data/silver"

  gold:
    code: "processing/3_gold"
    data: "data/gold"

global_parameters:
  deploy_to_supabase: True

# Estágios do pipeline (executados em ordem)
pipeline_stages:

- name: "Identificação de pessoas"
  layer: "bronze"
  notebook: "pessoa_identidade.ipynb"
  parameters:
    candidatos_path: "${inputs}/candidatos"
    output: "${bronze}/pessoa_identidade.csv"
```

**Execução**

```
python pipeline_runner.py
```