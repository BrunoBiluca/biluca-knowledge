# Docker SDK Python

O [[Docker]] disponibiliza um SDK em [[Python]] que permite executar múltiplas funcionalidades.

### Execução de código python isolado

É possível criar um container para executar código python de forma isolada utilizando o script abaixo.

```py
import docker
import time

# client a partir da porta do Docker engine exposta
client = docker.DockerClient(base_url='tcp://localhost:2375')

# client a partir do próprio ambiente
# client = docker.from_env()

def handle_docker(image_name, command, remove=True, **kwargs):
    container = None
    try:
        container = client.containers.create(image=image_name, command=command, **kwargs)
        container.start()

        while container.status == 'running':
            time.sleep(1)
            container.reload()

		return container.logs().decode('utf-8')
    finally:
        if container and remove:
            container.remove(v=True, force=True)


def execute_in_docker(code, timeout=60):
	start_time = time.time()

	logs = handle_docker(
		image_name="python:3.11-slim",
		command=["python", "-c", code],
		remove=True,
		detach=False,
		environment={"PYTHONUNBUFFERED": "1"},
	)

	return { "output": logs, "tempo_execucao": time.time() - start_time}


if __name__ == "__main__":
    CODE_TO_EXECUTE = "def hello_world():print('Hello, World!')\nhello_world()"

    print("==> Executando código no container Docker...")
    result = execute_in_docker(code=CODE_TO_EXECUTE)
    print()

    print("==> Tempo de execução:")
    print(result['tempo_execucao'])

    print("Output da execução:")
    print(result['output'])
    print("\nContainer foi removido após a execução.")
```

Nesse script é feito o seguinte:

- Cria um container Docker a partir de uma imagem já baixada
- Executa o código
- Recupera os logs da execução
- Remove o container criado