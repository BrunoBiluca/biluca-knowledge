# Documentação do sistema

--- start-multi-column:
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

É um tipo de [[Documentação de produto]] que descreve o sistema e suas partes. Nela incluem os documentos de requisitos, decisões de projeto, descrições arquiteturais, modelagem das estruturas do projeto entre outros.

--- end-column ---

> [!info] Alvo da documentação
> - Desenvolvedores (programadores, designers, analistas de qualidade...) a fim de manter a consistência do sistema
> - Coordenadores (arquitetos, POs, coordenadores...) a fim de evoluir o sistema

--- end-multi-column

Essa documentação tem uma abordagem mais descritiva do sistema e tem como **principal vantagem ajudar na tomada de decisões**, já que esse material nos permite ter uma ideia mais simplificada do sistema como um todo e de suas partes.

Alguns tipos comuns de elementos que compõem essa documentação:

- [[Documento de arquitetura]]
- [[Documento de API]]
- Documento de Hierarquia de pastas
    - Importante para novos integrantes poderem contribuir sem dúvida
- Documentos de Bibliotecas, Software, Ferramentas, Frameworks utilizados e homologados
    - Cada biblioteca utilizada no projeto, justificar cada biblioteca é uma forma de melhorar a legibilidade do código e de sustentar a longo prazo as decisões.
    - Cada elemento técnico deverá ter um documento técnico
- Processo de publicação
    - Descrição do processo de publicação e disponibilização a fim de demonstrar como ter acesso ao projeto desenvolvido
- Guia inicial de execução
    - Para novos integrantes conseguirem executar o projeto sem problemas
- Versionamento
    - Principalmente para novos integrantes, saber como são feitas as contribuições e seus formatos

Também é possível inverter a relação do requisito do produto em relação a documentação do sistema. Nesse caso definimos os requisitos técnicos como elementos do requisito do produto, assim cada novo requisito de produto define como será sua alteração técnica do sistema. Este é um formato mais descentralizado de documentação de sistema.