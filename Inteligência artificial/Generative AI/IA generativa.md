IA generativo é um subconjunto de [[Machine Learning]] que visa utilizar um modelo ML pré-treinado a fim de gerar saídas para os usuários, sejam essas texto, imagens, vídeos ou um conjunto de todas essas.
# IA Responsável

> [!info] O que é?
> 
> Uma IA responsável se refere a um conjunto de práticas e princípios que garantem a transparência e confiabilidade ao mesmo tem po que mitigam riscos e resultados negativos de sistemas de IA.

As empresas devem garantir proativamente (~responsabilidade da empresa não venham com regulamentações para cima das empresas, elas sabem como fazer o melhor para a sociedade~):

- Mecanismos de monitoramento e supervisão
- Compromisso com estratégias, diretrizes e práticas de IA responsável

Principais dimensões da IA responsável

- Imparcialidade (+-)
- Explicabilidade
- Privacidade e segurança
- Veracidade e robustez
- Transparência
	- Interpretabilidade: modelos que fornecem um sistema para que um humano possa explicar a saída do modelo com base nos pesos e recursos.
- Governança
- Proteção
- Controlabilidade

## Principais desafios

Para além dos [[Machine Learning#Desafios|desafios em relação a criação de modelos de ML]] a IA generativa apresenta alguns desafios específicos:

- Violações regulatórias
    - Vazamento de informações de identificação pessoal
    - *Mitigação:* treinar o modelo seguindo técnicas de anonimato e preservação de privacidade dos dados

- Riscos sociais
    - Conteúdo indesejado ser gerado
    - *Mitigação:* testagem e avaliação de todos os modelos antes de implantação em produção

- Preocupação com segurança e privacidade de dados
    - Compartilhamento de dados que violem leis de privacidade com o domínio
    - *Mitigação:* aplicar medidas de segurança cibernética, como firewalls e criptografia

- Toxicidade
    - Gerar conteúdo inflamatório, ofensivo ou impróprio
    - *Mitigação:* curadoria contínua dos modelos e proteção que detectam e filtram o conteúdo indesejado

- Alucinações
    - Respostas imprecisas que não são consistentes com os dados de treinamento
    - *Mitigação:* não tem, na real é ensinar aos usuários que isso pode acontecer mesmo e boa sorte.

- Plágio e fraude
- Propriedade intelectual

## Transparência e explicabilidade

- Estruturas de explicabilidade: técnicas como SHAP (Shapley Value Added), LIME (Layout-Independent Matrix Factorization) podem ajudar a resumir e interpretar as decisões do modelo.
- Documentação transparente
- Monitoramento e auditoria
- Supervisão e envolvimento humano
- Explicações contrafactuais: Forneça explicações contrafactuais que mostrem como a saída mudaria se determinados atributos de entrada fossem diferentes para ajudar os usuários a entender o comportamento e o raciocínio do modelo.
- Explicações da interface de usuário


# Modelos generativos

- [[Large Language Models]]
- **Modelos de difusão:** modelos que começam com um ruído aleatório e adicionam informação até obterem uma saída clara e coerente
- **Redes adversárias generativas (GANs):** duas redes neurais competem entre si uma sendo a geradora e a outra sendo a discriminadora, até a geradora produzir dados indistinguíveis dos dados reais.
	- geradora: gera novos dados a partir dos ruídos aleatórios e os transformam em dados que se assemelham à distribuição de dados de treinamento
	- discriminadora: seu objetivo é distinguir entre os dados reais (providos no treinamento) e os dados sintéticos da geradora
- **Codificadores automáticos variacionais (VAEs):** combina codificadores automáticos e inferência variacional (técnica de estatística bayesiana).
	- Codificadora: captura as características essenciais dos dados de treinamento
	- Decodificadora: reconstrói a representação criada pela codificadora para gerar os dados reais


# Desenvolvimento de uma aplicação de IA generativa

Ciclo de vida ds aplicações de IA generativa

- Defina um caso de uso
- Selecione um modelo de base
- Melhore o desempenho
- Avalie os resultados
- Implante a aplicação
- Monitoramento da aplicação

É importante observar que o ciclo de vida da aplicação de IA generativa é um processo iterativo, devemos levar em consideração as métricas de desempenho, avaliações dos usuários e qualquer outro tipo de dado que possa ser coletado para melhorar o modelo.

## Defina um caso de uso

Uma forma de fazer a definição é utilizar a abordagem de caso de uso comercial.

> [!info]- Caso de uso comercial
> É uma narrativa estruturada qeu descreve como um sistema ou processo deve se comportar a partir da perspectiva de um ator ou stakeholder.
> 
> É composto geralmente das seguintes partes
> - Nome do caso de uso
> - Breve descrição
> - Atores
> - Condições prévias
> - Fluxo básico (principal cenário de sucesso)
> - Fluxos alternativos (extensões)
> - Pós-condições
> - Regras de negócios
> - Requisitos não funcionais
> - Pressuposições
> - Observações ou informações adicionais

## Selecione um modelo de base

Principais considerações

- Custo: questões de licenciamento
- Modalidade: formato que o modelo foi treinado a replicar, como texto, áudio, vídeos ou multimodal
- Latência
- Suporte a vários idiomas
- Tamanho do modelo
- Complexidade do modelo
- Personalização
- Comprimento de entrada/saída: modelos podem ter limitações em relação a isso
- Considerações sobre responsabilidade ([[IA generativa#Principais desafios]])
- Implantação e integração
- [[Large Language Models#Avaliação de modelos de linguagem|Avaliação de modelos de linguagem]]

Os principais modelos no mercado podem ser encontrados no [[Amazon Bedrock#Modelos disponíveis]].
## Melhore o desempenho

Após a seleção do modelo base é preciso concentrar em melhorar o desempenho do modelo para o caso de uso definido. Isso pode ser feito a partir de algumas técnicas como:

- [[Design de comandos (Engenharia de prompts)]]
- [[RAG (Retrieval Augmented Generation)]]
- Ajuste fino
- Agentes de automação
- ROUGE (Recall-Oriented Understudy for Gisting Evaluation) é uma métrica utilizada para avaliar a qualidade de geração de textos e resumo de textos.
- **Pré-treinamento continuado de modelos base:** pode ser utilizado para ajudar o modelo a entender terminologia específica de um domínio.

O [[Amazon Bedrock]] é um serviço que pode ser utilizado para reunir fontes de dados de vários domínios e melhorar o desempenho do modelo escolhido.

### Ajuste fino

O ajuste fino é um processo mais direcionado, em que um modelo pré-treinado é adaptado para ter um bom desempenho em uma tarefa específica ou em uma área específica.

- Especificidade: o conjunto de dados no ajuste fino é muito mais focado
- Alta relevância
- Qualidade mais importante que quantidade

O ajuste fino depende de uma base de **dados rotuladas.**

## Avalie os resultados

- Avaliação humana
- Uso de conjuntos de dados de referência

## Implante a aplicação