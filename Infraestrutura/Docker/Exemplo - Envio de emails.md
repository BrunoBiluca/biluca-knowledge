# Exemplo - Envio de emails

> [!info] Definição
> Esse exemplo tem como objetivo demonstrar a flexibilidade na criação de um sistema complexo enquanto mantemos a segurança da aplicação e melhores práticas de desenvolvimento.
> 
> Para isso utilizo de um sistema complexo com comunicação em múltiplas camadas e várias tecnologias, demonstrando assim a facilidade de trabalhar com diferentes componentes quando se utiliza uma solução de container.

Componentes

- Aplicação (app): WEBAPI com a rota para enviar a mensagem a ser enviada por email
- Frontend (frontend): Servidor de entrada da requisição, exibe a página de envio de mensagens e encaminha para o backend
- Banco de dados (db): Armazena todas as mensagens enviadas, caso seja necessário qualquer reprocessamento
- Processador de mensagens (worker): Daemon de envio de mensagens contidas na fila
- Fila de mensagens (queue): Fila que retem as mensagens para envio

O arquivo `docker-compose.yml` abaixo tem a descrição completa do sistema que será criado.

```yml
version: '3'

volumes:
  dados:

networks: 
  banco:
  web:
  fila:

services: 
  db:
    image: postgres:latest
    volumes:
      # Data volume
      - ./dados:/var/lib/postgresql/data
      # Scripts
      - ./scripts:/scripts
      - ./scripts/init.sql:/docker-entrypoint-initdb.d/init.sql
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_HOST_AUTH_METHOD=trust
    ports:
      - 5432:5432
    networks: 
      - banco

  frontend:
    image: nginx:1.15
    volumes:
      - ./web:/usr/share/nginx/html/
      - ./nginx/default.conf:/etc/nginx/conf.d/default.conf
    ports:
      - 8080:80
    networks: 
      - web
    depends_on: 
      - app

  app:
    image: python:3.6
    environment: 
      - DB_NAME=email_sender
    volumes:
      - ./app:/app
    working_dir: /app
    command: bash ./app.sh
    networks: 
      - banco
      - web
      - fila
    depends_on: 
      - db

  worker:
    build: worker
    volumes:
      - ./worker:/worker
    working_dir: /worker
    networks: 
      - fila
    depends_on:
      - queue
      - app

  queue:
    image: redis:3.2
    networks: 
      - fila
```

Como nosso objetivo é criar uma aplicação de envio de emails com a maior segurança possível é necessário garantir que cada container se comunique apenas com o que é necessário. Para isso criamos 3 redes que vão dar conta da comunicação completa do sistema.

- `banco`: rede para comunicação com o banco de dados
- `web`: rede para comunicação de entrada com a internet
- `fila`: rede para comunicação com a fila de mensagens

Também foi criado um volume (`dados`) para que a máquina host tenha acesso aos dados criados pelo banco de dados. 
### Frontend

O nosso servidor de entrada representado pelo nome `frontend` é o único que apresenta um mapeamento de portas, deixando assim exposto ao acesso pela internet pela porta `8080`.

`index.html`: visual exibido para o usuário quando ele acessa o caminho raiz.

```html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Email Sender</title>
    <style>
        label { display: block; }
        textarea, input { width: 400px; }
    </style>
</head>

<body class="container">
    <h1>E-mail Sender</h1>
    <form action="http://localhost:8080/api" method="POST">
        <div>
            <label for="assunto">Assunto</label>
            <input name="assunto" type="text">
        </div>
        <div>
            <label for="mensagem">Mensagem</label>
            <textarea name="mensagem" cols="50" rows="6"></textarea>
        </div>
        <div>
            <button type="submit">Enviar !</button>
        </div>
    </form>
</body>

</html>
```

`nginx/default.conf`: arquivo de configuração do nginx. Ele aponta a raiz das rotas para o `index.html`e qualquer outro caminho para páginas de erros.

```nginx
server {
    listen 80;
    server_name localhost;

    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
    }

    error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        root /usr/share/nginx/html;
    }

    location /api {
        proxy_pass http://app:8080/;
        proxy_http_version 1.1;
    }
}
```

### Aplicação (app)

Apenas o container que está a WEBAPI (`app`) apresenta comunicação em todas as redes, isso porque ele é o coração da aplicação. A aplicação é responsável por receber a mensagem que será enviada por email, gravar ela no banco de dados e enviar para a fila de processamento. Mesmo assim esse container está escondido da internet e não pode ser acessado diretamente por nenhum outro serviço que não o `frontend`, dessa forma garantimos a segurança dessa aplicação.

```python
import psycopg2
import redis
import json
import os

from bottle import Bottle, request

class Sender(Bottle):
    def __init__(self):
        super().__init__()
        db_host = os.getenv('DB_HOST', 'db')
        db_user = os.getenv('DB_USER', 'postgres')
        db_name = os.getenv('DB_NAME', 'sender')
        dsn = f'dbname={db_name} user={db_user} host={db_host}'
        self.conn = psycopg2.connect(dsn)

        redis_host = os.getenv('REDIS_HOST', 'queue')
        self.fila = redis.StrictRedis(host=redis_host, port=6379, db=0)

        self.route('/', method='POST', callback=self.send)

    def register_message(self, assunto, mensagem):
        SQL = 'INSERT INTO emails (assunto, mensagem) VALUES (%s, %s)'
        cur = self.conn.cursor()
        cur.execute(SQL, (assunto, mensagem))
        self.conn.commit()
        cur.close()
        msg = {'assunto': assunto, 'mensagem': mensagem}
        self.fila.rpush('sender', json.dumps(msg))
        print('Mensagem registrada !')

    def send(self):
        assunto = request.forms.get('assunto')
        mensagem = request.forms.get('mensagem')
        self.register_message(assunto, mensagem)
        return 'Mensagem enfileirada ! Assunto: {} Mensagem: {}'.format(
            assunto, mensagem)

if __name__ == '__main__':
    sender = Sender()
    sender.run(host='0.0.0.0', port=8080, debug=True)
```

Para a execução do container da aplicação foi criado um script para garantir que tudo que seja necessário pela aplicação seja instalada no momento que o container começar a ser executado.

```sh
#!/bin/sh

pip install bottle==0.12.13 psycopg2 redis==2.10.5
python -u sender.py
```

### Banco de dados (db)

```sql
create database email_sender;

\c email_sender

create table emails(
    id serial not null,
    data timestamp not null default CURRENT_TIMESTAMP,
    assunto varchar(100) not null,
    mensagem varchar(250) not null
);
```

### Processador de mensagens (worker)

Para o container de processamento de mensagens foi utilizada um outro formato de criação do container, nesse caso foi utilizado um arquivo de Dockerfile para garantir a configuração do container.

```dockerfile
FROM python:3.6

# esta variável de ambiente é específica do python, para não fazer buffer das mensagens do console, isso dificultaria a visualização pelo log
ENV PYTHONUNBUFFERED 1
RUN pip install redis==2.10.5

ENTRYPOINT ["/usr/local/bin/python", "-u", "worker.py"]
```

`worker.py`

```python
import redis
import json
from time import sleep
from random import randint
if __name__ == '__main__':
    r = redis.Redis(host='queue', port=6379, db=0)
    print("Aguardando mensagens...")
    while True:
        mensagem = json.loads(r.blpop('sender')[1])
        print('Mandando a mensagem:', mensagem['assunto'])
        sleep(randint(15, 45))
        print('Mensagem', mensagem['assunto'], 'enviada')
```

