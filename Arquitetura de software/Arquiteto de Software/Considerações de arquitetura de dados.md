---
tags:
  - arquitetura_software
---
erAqui serão apresentadas algumas questões ou considerações que podem impactar em tomadas de decisões durante o processo de ciclo de vida de engenharia de dados (CVED).

> [!tip] Dados são melhores quando levam a uma ação.

# Ingestão

- Qual o caso de uso para os dados que estão sendo ingeridos?
- Qual é o destino dos dados?
- Com que frequência esses dados devem ser atualizados? 
- Qual o volume de dados esperado?
- Qual o formato dos dados?
- Os dados já estão prontos para serem ingeridos? A qualidade dos dados é suficiente? Ou será necessário algum tipo de processamento para deixar os dados na qualidade desejada?

# Levantamento de projetos

- Quem irá utilizar esses dados, como eles serão utilizados?
- O que os stakeholders esperam?
- Como posso colaborar com os stakeholders para entender como eles utilizarão esses dados?

# Gerenciamento de dados

- Como você está protegendo os dados contra brechas internas ou externas?
- Qual sua conformidade em relação a regulações de privacidade?
- Como é garantido a qualidade dos dados e que os dados corretos estão sendo exibidos na solução?
- É possível deletar dados caso um usuário requisite o processo de remoção?

### Fontes de dados

É necessário entender a origem dos dados de forma a se precaver de mudanças nas etapas posteriores do CVED.

- Os sistemas ascendentes (anteriores no fluxo de dados) são fáceis de entender e confiáveis? 
- Quem administra os dados?
- Como a qualidade e integridade dos dados nos sistemas ascendentes pode ser garantida?
- Como gerenciar mudanças no esquema dos dados de sistemas ascendentes?
- Baseados nas regulações (LGPD entre outras) esses dados podem ser acessados?
- Os dados serão acessados de forma bruta ou serão ofuscados?

# Segurança

### Fontes de dados

É necessário garantir que as fontes de dados sejam tão seguras de forma que o processo de transmissão desses dados não crie brechas de possíveis vazamentos.

- No sistema fonte os dados são seguros ou encriptados, tanto no armazenamento quanto no transmissão desses dados?
- O sistema fonte é acesso pela internet pública, ou por uma rede privada (VPN)?
- Senhas, tokens e credenciais estão devidamente seguras?
- O sistema base é confiável?

# DataOps

### Fontes de dados

- Automações podem impactar no sistema da fonte dos dados?
- Algum problema no sistema da fonte de dados pode impactar no fluxo de automação dos dados? Caso sim, o fluxo deve ser desacoplado.
- Como podemos monitorar problemas na fonte dos dados?
	- O que garante que a fonte de dados está operante e disponível quando necessário?
- Como podemos garantir que o sistema se comporte como esperado
	- Qual a condição da qualidade dos dados?
	- O esquema está compatível com o esperado? 
	- As entradas capturadas estão consistentes? 
	- Os dados estão ofuscados como determinado nas políticas?

# Orquestração

### Fontes de dados

A primeira consideração em relação a orquestração é sobre o acesso a fonte de dados.

- A fontes está disponível em uma agenda fixa, ou é possível acessar a qualquer momento?
- Faz sentido integrar a aplicação com o fluxo de dados no mesmo cluster Kubernetes?

# Engenharia de software

### Fontes de dados

- O código está acessando a fonte por meio de HTTPS URL em internet pública, SSH ou uma VPN?
- Onde e como as credenciais estão sendo acessadas?
- Como o código está lidando com requests REST/GraphQL, volume de respostas e paginação?
	- Como retentativas e limites de tempo são lidados?
- Como o código integra com o framework de orquestração?
- Como está sendo gerenciado o acesso em paralelo a fonte de dados?
- Como está sendo gerenciado a publicação de mudanças no código?

