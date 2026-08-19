---
tags:
  - programação
  - programação/equipe
---
# Code Review

Uma etapa essencial no ciclo de vida de desenvolvimento de software é a revisão de código. Ele permite que os desenvolvedores melhorem significativamente a qualidade do código. A revisão de código, neste contexto, refere-se ao exame e avaliação do código por outras pessoas.
  
Existem diferentes **benefícios do 𝗰𝗼𝗱𝗲 𝗿𝗲𝘃𝗶𝗲𝘄**: garante consistência no design e implementação, otimiza o código para melhor desempenho, é uma oportunidade de aprender e compartilhar conhecimento e orientação, bem como promove a coesão da equipe.
  
O que você deve procurar em uma revisão de código? Tente procurar coisas como:
  
🔹 𝗗𝗲𝘀𝗶𝗴𝗻 (isso se integra bem com o resto do sistema e as interações de diferentes componentes fazem sentido)
🔹 𝗙𝘂𝗻𝗰𝘁𝗶𝗼𝗻𝗮𝗹𝗶𝘁𝘆 (essa mudança é o que o desenvolvedor pretendia)
🔹 𝗖𝗼𝗺𝗽𝗹𝗲𝘅𝗶𝘁𝘆 (este código é mais complexo do que deveria ser)
🔹 𝗡𝗮𝗺𝗶𝗻𝗴 (nomear é bom?)
🔹 𝗘𝗻𝗴. 𝗽𝗿𝗶𝗻𝗰𝗶𝗽𝗹𝗲𝘀 (SOLID, KISS, DRY)
🔹 𝗧𝗲𝘀𝘁𝘀 (são diferentes tipos de testes usados ​​apropriadamente, cobertura de código),
🔹 𝗦𝘁𝘆𝗹𝗲 (segue as diretrizes de estilo),
🔹 𝗗𝗼𝗰𝘂𝗺𝗲𝗻𝘁𝗮𝘁𝗶𝗼𝗻, etc.

### Melhores práticas

Aqui estão algumas boas práticas ao fazer uma revisão de código:

- Crie um guia de desenvolvimento

Durante as discussões podem surgir discordâncias na linha a ser tomada, para isso é importante manter um guia de desenvolvimento que mediará essas discussões.

Esse guia é vivo e deve ser atualizado sempre que o entendimento a cerca de um tema seja alterado, sempre de maneira orgânica (não é necessário pensar em todas as questões a priori).
  
- **Revise seu próprio código**
  
Antes de enviar um código para seus colegas, tente primeiro lê-lo e entendê-lo. Procure por peças que te confundem você.
   
- Automatize tudo que pode ser automatizado
  
Deixe para o sistema tudo o que pode ser automatizado, como verificação de compilações bem-sucedidas (CI), alterações de estilo (linters), testes automatizados, alguns code-smells e bugs de código (SonarQube).
  
- Não se apresse
  
É necessário entender tudo que foi alterado. Um pouco de paciência pode prevenir problemas futuros.
  
- Comente com respeito e empatia
  
Foque sempre nas mudanças como dúvidas ou sugestões e deixe pelo menos um comentário positivo. Explique o “porquê” nos seus comentários e sugira como melhorá-lo.
  
- Aprove Pull Requests quando estiver bom o bastante
  
Não busque a perfeição, mas mantenha padrões elevados. Não seja um detalhista.
  
- Faça revisões frequentes e com pequenas quantidade de código
  
Deveríamos limitar o número de linhas de código para revisão de uma só vez. Nossos cérebros não conseguem processar tantas informações ao mesmo tempo. O número ideal de LOC é de 200 a 400 linhas do núcleo por vez, o que geralmente dura de 60 a 90 minutos.