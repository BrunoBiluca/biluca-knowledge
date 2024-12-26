# Critérios de aceite

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

Critérios de aceite são **condições que devem ser satisfeitas** a fim de que um requisito seja aceito e dado como concluído. Cada CA deve ser expresso como uma conjunto de declarações que visam descrever **como exatamente o produto reage as ações do usuário**, diferente das [[Histórias de usuário]] que estão preocupadas com os objetivos, propósitos e intenções do usuário.

--- end-column ---

> [!info] Atores
> - Os product owners são os principais responsáveis por escrever critérios de aceitação, em casos mais complexos o PO pode requisitar ajuda para outras posições, como analista de negócios, analista de requisitos ou coordenadores de projetos.

---

> [!quote]- Referências externas
> - (Artigo) - [Acceptance Criteria for User Stories in Agile: Purposes, Formats, Examples, and Best Practices](https://www.altexsoft.com/blog/acceptance-criteria-purposes-formats-and-best-practices/)
> 	- Apanhado geral sobre critérios de aceite com exemplos de cada um dos modelos.
> - 

--- end-multi-column

Critérios de Aceite devem ser:

- **concisos** - escrita curta
- **testáveis** - deve ser possível verificar a conclusão ou não do critério
- **claros** - direto ao ponto
- **focados no resultado** - estritamente relacionado com o objetivo

Os critérios de aceite são diferentes da [[Definição de Pronto (DdP)]]. Enquanto a DdP pode ser reaproveitada para todas as histórias o **critérios de aceite são definidos exclusivamente para um história.**

Os principais motivos de utilizar CAs são:

- Definir melhor o escopo dos requisitos
- Descrever cenários negativos
- Estabelecer comunicação, garante que todos os integrantes do projeto estão na mesma página.
- Base da criação de testes de aceitação das histórias de usuário

### Modelo baseado em regras

Esse modelo descreve o critério de aceitação como uma lista de regras que descrevem o comportamento do sistema.

**Exemplo**

História: gostaria de adicionar comentários as identificações das entradas a fim de lembrar o significado daquela identificação depois de algum tempo.

Critérios de aceitação

- Permitir editar a identificação na mesma tela de criação de identificações
- Os comentários devem ter um tamanho máximo de 500 caracteres
- Deve ser permitido adicionar quebra de linha aos comentários

### Modelo baseado em cenários

Um modelo recorrentemente utilizado na criação de casos de testes e critérios de aceite é imaginar um cenário e de acordo a uma ação ou acontecimento se espera um resultado. 

Pode se utilizar o formato **Dado tal ação; então tal resultado**.

Algumas dicas na hora de criar critérios de aceite:

- **Evitar CAs genéricos** como "espero ter uma documentação sobre todos os elementos".

### Template

Por padrão definimos o seguinte template para auxiliar na criação dos CAs:

```
Como resultado espero (critérios de aceite):
- Que <dado tal coisa> teremos <tal resultado>
- (Ao final) Ter <tal resultado>
- (Ao final) Ter <tal coisa>
```

Os elementos em parênteses podem ser omitidos já que são implícitos.

### Exemplos

Execução: Consolidar a organização pessoal e todos os seus processos, entidades e formatos no Conhecimento Biluca.
Critérios de aceite:
- **Mau exemplo:** Ter uma documentação sobre todos os elementos utilizados na organização pessoal
- **Bom exemplo:** Ter uma documentação sobre os elementos: Valores, Épicos, Execuções, Rituais, Visualizações
- **Justificativa:** O exemplo mau de CA não define nada e nem guia a execução para sua conclusão, com um pouco mais de refinamento já melhora bastante a clareza do CA.

Execução: Definição inicial do Databricks API (o próprio objetivo já num é muito bom)
- **Mau exemplo:** Definir os principais componentes
- **Bom exemplo:** Definir os componentes necessários para a prova de certificação: Use REST API to clone a job, trigger a run, and export the run output (isso está no guia do exame)
- **Justificativa:** O exemplo mau de CA deixa de maneira genérica os componentes que devem ser estudados, enquanto no exemplo bom temos uma noção muito clara de que endpoints precisamos utilizar.