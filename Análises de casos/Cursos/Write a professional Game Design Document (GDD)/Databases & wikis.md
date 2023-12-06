#game_design/documentação 

# Resumo

A principal vantagem de utilizar um sistema de Wiki é a possibilidade de linkar vários documentos, sendo mais fácil de manter atualizado.

A utilização do Notion em sobre outros softwares disponíveis no mercado (Confluence, Github, Gitlab) é que o Notion apresenta o conceito de Databases no próprio software. O Notion já disponibiliza todos os dados para o usuário configurar a exibição da forma que mais convém. Essa vantagem permite ao Notion ser muito mais flexível que os demais softwares.

> [!warning] Nota do Biluca
> Fazer a documentação do projeto pelas histórias e tarefas pode fazer com que o rastreamento das funcionalidades do sistema fique obsoleto ou confuso rapidamente, já que cada história ou tarefa representa um alteração no projeto. Assim saber que alteração está atualmente em vigor se torna uma problema para a gestão.
> 
> Uma alternativa é disponibilizar a documentação da forma mais simples e imediata possível, de forma que qualquer integrante do time possa atualizá-la sem dificuldades. O versionamento da documentação junto ao código pode ser essa alternativa.


## Especificação de funcionalidade

A criação da especificação de funcionalidade é um documento focado em apenas uma única funcionalidade dentro do jogo.

Nesse documento cada aspecto da funcionalidade é definido em detalhes. Esse documento será utilizado durante o processo de implementação.

## Hourglass method

Qualquer funcionalidade proposta em um jogo pode impactar vários outros sistemas e equipes. Por exemplo, adicionar um atributo de vida ao player pode necessitar a alteração de outros sistemas dentro do jogo (Programação), adicionar um elemento visual para representar a vida (UI e Art) e até em formatos de monetização. 

Uma forma de garantir que todas essas especificações sejam relatadas no documento é utilizar o método de Hourglass.

![[hourglass method.png|Diagrama que descreve em alto nível a utilização do método Hourglass]]


# Referências

- [Método Hourglass em detalhes](https://www.udemy.com/course/gdd-professional/learn/lecture/39089764#overview)