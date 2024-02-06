---
tags:
  - arquitetura_software
---
The C4 model is...

1. A set of hierarchical abstractions (software systems, containers, components, and code).  
2. A set of hierarchical diagrams (system context, containers, components, and code).  
3. Notation independent.  
4. Tooling independent.  

Uses and benefits

The C4 model is an easy to learn, developer friendly approach to software architecture diagramming. Good software architecture diagrams assist with communication inside/outside of software development/product teams, efficient onboarding of new staff, architecture reviews/evaluations, risk identification (e.g. [risk-storming](https://riskstorming.com/)), threat modelling, etc.

![[comparação entre o modelo C4 e google maps.png|Comparação entre a proposta do modelo C4 e o google maps, demonstra a lógica com diferentes níveis de aprofundamento|center|500]]

In order to create these maps of your code, we first need a common set of abstractions to create a ubiquitous language that we can use to describe the static structure of a software system. A **software system** is made up of one or more **containers** (applications and data stores), each of which contains one or more **components**, which in turn are implemented by one or more **code elements** (classes, interfaces, objects, functions, etc). And **people** may use the software systems that we build.

![[Abstrações do modelo C4.png]]

# Ferramentas

- https://www.archimatetool.com/
	- Ferramenta recomendada para a construção do Diagrama C4.



# Referências

- https://c4model.com/
	- Apresenta também uma tabela muito funcional de escolha de ferramenta para modelagem