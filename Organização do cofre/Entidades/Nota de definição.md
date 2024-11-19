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