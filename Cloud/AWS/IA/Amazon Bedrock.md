---
tags:
  - inteligência_artificial
---
> [!info] O que é?
> O Amazon Bedrock é um serviço totalmente gerenciado que oferece várias opções de modelos de base (FMs) de alta performance por meio de uma única API.
> 
> [Página do produto](https://aws.amazon.com/pt/bedrock/)

Funcionalidades

- Simplifica o desenvolvimento dessas aplicação em relação a segurança, privacidade e modelos de IA
- Escolha de modelos de base das principais empresas
- Fácil personalização do modelo com seus dados
- Suporte nativo para RAG
- Certificações de segurança e conformidade de dados
- Modelo de responsabilidade compartilhada, AWS entra com infra e o desenvolvedor com a governança dos dados.


Serviços relacionados

- AWS Lambda para invocar ações
- Amazon S3 para dados de treinamento e validação
- Amazon CloudWatch para monitorar métricas
- Guardrails for Amazon Bedrock: serviço de avaliação para fornecer uma camada adicional de proteção contra conteúdos e entradas do usuário indesejados.
- AWS PrivateLink para a integração com redes corporativas.

### Modelos disponíveis

- **AI21 Labs - Série Jurassic-2**: texto
- **Amazon - Titan**: uso geral
- **AnthropP/C - Claude**: texto e visão
- **Cohere - Command XL**: texto
- **Meta - Llama**: texto
- **Mistral AI - Mistral Large**: texto com foco em tarefas que exigem muito raciocínio
- **Stability AI - Stable Diffusion**: geração de imagens

### Precificação

Com o Amazon Bedrock, a cobrança é feita com **base na inferência e na personalização de modelos**. 

Planos de preços para inferência: 
1. Sob demanda e em lote: esse modo permite usar FMs com base no pagamento conforme o uso, sem precisar assumir compromisso com base no tempo. 
2. Throughput provisionada: esse modo permite provisionar uma throughput suficiente para atender aos requisitos de performance da sua aplicação em troca de um compromisso de prazo baseado em tempo.

[Página de precificação do Bedrock](https://aws.amazon.com/pt/bedrock/pricing/)

Cada plano irá definir uma **quantidade limite de uso do serviço (cotas)**, relacionadas ao número de trabalhos simultâneos, número de chamadas por minuto a API e número total de tokens consumidos. 

# Avaliação de modelos

O Amazon Bedrock oferece dois tipos de avaliação de modelos: automática e humana.

- Automática: oferece métricas predefinidas, como precisão, robustez e toxicidade.
- Humana: oferece métricas subjetivas e personalizadas, como simpatia, estilo e alinhamento com a voz da marca.

# Amazon Bedrock API

O serviço Amazon Bedrock pode ser integrado utilizando a Amazon Bedrock API ([Documentação](https://docs.aws.amazon.com/bedrock/latest/APIReference/welcome.html)). Com essa API é possível criar automações para acesso aos principais componentes do Bedrock como:
- `bedrock`: managing, training, and deploying models
- `bedrock-runtime` – making inference requests for models hosted in Amazon Bedrock
- `bedrock-agent` – creating and managing agents and knowledge bases
- `bedrock-agent-runtime` – invoking agents and querying knowledge bases

# Amazon Titan

> [!info] O que é?
> O Amazon Titan é uma família de modelos exclusiva do Amazon Bedrock.
> Oferece uma variedade de oções de modelos de imagem, multimodais e de texto.
> 
> [Página do produto](https://aws.amazon.com/pt/bedrock/titan)

Casos de uso

- Geração de texto
- Resumo
- Pesquisa semântica
- Geração de imagens
- Geração aumentada de recuperação (RAG)


