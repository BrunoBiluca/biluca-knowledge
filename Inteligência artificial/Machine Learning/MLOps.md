
> [!info] Definição
> MLOps se refere à prática de operacionalizar e simplificar o ciclo de vida de machine learning de ponta a ponta, desde o desenvolvimento e implantação do modelo até o monitoramento e a manutenção

Os princípios chave do MLOps são:

- Controle de versão
- Automação
- CI/CD
- Governança de modelo

#### Fluxo do tempo de um ciclo com desenvolvimento MLOps

```mermaid
%%{init: { 'logLevel': 'debug', 'theme': 'default' , 'themeVariables': { 'cScale0': '#ff0000', 'cScaleLabel0': '#ffffff', 'cScale1': '#00ff00', 'cScale2': '#0000ff', 'cScaleLabel2': '#ffffff' } } }%%

timeline

Dados : Preparação dos dados : Repositório dos dados
Desenvolvimento do modelo : Experimentações : Avaliação do modelo : Seleção do modelo : Repositório de códigos
Implantação : Testes automatizados : Testes A/B : Promoção para produção : Repositório de modelos
Monitoramento : Métricas de performance : Reavaliação do modelo
```


