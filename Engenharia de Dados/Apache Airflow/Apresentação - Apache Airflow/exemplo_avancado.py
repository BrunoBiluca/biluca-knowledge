import os
import sys


sys.path.insert(0, os.path.abspath(os.path.dirname(__file__)))

from airflow import DAG
from airflow.models import Variable
from airflow.operators.bash_operator import BashOperator
from airflow.hooks.mysql_hook import MySqlHook

from jobs.consolidate_events_dag_jobs.app_user_last_event_elastic_job import AppUserLastEventElasticJob
from jobs.consolidate_events_dag_jobs.app_user_last_event_job import AppUserLastEventJob
from jobs.consolidate_events_dag_jobs.consolidate_location_job import ConsolidateLocationJob
from jobs.consolidate_events_dag_jobs.consolidate_push_token_job import ConsolidatePushTokenJob
from jobs.consolidate_events_dag_jobs.consolidate_events_job import ConsolidateEventsJob
from jobs.ssh_key_config import copy_ssh_key_task, SSHKeyConfig
from helpers_2.dag_utils import select_customers_and_host_apps, default_args, default_python_operator
from execute_remove_past_data import remove_past_data

general_config = Variable.get("ct_general_config_2", deserialize_json=True)

dag = DAG(
    "ct_consolidate_events_dag",
    schedule_interval=general_config["schedule_interval"],
    default_args=default_args(general_config["emails_on_failure"]),
    concurrency=general_config["concurrency"] if "concurrency" in general_config else 1,
    max_active_runs=1
)

ssh_config = SSHKeyConfig(
    general_config["ssh_bucket"],
    general_config["ssh_path"],
    general_config["ssh_key"]
)

start = BashOperator(task_id='start', bash_command='date', dag=dag)
finish = BashOperator(task_id='finish', bash_command='date', dag=dag, trigger_rule='all_done')


def create_flow(customer_host_app_connection, customer_host_app=None):
    dag_bag_path = "/usr/local/airflow/dag_bag/ct_ddp_2_dag_bag/"

    remove_past_data(dag_bag_path, general_config["elastic_search_url"], start, dag)

    get_ssh_key = copy_ssh_key_task(ssh_config, "%s" % dag_bag_path, dag)
    start >> get_ssh_key

    elastic_window_size = 90
    configuration_deploy = general_config["configuration_deploy"]
    if customer_host_app == "bradesco":
        elastic_window_size = 40
        configuration_deploy = general_config["configuration_deploy_bradesco"]

    run_on_cluster_default = True
    for host_app_id, customer_id, app_name, customer, host_app_slug in select_customers_and_host_apps(
            customer_host_app_connection):

        job_config = {
            "code_deploy": general_config["code_deploy"],
            "ssh_key_path": dag_bag_path + ssh_config.key,
            "configuration_deploy": configuration_deploy,
            "cluster": general_config["cluster"]
        }

        if run_on_cluster_default:
            job_config["cluster"] = general_config["cluster"]
            run_on_cluster_default = not run_on_cluster_default
        else:
            job_config["cluster"] = general_config["cluster_2"]
            run_on_cluster_default = not run_on_cluster_default

        customer_key = f"customer_{customer_id}_host_app_{host_app_id}"
        task_config = general_config["task_config"]
        if customer_key in task_config:
            customer_enabled = task_config[customer_key].get("enabled", True)

            if not customer_enabled:
                continue

        host_app_flow = BashOperator(
            task_id=f'{customer}_host_app_id_{host_app_id}',
            bash_command='date',
            dag=dag
        )

        job = ConsolidateEventsJob(host_app_slug, **job_config)
        consolidate_events = default_python_operator(job, dag)

        job = ConsolidateLocationJob(host_app_slug, **job_config)
        consolidate_location = default_python_operator(job, dag)

        job = ConsolidatePushTokenJob(host_app_slug, **job_config)
        consolidate_push_token = default_python_operator(job, dag)

        job = AppUserLastEventJob(host_app_slug, **job_config)
        app_user_last_event = default_python_operator(job, dag)

        job = AppUserLastEventElasticJob(customer_id, host_app_id, elastic_window_size,
                                         host_app_slug=host_app_slug, **job_config)
        app_user_last_event_elastic = default_python_operator(job, dag)

        # FLOW
        get_ssh_key >> host_app_flow
        host_app_flow >> consolidate_events
        host_app_flow >> consolidate_push_token

        consolidate_events >> app_user_last_event >> app_user_last_event_elastic >> finish
        consolidate_events >> consolidate_location >> finish
        consolidate_push_token >> finish


mysql_hook = MySqlHook('retail_prod')
create_flow(mysql_hook)

mysql_hook = MySqlHook('bradesco_prod')
create_flow(mysql_hook, "bradesco")
