
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


