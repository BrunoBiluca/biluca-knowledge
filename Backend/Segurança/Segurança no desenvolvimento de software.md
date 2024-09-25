
Vulnerabilidades

- Uso de bibliotecas desatualizadas
- Uso de código desconhecido
- Considerar apenas cenários positivos

Definições

- Superfície de ataque: o sistema que pode ser atacado
	- Vetores de ataques: maneira dos invasores entrarem em uma rede ou sistema
	- Risco
	- Ataque
	- Incidente de segurança
- Agente da ameaça
- Ameaça
- Vulnerabilidade

# Princípios de segurança

Os primeiros são definido como CIA (Confidentiality, Integrity, Availability)

- Confidencialidade: deve garantir a restrição de acesso a informações por pessoas não autorizadas.
- Integridade: deve garantir que a informação seja completa e exata, além de prevenir que usuários sem autorizações façam modificações nelas
- Disponibilidade: deve garantir que a informação esteja acessível e utilizável sempre que necessário

Outros dois princípios são muito importantes

- Autenticidade: deve validar a autorização do usuário para acessar, transmitir e receber determinadas informações.
- Irretratabilidade (também chamada de legalidade): deve garantir que a pessoa ou entidade não possa negar a autoria da informação fornecida, como no caso de uso de certificados digitais para transações online e assinatura de documentos eletrônicos.

Temos 3 principais processos para a implementação desses princípios

- Autenticação
- Autorização
- Auditoria

> [!tip] Princípio do menor privilégio
> - Um usuário deve ter acesso apenas ao que é absolutamente necessário para desempenhar suas responsabilidades e nada mais
### Fatores de autenticação

- Algo que você sabe
	- Senhas
- Algo que você tem
	- Token
- Algo que você é
	- Biometria

Utilizando esses 3 fatores temos uma boa confiabilidade da autenticação da pessoa ou entidade a informação que está sendo disponibilizada.



# Testes de segurança

### SAST

Static application security testing.

Ferramenta utilizada para análise de vulnerabilidade em nível de código. Pode ser executado durante o pipeline de deploy.

Exemplos de ferramentas

- Rorusec
- SonarQube

Exemplo de vulnerabilidade em uma API REST que pode ser avaliada por esse tipo de ferramenta:

```python
# Nesse caso o sistema executa uma operação baseada na url enviada pelo usuário
# A vulnerabilidade ocorre justamente por deixar o usuário ter controle sobre a operação
@app.route("/ping")
def hello(name):
	exec(f"{req.body.url}")
    return "pong"

# Versão corrigida
# limpamos a url de qualquer código mal intencionado que pode ter sido colocado na url
@app.route("/ping")
def hello(name):
	url = sanatize(req.body.url) 
	exec(f"{url}")
    return "pong"
```

### DAST

Dynamic application security testing.

Ferramenta utilizada para análise de vulnerabilidade em nível de aplicação. O DAST irá explorar as vulnerabilidades enquanto o sistema está operante.

Exemplo de ferramentas

- SonarQube
- [OWASP-ZAP](https://www.zaproxy.org/getting-started/)

### SCA

Exemplo de ferramentas

- JFrog XRAY



