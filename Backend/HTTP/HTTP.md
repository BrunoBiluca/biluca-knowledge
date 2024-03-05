---
tags:
  - backend
---
# HTTP
# Verbos

Verbos do HTTP são elementos das requisições feitas em HTTP que demonstram a intenção na requisição efetuada.

- GET
  - Método responsável pela consulta
- POST
  - Método responsável por criar informações
- PUT
  - Método responsável por atualizar informações
  - Esse método é idempotente, ou seja, todas as informações a partir daquele momento serão definidas pela mensagem do PUT
  - Pode criar se não existe
- Patch
  - Pode ou não ser idempotente
  - Método responsável por atualizar informações de forma parcial
- DELETE
  - Método responsável por remover informações

# Status Code

| Código | Descrição                                                                                                                        | Método                |
| ------ | -------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 1XX    |                                                                                                                                  |                       |
|        |                                                                                                                                  |                       |
|        |                                                                                                                                  |                       |
| 2XX    | Resultado OK - Sucesso                                                                                                           |                       |
| 200    | Requisição bem sucedida                                                                                                          | POST, GET, PUT, PATCH |
| 201    | Novo recurso criado                                                                                                              | POST                  |
| 202    | Aceito para processamento                                                                                                        | POST                  |
| 204    | Requisição bem sucedida, sem retorno de body                                                                                     | PUT, PATCH, DELETE    |
|        |                                                                                                                                  |                       |
| 3XX    |                                                                                                                                  |                       |
|        |                                                                                                                                  |                       |
|        |                                                                                                                                  |                       |
| 4XX    | Erro no cliente                                                                                                                  |                       |
| 400    | Erro de sintaxe pelo cliente                                                                                                     |                       |
| 401    | Sem autorização. Não foi enviado a autorização.                                                                                  |                       |
| 403    | Acesso proibido. O servidor entendeu a requisição mas não permite acesso.                                                        |                       |
| 404    | Não encontrado. O servidor não encontrou nada do que foi enviado.                                                                |                       |
| 422    | O servidor entendeu a requisição, porém não pode completar a requisição. Geralmente utilizado por falhas semânticas na mensagem. |                       |
|        |                                                                                                                                  |                       |
| 5XX    | Erro no servidor (backend)                                                                                                       |                       |
| 500    | Erro interno do servidor.                                                                                                        |                       |
| 502    | O servidor enquanto atua como Gateway ou Proxy, recebeu uma mensagem inválida do servidor terceiro.                              |                       |
| 503    | O servidor não pode efetuar a requisição por sobrecarga ou manutenção temporária.                                                |                       |
| 504    | O servidor não recebeu a mensagem (servidor terceiro) no tempo esperado.                                                         |                       |
