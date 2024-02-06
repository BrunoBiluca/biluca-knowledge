> [!info] Palestra
> https://www.youtube.com/watch?v=0-gVFWONnQw

Palestra a respeito de modelagem de software por Simon Brown (criador do modelo C4 de visualização). Nessa palestra o foco é na criação dos diagramas com código utilizando a ferramenta structurizr.

A principal ideia por trás do modelo C4 é apresentar diagramas como mapas que são exibidos em diferentes níveis de detalhes dependendo do nível de abstração do sistema.

> [!tip] Utilizar ferramentas de desenho de diagramas gerais
> **Não é recomendado** por não prover nenhum tipo de guia, semântica, ou dicas a respeito da criação do diagrama, o que pode levar a erros de consistência e outros problemas.

## Ferramenta

Foi criado para a criação dos diagramas uma ferramenta específica para a criação de diagramas focando no modelo C4.

- https://structurizr.com/
	- Principal ferramenta criada para o desenvolvimento de diagramas C4 pelo próprio criado do modelo (Simon Brown).

## Sistema com múltiplos serviços

Quando queremos representar o sistema completo em um diagrama com vários serviços o ideal é quebrar os diagramas para cada serviço e cada camada abaixo no diagrama representa um único serviço.

Outra forma de exibir um diagrama de um sistema com vários serviços é renderizar em formato de grafo. Dessa forma podemos mostrar todos os sistemas ao mesmo tempo.

## Para modelagem de várias equipes

Para separar a responsabilidade da criação do diagrama entre várias equipes a melhor abordagem é criar uma linguagem relacionada aos sistemas de software e pessoas que é comum a todos os sistemas e então cada time estende essa dsl para definir o diagrama do seu próprio serviço.

![[quebra de responsabilidades entre várias equipe C4.png|Separação de responsabilidade da criação do diagrama entre várias equipes|center|500]]
