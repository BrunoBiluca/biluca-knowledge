# OWASP 2021

> [!info] O que é?
> É um documento de conhecimento para os desenvolvedores das vulnerabilidades mais exploradas de sistemas.
> 
> [Relatório](https://owasp.org/www-project-top-ten/)

### A01:2021-Broken Access Control

O controle de acesso mal implementados que permitem que os usuários não possam agir fora das permissões pretendidas.

Vulnerabilidades
- Elevação de privilégio
- Acessos indevidos (IDOR)
- Contornando verificações de controle de acesso
- Permitindo visualizar ou editar a conta de outra pessoa

Exemplo dessa vulnerabilidade

```python
class ContaBancaria:
	def transferir(self, valor, conta):
	   self.saldo -= valor
	   conta.saldo += valor

conta1 = ContaBancaria(1000, "Bruno")
conta2 = ContaBancaria(500, "Alfredo")

conta1.transferir(100, conta2)
```

Essa implementação de Conta bancária não apresenta nenhum tipo de verificação que a pessoa que está fazendo a transação seja realmente o *Bruno*, ou seja, qualquer pessoa pode fazer essa transação.

Para corrigir essa vulnerabilidade a operação de transação só pode ser feita se garantirmos que o *Bruno* está realmente fazendo a operação.

```python
class ContaBancaria:
	def transferir(self, valor, conta, token):
		if proprietario == token.proprietario:
		   self.saldo -= valor
		   conta.saldo += valor
		   print("Operação realizada com sucesso")
		else:
			print("Erro")

conta1 = ContaBancaria(1000, "Bruno")
conta2 = ContaBancaria(500, "Alfredo")

token = Token("Bruno") # criamos um token para garantir a autenticidade da operação
conta1.transferir(100, conta2, token)
# Operação realizada com sucesso

conta1.transferir(100, conta2, Token("Fulano"))
# Erro
```

Esse token deve ser emitido pelo sistema de controle de acesso, assim garantindo que uma operação crítica como a transferência de grana seja feita apenas pelo proprietário da conta.

# A02:2021-Cryptographic Failures

Vulnerabilidades

- Algoritmos de criptografia Fracos
- Gerenciamento de chaves inseguro
- Protocolos de comunicação inseguros
- Vazamento de informações sensíveis
- Não atualização de bibliotecas criptográficas
- Algoritmos de Hash

### A03:2021-Injection

Ocorre quando dados fornecidos pelos usuários não são validados, filtrados ou higienizados pelo aplicativo podendo levar a execução direta de comandos

Vulnerabilidades

- Não validação de dados externos
- Uso de consultas dinâmicas ou chamadas não parametrizadas
- Concatenação de dados em queries SQL
- Extração de registros confidenciais

Exemplo dessa vulnerabilidade

```python
query = f"SELECT nome FROM usuarios WHERE id = {id_usuario}"
execute(query)
```

Nesse exemplo utilizamos diretamente o id fornecido pelo usuário, caso esse id tenha concatenado qualquer tipo de código malicioso ele será executado pelo banco de dados.


```python
query = f"SELECT nome FROM usuarios WHERE id = ?"
execute(query, (id_usuario,))
```

Para corrigir essa vulnerabilidade podemos utilizar parâmetros de consultas, a própria engine do banco de dados se encarrega de fazer a higienização dos dados e garantir que nenhum código malicioso esteja sendo executado.

### A04:2021-Insecure Design

Representa fraquezas expressas como "design de controle ausente ou ineficaz".

Vulnerabilidades

- Design inseguro (Arquitetura)
- Controles ausentes ou ineficazes
- Exposição de dados confidenciais
- Extração de registros confidenciais adicionais
- Ausência de análises de risco

Mitigação

- Modelagem de ameaças
- Padrões de design seguros
- Arquiteturas de referência
- Ciclo de vida de desenvolvimento seguro

### A05:2021-Security Misconfiguration

Vulnerabilidades

- Contas padrão e suas senhas ainda estão ativadas e inalteradas
- Tratamento de erros inadequado
- Recursos desnecessários ativados ou instalados.
- Software desatualizado ou vulnerável
- O servidor não envia cabeçalhos ou diretivas de segurança
- Banco de dados abertos à internet (públicos).

Mitigações

- Configurações de sub redes, onde apenas um servidor de proxy tenha acesso externo e todos os demais serviços e bancos de dados não seja alcançados publicamente
- Tratamento de erros eficaz voltado ao usuário, sem stack trace e esses tipos de informações que devem ser tratadas internamente.
- Não permitir acessar diretórios

### A06:2021-Vulnerable and Outdated componentes

- Desconhecimento das versões de componentes usados
- Falta de verificação regular de vulnerabilidades (Análise de dependências)
- Falta de correção ou atualização da plataforma subjacente, frameworks e dependências
- Falta de testes de compatibilidade de bibliotecas atualizadas pelos desenvolvedores
- Configurações de compontes não protegidas

Mitigações

- Uso de SCAs para escaneamento dos componentes utilizados e análise de vulnerabilidades

Exemplo dessa vulnerabilidade

```python
import requests
response = requests.get(url)
```

Nesse caso utilizamos a biblioteca requests que é conhecida por ter várias vulnerabilidades. É necessário saber exatamente qual a versão utilizada para garantir que essa é a versão mais estável da dependência.

```python
# base_request.py
import requests
response = requests.get(url)

# requirements.txt
requests=2.31.0
```