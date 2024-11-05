---
tags:
  - arquitetura_software
  - engenharia_de_dados
---
Considere o uso de [Apache Airflow](https://airflow.apache.org/) se sua organização tiver pipelines de dados complexos com muitas dependências de fluxo de trabalho. É uma ótima ferramenta para agendar e orquestrar trabalhos de dados em lote executados em várias tecnologias em pipelines de dados de ponta a ponta. O Airflow fornece operadores prontos para uso para interagir com ferramentas populares de ETL e permite que os desenvolvedores escrevam código personalizado para acionar qualquer ferramenta com a qual o Python interaja.

# Tratando falhas

- [Issue aberta sobre problemas na hora de utilizar o on_failure_callback](https://github.com/apache/airflow/issues/26760)

# Amazon Managed Workflows for Apache Airflow

É uma versão já hospedada do Airflow na AWS.

# Integrações

## Submissão de jobs com PySpark

Existe uma grande variedade de opções para submeter jobs no Apache Spark pelo Apache Airflow, a principal diferença entre elas é a forma que o cluster está configurado e o tipo de serviço.


### EMR Serverless

```python
emr_serverless_app_id = "arn:"

job = EmrServerlessStartJobOperator(
	task_id="start_job",
	name="job",
	application_id=emr_serverless_app_id,
	execution_role_arn="<airflow role arn>",
	job_driver={
		"sparkSubmit": {
			"entryPoint": "s3://bucket/main.py",
			'entryPointArguments': [
				"{{execution_date}}",
			],
			"sparkSubmitParameters": "--conf spark.submit.pyFiles=s3://bucket/jobs/jobs.zip",
		}
	},
	configuration_overrides={},
	wait_for_completion=False,
	dag=dag
)
	
wait_for_job = EmrServerlessJobSensor(
	task_id="wait_forjob",
	application_id=emr_serverless_app_id,
	job_run_id=job.output,
	target_states={"SUCCESS", "FAILED"}	
)
```

[Amazon EMR Serverless Operators — apache-airflow-providers-amazon Documentation](https://airflow.apache.org/docs/apache-airflow-providers-amazon/8.7.1/operators/emr/emr_serverless.html)
[airflow/tests/system/providers/amazon/aws/example_emr.py at providers-amazon/8.16.0 · apache/airflow · GitHub](https://github.com/apache/airflow/blob/providers-amazon/8.16.0/tests/system/providers/amazon/aws/example_emr.py)

A melhor documentação para as configurações desses operadores estão na documentação da AWS ([[Apache Spark]]).

