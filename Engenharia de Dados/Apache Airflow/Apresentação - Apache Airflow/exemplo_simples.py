from airflow import DAG
from airflow.operators.bash_operator import BashOperator
from datetime import datetime, timedelta

default_args = {
    'owner': 'Airflow',
    'depends_on_past': False,
    'start_date': datetime(2020, 1, 22),
    'email': ['airflow@example.com'],
    'retries': 1,
    'retry_delay': timedelta(minutes=5)
}

dag = DAG('tutorial', default_args=default_args, schedule_interval=timedelta(days=1))

task_1 = BashOperator(
    task_id='print_date',
    bash_command='date',
    dag=dag
)

task_2 = BashOperator(
    task_id='sleep',
    bash_command='sleep 5',
    retries=3,
    dag=dag
)

task_1 >> task_2