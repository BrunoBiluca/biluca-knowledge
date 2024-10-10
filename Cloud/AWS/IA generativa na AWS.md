Para conceitos gerais de [[IA generativa]].

![[AWS componentes para desenvolvimento de generative AI.png|Principais componentes da AWS relacionados a aplicações que utilizam generative AI|500]]

# Generative AI

- **Amazon SageMaker JumpStart**: serviço com soluções prontas para aplicação de IA generativa
- [[Amazon Bedrock]]: disponibiliza modelos base (FM) da Amazon de das principais startups de IA por meio de uma API.
- **Amazon Q**: serviços de perguntas e respostas gerais
- **Amazon Q Developer**: serviço de recomendação de código
- **Amazon Q Business:** serviço de perguntas e respostas utilizando os dados do próprio cliente. É possível configurar uma solução RAG para consultar documentos e arquivos no S3 e gerar respostas.
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
- **Amazon Macie:** utiliza ML para descobrir, monitorar e proteger dados sensíveis armazenados no [[Amazon S3]]
- **Amazon A2I:** provê um fluxo de trabalho para audição humana a respostas selecionadas. A partir das avaliações humanas pode-se ajudar na avaliação de toxicidade e tom das respostas enviadas pelo modelo.

# Frameworks ML

- [[Amazon SageMaker]] é um serviço e um framework de desenvolvimento de IA para múltiplas aplicações
- **Generative AI Security Scoping Matrix:** 

### Generative AI Security Scoping Matrix

É um framework que pode ser utilizado para classificar casos de uso de IA Generativa. Podemos utilizar esse framework para identificar a partir do nosso caso de uso quais são os pontos que devem ser considerados para garantir a segurança. [Artigo de descrição do framewok](https://aws.amazon.com/pt/blogs/security/securing-generative-ai-an-introduction-to-the-generative-ai-security-scoping-matrix/).

O framework trabalha com 5 tipos de escopo das aplicações, dependendo da complexidade e personalização dos modelos de ML.

1. **App para usuário**
	- Uso público de serviços de IA generativa
	- Ex: ChatGPT, Midjourney

2. **App para empresas**
	- Uso restrito a apps e SaaS com funções de IA generativa
	- Ex: Salesforce Einstein GPT, Amazon CodeWhisperer (que pode ser restrito a pessoas de uma empresa)

3. **Modelos pré-treinados**
	- Construção do app a partir de um modelo já treinado
	- Ex: Amazon Bedrock

4. **Modelos com ajuste fino**
	- Ajuste fino de um modelo com dados próprios
	- Ex: Amazon Bedrock com modelos personalizados, Amazon SageMaker Jumpstart

5. **Modelos próprios**
	- Criação de um modelo do zero
	- Ex: Amazon SageMaker

Requisitos de segurança aplicados aos escopos

- Governança e compliance
- Privacidade e Legislação
- Gerenciamento de riscos
- Controladores
- Resiliência



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