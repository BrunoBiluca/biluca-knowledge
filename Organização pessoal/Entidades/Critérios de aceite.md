# Critérios de aceite

Critérios de aceite são **condições que devem ser satisfeitas** a fim de que uma [[🏗️ Execuções|Execução]] seja aceita e dada como concluída. Cada CA deve ser expresso como uma conjunto de declarações que visam descrever o que será entregue como avanço no Valor, sem especificar como isso será alcançado.

É necessário que os CAs sejam bem definidos antes de dar a Execução como refinada para isso ele **devem ser**
- **concisos** - escrita curta
- **testáveis** - deve ser possível verificar a conclusão ou não do critério
- **claros** - direto ao ponto
- **focados no resultado** - estritamente relacionado com o objetivo

Os critérios de aceite variam de acordo com o tipo da execução, já que o que define uma execução concluída para um estudo é diferente de uma execução de desenvolvimento.

> [!tip] Modelo baseado em cenário
> Um modelo recorrentemente utilizado na criação de casos de testes e critérios de aceite é imaginar um cenário e de acordo a uma ação ou acontecimento se espera um resultado. 
> 
> Pode se utilizar o formato **Dado tal ação; então tal resultado**.

Algumas dicas na hora de criar critérios de aceite:

- **Evitar CAs genéricos** como "espero ter uma documentação sobre todos os elementos".

#### Template

Por padrão definimos o seguinte template para auxiliar na criação dos CAs:

```
Como resultado espero (critérios de aceite):
- Que <dado tal coisa> teremos <tal resultado>
- (Ao final) Ter <tal resultado>
- (Ao final) Ter <tal coisa>
```

Os elementos em parênteses podem ser omitidos já que são implícitos.

#### Exemplos

Execução: Consolidar a organização pessoal e todos os seus processos, entidades e formatos no Conhecimento Biluca.
Critérios de aceite:
- **Mau exemplo:** Ter uma documentação sobre todos os elementos utilizados na organização pessoal
- **Bom exemplo:** Ter uma documentação sobre os elementos: Valores, Épicos, Execuções, Rituais, Visualizações
- **Justificativa:** O exemplo mau de CA não define nada e nem guia a execução para sua conclusão, com um pouco mais de refinamento já melhora bastante a clareza do CA.

Execução: Definição inicial do Databricks API (o próprio objetivo já num é muito bom)
- **Mau exemplo:** Definir os principais componentes
- **Bom exemplo:** Definir os componentes necessários para a prova de certificação: Use REST API to clone a job, trigger a run, and export the run output (isso está no guia do exame)
- **Justificativa:** O exemplo mau de CA deixa de maneira genérica os componentes que devem ser estudados, enquanto no exemplo bom temos uma noção muito clara de que endpoints precisamos utilizar.