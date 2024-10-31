#planejamento_de_projetos/histórias  

Esse primeiro capítulo trata de alguns temas relacionados ao básico de criação de histórias de usuário, como sua definição, melhores práticas na hora de discutir as histórias e até algumas práticas de como se organizar com histórias.

# **Dica 1:** conte histórias em vez de escrevê-las

Nessa primeira dica Gojko explica a principal contribuição que histórias de usuário tem no planejamento do projeto.

Histórias são utilizadas para guiar a discussão que deve ser feita de forma colaborativa entre todos os membros do projeto a fim de encontrar a melhor solução para um problema já existente.

Ter uma história bem contada pode prevenir falhas de conhecimento e acelerar sua análise.

# **Dica 2:** Não se preocupar com o formato da história

Utilizar histórias como lembretes de uma discussão e não como um artefato sólido do projeto.

O formato Connexta (AS … I WANT TO … SO THAT) é um bom lugar para começar, mas tentar formatos diferentes pode ativar a criatividade da equipe.

Alguns pontos importantes de ser definidos são:

- Definir um nome a história é muito importante
- Adicionar imagens pode ajudar muito a discussão
- Se questionar sobre o que realmente a história está resolvendo (fica mais claro na dica 5)

# **Dica 3**: Descrever mudanças de comportamento

Muitas vezes enquanto estamos descrevendo histórias focamos em criação, porém mais do que apenas criar novas funcionalidades precisamos descrever histórias que produzem mudanças de comportamento ao sistema.

Então as vezes precisamos identificar o valor na mudança de certo comportamento.

Exemplo que Gojko apresenta é na melhoria da performance de um processo de importação de contatos, quando pensamos na mudança de comportamento a discussão é mais rica do que apenas no comportamento em si, já que a importação dos contatos não muda e sim como ela é feita por baixo dos panos.

# **Dica 4:** Descrever mudanças do sistema

Precisamos de definir o escopo de todas as mudanças no sistema para considerar uma história feita.

Quando estimamos uma história é indispensável que desenvolvedores e QAs levantem requisitos técnicos e de aceitação.

Uma forma é começar a história com :”Onde atualmente é assim…”, “Em vez de ….”

# Dica 5: Aproximar histórias de experimentos de sobrevivência

Podemos pensar que <mark style="background: #BBFABBA6;">histórias são hipóteses sobre valores de negócio que podem ser corretas ou erradas</mark>

Assim não devemos priorizar histórias em relação a seu tamanho ou complexidade e sim relacionada a seu valor. Essa análise deve ser feita de forma constante e incremental, assim podemos tirar mais das histórias do que apenas tarefas que precisem ser executadas.

# Dica 6: Cuidado com papéis genéricos

Devemos ter cuidado com papéis genéricos atribuídos em histórias, geralmente eles levam a um mal entendimento do valor real.

Atribuindo uma história a um usuário real que utiliza o sistema, temos mais assertividade sobre seu escopo e sua solução

# Dica 7: Avaliar zona de controle e zona de influência

O sistema pode ser definido em 3 área distintas

- Área de controle
- Área de influência
- Área externa

Em uma história podemos pensar nessas 3 áreas como o que o usuário precisa pode ser influenciado pelo sistema, e o que será entregue pelo time de desenvolvimento está em sua zona de controle.

Pensando nessas áreas, podemos avaliar melhor se o que estamos implementando é <mark style="background: #BBFABBA6;">uma forma de controle sobre o usuário ou influência. Caso seja uma forma de controle podemos ter um problema</mark>. Esses problemas podem se dar como Histórias falsas, Micro Histórias ou Histórias Traiçoeiras.

Gojko descreve um ótimo exemplo de uma história traiçoeira em relação a uma otimização de relatórios que um operador de Back Office requisitou que foi convertida em uma outra solução que resolveria de forma muito mais assertiva a necessidade do operador.

# Dica 8: Coloque um “Melhor antes de …” em suas histórias

Nessa dica Gojko discute a importância de separar histórias com prazos em relação a histórias convencionais.

História com prazos fixos devem ser bem definidas e entendidas pela equipe e executadas com de uma forma especial.