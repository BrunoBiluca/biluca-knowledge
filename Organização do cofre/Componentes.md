# Componentes

Componentes dão forma as entidades.
Cada componente tem o objetivo de dar forma a alguma aspecto do conhecimento sobre uma entidades.

#### Definições

- Calllout diferenciado, criado em duas colunas pelo plugin, [https://github.com/ckRobinson/multi-column-markdown](https://github.com/ckRobinson/multi-column-markdown)
- Breve descrição sobre o que está sendo definido referenciando a outros assuntos relacionados internamente.
- Conteúdo adicional
    - Documentação
    - Repositório
- Deve ter apenas um por Nota, já que a nota deve principalmente definir apenas uma única cosia.

Modelos utilizados:
- [[mDefinição]]

#### Avisos de cautela, preocupações, ressalvas

- Os callouts de avisos devem ser dobráveis começando fechados. Seu título deve apresentar um resumo do problema e a descrição desenvolve o problema e apresenta uma possível solução.

Modelos utilizados
- [[mAviso]]

#### Referências

- Externas
    - Toda referência externa deve estar materializada no texto, ou seja, não deve estar solta ou apenas colocada no texto.
    - As referências externas devem ser indicadas das seguintes formas:
        - Para links externos que o seu intuito é bem claro o link externo deve estar junto a uma descrição breve:
            - EX:
                - [Documentação do Flutter](%E2%80%A6)
                - Existem 2 formas de [clonar uma tabela Delta](%E2%80%A6)
        - Para referências complexas deve se apresentar um motivo para ter aquela referência. Esse motivo pode ser um review de um artigo, uma explicação sobre a referência, uma opinião. É utilizado um callout de citação dobrável que inicia fechado.
            - Ex:
                - Artigo - ???? em um callout de citação junto com a explicação ou opinião sobre o artigo, que irá justificar o artigo estar ali.
	- Modelos utilizados
		- 

- Internas
    - Utilizar referências por meio do plugin [https://github.com/mdelobelle/obsidian_supercharged_links](https://github.com/mdelobelle/obsidian_supercharged_links)
        - Nele é possível criar uma visualização do link mais interessante do que apenas a cor
    - Referência internas deve ser declaradas apenas no nível da nota. Exemplo correto [[nota]], exemplo errado [[nota#título_interno]].

##### Quando utilizar uma referência interna ou externa?

Referências externas de um conceito devem ser utilizadas apenas dentro da nota daquele conceito, as demais notas devem utilizar referências internas.

Exemplo: 

Dentro da nota relacionada a Delta Lake será possível encontrar referências externas para a documentação, repositório e outros tópicos relacionados. Na nota de Databricks que faz a referência ao Delta Lake serão utilizadas apenas referências internas para a nota do Delta Lake.

#### Diagramas, fluxogramas e outros tipos de representação gráfica

- Utilizar Excalidraw
    - Excalidraw renderiza o conteúdo do quadro na nota
    - É possível criar uma biblioteca de componentes
    - É possível criar um quadro transparente de fundo a fim de garantir a melhor visualização quando o diagrama for integrado em uma nota
- Não utilizar mermaid.js
- Componentes obrigatórios
    - Título
    - Legenda

#### Imagens

- Toda imagem deve ser adiciona junto a uma legenda
- As imagens devem estar centralizadas a fim de melhorar consistência de leitura
- Tamanho de imagem
    - Por padrão todas as imagens devem ter metade do espaço total da nota (Ex: max-width: 1000px então a imagem deve ter width: 500px). A altura da imagem acompanha a proporção da mesma
    - Podemos definir imagens que tem o tamanho cheio da tela, utilizado para diagramas
- Componentes obrigatórios
    - Legenda

#### Código, arquivos de configuração…

Esses tipos de arquivos devem ser tratados como anexos e sempre vinculados a uma nota. O **Conhecimento Biluca não é um repositório de código**, esse tipo de arquivo não deve ser tratado como garantia de implementação (copia e cola no projeto) já que a chance dele não funcionar em outro projeto é grande, já que ele é utilizado como referência de um exemplo, definição ou análise. 

Grandes blocos de código devem ser evitados no texto, caso faça sentido ter o arquivo completo como referência, este deve ser adicionado como anexo e apenas os trechos mais relevantes destacados nas notas.

Exemplo na nota **Exemplo - Envio de emails** 
Na versão anterior temos todos os códigos no corpo do texto, sendo que apenas algumas linhas deveriam ser destacadas durante a explicação. Como é o caso da linha de configuração do host do banco de dados que é configurada para usar “db” e essa configuração faz sentido por causa do docker compose que define o container com o nome “db”. Da forma que está lá fica difícil de entender essa relação, já que ela em si não foi apresentada no texto ou está ofuscada pela quantidade de código na tela.

Outros exemplos:
- podemos ter uma nota de exemplo que apresente o conceito de configuração do editor da Unity e temos a configuração total para consulta, esse arquivo deve ser referenciado no texto
- um arquivo docker com a configuração de um cluster spark deve ser referenciado no texto de definição ou no exemplo.