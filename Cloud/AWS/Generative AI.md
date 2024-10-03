Para conceitos gerais de [[IA generativa]].

![[AWS componentes para desenvolvimento de generative AI.png|Principais componentes da AWS relacionados a aplicações que utilizam generative AI|500]]

# Generative AI

- **Amazon SageMaker JumpStart**: serviço com soluções prontas para aplicação de IA generativa
- [[Amazon Bedrock]]: disponibiliza modelos base (FM) da Amazon de das principais startups de IA por meio de uma API.
- **Amazon Q**: serviços de perguntas e respostas gerais
- **Amazon Q Developer**: serviço de recomendação de código
# Serviços AI/ML

São serviços que oferecem soluções prontas para uso.

- **Amazon Comprehend**: analisa e descobre informações e as relações em textos não estruturados
- **Amazon Translate**: tradução
- **Amazon Textract**: extração de texto a partir de documentos digitalizados
- **Amazon Lex**: serviço para criação de interfaces de conversação por texto ou voz.
- **Amazon Polly**: transforma texto em voz.
- **Amazon Transcribe**: transforma fala em texto.
	- Pode ser configurado para melhorar a acurácia em relação a termos específicos de cada domínio, como nomes, marcas, acrônimos, palavras técnicas e jargões.
- **Amazon Rekognition**: análise de imagens e vídeos.
	- Para treinar o modelo é necessário um conjunto de imagens rotuladas.
- **Amazon Kendra**: serviço de pesquisa.
- **Amazon Personalize**: serviço de criação de recomendações para usuários.
- **Amazon DeepRacer**: serviço de treinamento para novos desenvolvedores de ML

# Frameworks ML

- [[Amazon SageMaker]]


# Casos de uso

Varejo

- Resumo de avaliações de produtos
- Otimizações da definição de preços: aumento de lucro
- Otimização do layout da loja

Saúde

- AWS HealthScribe: observações clínicas automáticas a partir de conversas
- Personalizar o medicamento: planos de tratamento a partir da composição genética do paciente
- Melhorar os exames a partir de reconstrução ou geração de imagens médicas como radiografias, ressonâncias entre outras

# Defesa detalhada na AWS

O desenvolvimento de aplicações de IA generativa também adicionam vários desafios no âmbito da [[Segurança]] e [[Governança de dados]], uma estratégia muito utilizada é a [[Segurança#Defesa detalhada|Defesa detalhada]].

1. **Proteção de dados**
	- Dados estacionários: criptografia a partir do AWS KMS
	- Dados em trânsito: ACM e AWS Private CA para proteção

2. **Gerenciamento de identidade e acesso**
	- AWS IAM para controle de acesso

3. **Proteção de aplicações**
	- AWS Shield: ataques DoS
	- Amazon Cognito: defesa contra acesso não autorizado

4. **Proteção de rede e borda**
	- Amazon VPC
	- AWS WAF

5. **Proteção de infraestrutura**
	- AWS IAM
	- Grupos de usuário e Listas de Controle de Acesso (ACL)

6. **Detecção de ameaças e resposta a incidentes**
	- Detecção de ameaças:
		- AWS Security Hub
		- Amazon GuardDuty: detecção de comportamentos mal intencionados e não autorizados
	- Respostas a incidentes
		- AWS Lambda
		- Amazon EventBridge

7. **Políticas, procedimentos e conscientização**
	- Políticas de menor privilégio com AWS IAM (IAM Access Analyzer)
	- Amazon SageMaker Role Manager para criar e gerenciar perfis para tarefas comuns de ML.
	- Varredura de perfis e recursos com permissões excessivas

## Governança e conformidade

Além dos serviços utilizados para garantir a defesa detalhada da aplicação também é necessário definir as normas para os fluxos de trabalhos durante o desenvolvimento. Para isso a AWS disponibiliza também uma série de serviços:

- **AWS Config:** exibição detalhada dos recursos da conta da AWS
- **Amazon Inspector:** verifica continuamente os workloads da AWS para encontrar possíveis vulnerabilidades
	- Vulnerabilidade de pacote
	- Vulnerabilidade de código
	- Acessibilidade de rede
- **AWS Audit Manager:** automatiza a coleta de evidências para você avaliar se suas políticas, procedimentos e atividades (também chamados de controles) estão funcionando corretamente
- **AWS Artifact:** disponibiliza para download os documentos de segurança e conformidade da AWS, como certificações ISO e relatórios de PCI e de SOC.
- **AWS CloudTrail:** as ações de usuários, perfis ou serviços são registradas como eventos no CloudTrail a fim de ajudar na realização de auditorias
- **AWS Trusted Advisor:** ajuda a otimizar custos, aumentar o desempenho, melhorar a segurança e a resiliência e operar em grande escala na nuvem