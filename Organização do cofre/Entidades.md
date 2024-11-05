# Entidades

Entidades são os elementos mais estruturantes do conhecimento. 
Cada entidade faz sentido por si só e é composta por múltiplos componentes.

- Nota de definição
- Nota de análise
- Nota de exemplo/tutorial
- Pastas
- Páginas
- [[Mapa de Habilidades]]

### Nota de definição

Nota é a definição de um conceito. Um conceito deve estar definido em apenas uma nota.

Nesses conteúdos o foco é em definir de acordo com a minha interpretação a coisa. Posso adicionar opiniões, essas opiniões precisam ser destacadas.

Toda nota de definição deve definir suas fontes, seja no próprio texto ou num campo de fontes. As fontes podem ser links internos (livro com uma análise no cofre) ou externos (artigos online, vídeos, chatGPT ou livros sem análises). Para fontes externas é necessário adicionar uma breve descrição da fonte.

Em uma nota de definição são **componentes obrigatórios**:

- Título ser igual o nome do arquivo
- Definição do conceito

Exemplos

- Certificações
- Framework: Apache Spark
- fl_chart (Biblioteca) deve ter seu próprio arquivo de definição
- Linguagem: Python
- Gestão de projetos: SCRUM

#### Nomenclatura

O nome do arquivo de uma nota deve ser exatamente o conceito definido.

Por exemplo

- Bom exemplo: `Servidor local junto a aplicação em Flutter`
- Mal exemplo: `Flutter e Python`
- O primeiro nomes define exatamente o conceito que estamos trabalhando na nota, enquanto o segundo não explicita e é necessário abrir a nota para ver qual assunto estamos tratando em relação a Flutter e a Python.

Caso esse conceito tenha uma sigla que o identifique ela deve ser definida da seguinte maneira: `Game Design Document {GDD}`

#### Notas com mesmo nome

Podem existir múltiplas notas com o mesmo nome, porém elas devem estar em pastas distintas. Caso isso ocorra a pasta pertencente ao conceito deve definir o contexto do conceito apresentado.

Por exemplo:

- Podemos ter uma pasta SQLite com a definição do SQLite e também podemos ter uma pasta Flutter com a definição do uso de SQLite no desenvolvimento de Flutter.
- Nesse caso temos duas notas com os seguintes caminhos:
    - `SQLite/SQLite`
    - `Flutter/SQLite`


### Nota de Análise

Notas de análises são resumos, análises e minhas opiniões sobre outros conteúdos. Nesse tipo de nota não quero focar em definições e sim em minhas opiniões.

Em uma nota de análise são componentes obrigatórios:

- Sobre o que é?
- Referência ao conteúdo como links externos, link da página de vendas ou uma forma de buscar o link no Google Drive.
- Minha opinião, análise ou resumo sobre o conteúdo

Exemplos: análises de jogos, livros, cursos, artigos….    

- **Livro - Fifty Quick Ideas to improve your User Stories**
- **Livro - Implementing Domain-Driven Design**
- **Princípios de arquitetura de software por Dave Farley**
- **Palestra - Diagrams as code 2.0**

#### Nomenclatura

O tipo de conteúdo deve ser indicado no título. Nomenclatura: `nome_conteúdo {tipo}`.

Exemplos de títulos:

- **Fifty Quick Ideas to improve your User Stories (Livro)**
- **Diagrams as code 2.0 (Palestra)**
- **Princípios de arquitetura de software por Dave Farley (Vídeo)**

### Nota de exemplo/tutoriais

Notas de exemplos são separadas para utilizar os conceitos definidos em uma aplicação mais robusta. Geralmente em uma nota de exemplo é criado um cenário onde podem ser demonstrados vários conceitos e suas relações.


As notas de exemplo devem deixar bem claros seus objetivos e seus resultados. No início de cada exemplo deve ser apresentado o enunciado com as informações dos conceitos trabalhados.

Notas de exemplo não devem ser utilizadas para apenas armazenar código, elas são desenvolvidas a partir de uma história para demonstrar vários conceitos.

#### Nomenclatura

As notas de exemplo estão sempre juntas a um conceito em uma pasta e devem ser sinalizadas como
- `Exemplo - Nome`
- `Tutorial - Nome`

Exemplos:
- **Exemplo - Loja de livros**
    - Esse exemplo por meio de uma história de uma loja de livros, faz a relação de vários conceitos de engenharia de dados
- **Exemplo de aplicação de DDD em ASPNET**
    - Apresenta uma Arquitetura DDD em um projeto em [Asp.NET](http://Asp.NET)

### Pastas

Uma pasta é o relacionamento mais direto de um nota. Sempre que uma nota tiver outra nota diretamente relacionada ou arquivo anexo relacionado, deve-se criar uma pasta.

Dentro de uma pasta deve haver a nota mais central daquele conceito (mesmo nome da pasta) e todas as demais notas e arquivos.

Deve-se minimizar a hierarquia de pastas dentro do cofre. O **primeiro nível** será dedicado a nota central e as notas relacionadas. Caso uma nota relacionada seja expandida para mais de um arquivo ela deve ser promovida para estar em uma pasta no **segundo nível**. Caso seja necessário um **terceiro nível** é necessário repensar a estrutura da pasta, muito provavelmente já podemos separar essa pasta em definições de primeiro nível.

Imagens, documentos, códigos, vídeos e outros tipos de anexo devem ser adicionados juntos a nota que fazem parte. Eles não devem ser referenciados em mais de uma nota, caso necessário deve-se criar uma nota com o conteúdo do anexo com uma definição adequada e então referenciado.

> [!warning]- Definição é arbitrária
> A definição de onde uma nota deve estar é **arbitrária**, é possível que múltiplas configurações sejam válidas. Por isso a organização de pastas não deve ser prioridade, é mais importantes podemos consultar as páginas pela pesquisa ou por outras páginas.

Exemplo

A organização inicial:

- Apache Spark
    - Apache Spark (nota)
    - PySpark
        - Delta lake
    - Ganglia UI
    - Spark Strucutred Streaming

Poderia virar a seguinte, já que esses são assuntos expandidos e relacionados.

- Apache Spark
- PySpark
- Delta lake
- Ganglia UI
- Spark Strucutred Streaming

### Página

Uma página é uma nota, porém enquanto a nota está definindo um conceito a página pode apenas relacionar conceitos diferentes a fim de nesse relacionamento definir um conceito próprio.

Exemplos:

- Temos notas sobre as engines de desenvolvimento de games, podemos ter uma página para listar todas as engines, comparar as engines e outro tipo de informação agregada.
- Análise de Dados não estruturados: essa página define métodos, técnicas e algoritmos utilizados para esse tipo de análise, juntando esse conceitos temos um conceito novo que é a própria análise de dados não estruturados