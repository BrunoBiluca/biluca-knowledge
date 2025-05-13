# Qualidade dos dados

Uma das principais preocupações da [[Engenharia de Dados.canvas|Engenharia de Dados]] é garantir que os dados ingeridos e processados estejam apresentando as informações corretas. Essas informações são muitas vezes utilizadas para tomada de decisões e garantir que elas sejam corretas e precisas pode pautar uma boa ou péssima consequência.

É importante que os dados sejam transformados levando em consideração as regras do negócio. Alguns exemplos podem ser:

- Essa coluna é obrigatória?
- Esses valores são válidos?
- O formato está correto?
	- Formato é algo muito importante, datas podem variar dependendo do país, assim como unidades de medidas
- Caso a coluna seja um valor numérico, ela deve estar dentro de uma faixa?

> [!info]- Anedota do módulo de distância da NASA
> Caso da Nasa muito curioso que terceirizou a criação de uma módulo de cálculo de distância para suas naves para um time Europeu, quando foram fazer as contas o programa apresentava vários erros, isso porque os Estados Unidos usam outro sistema de medida que a Europa e isso não foi levado em consideração na hora de criar o programa.

### Métricas de qualidade

Podemos definir várias métricas para definir a qualidade dos dados.

- **Cobertura (coverage)** mede a extensão dos dados precisam de ter presente em um conjunto de dados. Pode ser utilizado para entender a completude dos dados.
- **Consistência (consistency)** verifica como dados de diferentes fontes se relacionam, foco na precisão em vez de apenas presença do dado.