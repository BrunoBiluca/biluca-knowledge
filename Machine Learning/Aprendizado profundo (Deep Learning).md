# Aprendizado profundo (Deep Learning)

> [!info] Definição
> O aprendizado profundo, também conhecido como deep learning, é uma subárea do campo da inteligência artificial (IA) que se concentra no treinamento de modelos de computador para aprender e realizar tarefas complexas, sem depender explicitamente de regras programadas. 
> 
> O termo "profundo" refere-se à ideia de que esses modelos são compostos por várias camadas de neurônios artificiais, permitindo que eles aprendam representações de alto nível dos dados.

Em contraste com métodos tradicionais de aprendizado de máquina, que muitas vezes exigem a extração manual de características relevantes dos dados, ==o aprendizado profundo permite que os modelos aprendam automaticamente essas características diretamente dos dados brutos==. Isso é possível graças à arquitetura de rede neural profunda, que é capaz de aprender representações hierárquicas e abstratas dos dados em várias camadas de processamento.

Os modelos de aprendizado profundo são frequentemente usados em uma variedade de tarefas de IA, incluindo:

1. **Visão Computacional:** Reconhecimento de imagens, detecção e segmentação de objetos, classificação de vídeos, entre outros.
    
2. **Processamento de Linguagem Natural (NLP):** Tradução automática, análise de sentimentos em texto, geração de texto, resposta a perguntas, entre outros.
    
3. **Reconhecimento de Fala:** Reconhecimento de voz, transcrição de áudio, síntese de voz, entre outros.
    
4. **Análise de Dados Sequenciais:** Previsão de séries temporais, modelagem de linguagem, entre outros.
    

O aprendizado profundo tem sido impulsionado pelo aumento na disponibilidade de dados rotulados, avanços na capacidade computacional e o desenvolvimento de algoritmos de treinamento eficientes, como a retropropagação (backpropagation) e técnicas de regularização.

> [!tip]- Machine Learning tradicional vs Deep Learning
> Suponha que temos um conjunto de dados de imagens de gatos e cachorros, e queremos construir um classificador para distinguir entre as duas classes.
> 
> **Extração Manual de Características (Modelo Tradicional):**
> 
> Neste caso, para um modelo tradicional de aprendizado de máquina, um engenheiro de dados ou cientista de dados teria que identificar manualmente características relevantes das imagens, como cor da pelagem, formato das orelhas, comprimento do focinho, entre outros. Essas características seriam extraídas manualmente e transformadas em um conjunto de características numéricas que o modelo tradicional poderia entender, como por exemplo:
> 
> - Cor da pelagem: [0.2 (marrom), 0.8 (preto)]
> - Formato das orelhas: [0.6 (pontudas), 0.4 (arredondadas)]
> - Comprimento do focinho: 0.75 (proporção em relação ao tamanho da cabeça)
>   
> Essas características seriam então alimentadas em um modelo de aprendizado de máquina, como uma máquina de vetores de suporte (SVM) ou uma árvore de decisão, que aprenderia a distinguir entre gatos e cachorros com base nessas características.
> 
> **Aprendizado Automático de Características (Aprendizado Profundo):**
> 
> Por outro lado, em um modelo de aprendizado profundo, como uma rede neural convolucional (CNN), o próprio modelo é capaz de aprender automaticamente a partir dos dados brutos, sem a necessidade de extração manual de características. 
> 
> As imagens de gatos e cachorros seriam fornecidas diretamente à rede neural, e as camadas convolucionais da rede aprenderiam a extrair automaticamente características relevantes das imagens durante o processo de treinamento. Essas características poderiam incluir bordas, texturas, padrões e outras características visuais discriminativas que ajudam a distinguir entre as duas classes.
