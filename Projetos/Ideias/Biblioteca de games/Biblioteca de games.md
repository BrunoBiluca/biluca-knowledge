# Biblioteca de games

> [!info] Objetivo
> Criar uma plataforma que permita ao jogador ter controle sobre os seus jogos e consiga organizar sua jogatina.
> 
> A jogatina será organizada de acordo com os desafios propostos pelo próprio jogador, isso coloca o jogador no controle o que incentiva a criatividade.

> [!quote] Objetivos secundários
> - Esse projeto também será utilizado como base técnica para a criação de futuros projetos similares. A ideia é levantar um conjunto de tecnologias e práticas que amarrem o desenvolvimento em todas as suas etapas (concepção, implementação e manutenção).

#### Motivação

Tentei utilizar vários sistemas de organização de jogos, porém todos eles caiam num problema principal, que era não poder configurar a experiência com o jogo do meu jeito. Isso, porque geralmente esses sistemas utilizam como base o estado do jogo, uma ideia muito retirada da execução de tarefas, assim um jogo está em um estado novo ou em progresso ou concluído ou platinado. Agora, o que acontece quando um jogo já foi concluído e eu só quero jogar novamente? Eu zerei esse jogo, ai ele passa a não ter sido zerado? Caso eu queria fazer um final alternativo, como seria o estado do jogo nesse caso? E jogos com várias DLCs? Ou talvez eu estou jogando alguma modificação? Esse formato de cadastro dificulta a organização da biblioteca de jogos e impede de ter um controle mais fino do que está sendo jogado.

Uma biblioteca que separe o estado do cadastro do jogo resolve esse problema. Assim, posso rastrear que eu zerei o mesmo jogo várias vezes, isso também possibilita criar meus próprios desafios, como chegar em um ranking específico, zerar com uma pontuação, zerar no nível desejado, zerar utilizando alguma modificação. 

Isso abre um leque de possibilidades muito grande sem impactar no catálogo dos jogos, permitindo assim fazer retrospectivas do catálogo, essa informação é bem divertida de ser gerada.

#### Referências

- [How long to Beat?](https://howlongtobeat.com/)
	- Esse site permite o usuário catalogar seus jogos e rastrear o tempo para concluir cada jogo. Ele implementa o estado separado do jogo, mas acho a interface muito confusa e pouco atrativa, hoje acho que o meu Notion é mais bonito do que o HLTB.

- [My Game Collection](https://play.google.com/store/apps/details?id=com.tuyware.mygamecollection&hl=pt_BR&pli=1)
	- Um aplicativo para catálogo de games, tem vários recursos para filtragem, porém também apresenta o problema de categorizar os jogos por tag.

# Requisitos

- [[DRP 01 - Jogadores]]
- [[DRP 02 - Catálogo de jogos]]
- [[DRP 03 - Registro de desafios]]

### Principais personas

- **Visitantes** - qualquer pessoa com acesso ao site
- **Jogadores** - são pessoas registradas que estão rastreando o progresso em seus jogos
- **Moderadores** - são avaliadores de conteúdo
