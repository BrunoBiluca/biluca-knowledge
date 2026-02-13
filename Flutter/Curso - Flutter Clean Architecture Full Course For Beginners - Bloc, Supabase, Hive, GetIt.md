# Curso - Flutter Clean Architecture Full Course For Beginners - Bloc, Supabase, Hive, GetIt

Esse curso apresenta o desenvolvimento de uma aplicação completa a fim de apresentar tópicos de arquitetura limpa e boas práticas de desenvolvimento em flutter e auxiliares.

> [!info] Principais referências
> - [Vídeo](https://www.youtube.com/watch?v=ELFORM9fmss)
>- [Github](https://github.com/RivaanRanawat/blog-app-clean-architecture)
>
>Autor: Rivaan Ranawat

É um ótimo curso para apresentar Flutter e boas práticas de desenvolvimento. O autor faz um bom trabalho demonstrando os princípios SOLID em vários pontos do projeto, porém algumas estruturas criadas ferem os princípios (provavelmente o autor sabe disso, mas por causa de diminuir a complexidade e onerosidade do curso ele removeu).

Outro problema para mim é a falta de citar a utilização de testes automatizados. Testes automatizados são a base de arquiteturas limpas, o formato sugerido só faz sentido se quisermos testar automaticamente o código, se isso não for uma necessidade nem precisa desse formato de arquitetura.

#### Rotas e páginas

Uma prática que o autor propõe é adicionar a rota da página como uma função estática no início da classe que implementa a página. Achei isso uma boa ideia, já que assim podemos definir as páginas e rotas de maneira programática, e move a responsabilidade para a página, facilitando também a construção do roteador.

```dart
class PageA extends StatelessWidget {
static route() => MaterialRoute("/a");

...implementação
}
```

#### Configuração da injeção de dependências

A implementação da injeção de dependências também fere o princípio do aberto fechado, já que cada nova implementação deve ser registrada nessa classe.

Esse problema eu já resolve em algumas APIs que desenvolvi com a criação de módulos, onde os módulos são definidos em configurações e então registrados dinamicamente.

#### Implementação das classes BLoC

A implementação do autor de BLoC fere o princípio de Aberto/Fechado, já que a cada novo UseCase é necessário alterar a implementação da classe BLoC para adicionar a execução do caso de uso para os eventos desejados.

Esse foi um ponto que ainda não tenho solução para esse problema. Uma das coisas para minimizar o processo de alteração da classe BLoC é isolar o registro dos eventos em funções, fica bem mais limpo assim, mas não resolve o problema.

#### Interfaces e implementações entre as camadas Domínio e Infraestrutura

Durante a separação de interface e implementação entre as camadas de domínio e dados (infraestrutura) o autor sugere o seguinte formato:

Interface: BlogRepository - Implementação: BlogRepositoryImpl

Esse formato é muito utilizado, porém ele nos esconde informações, como por exemplo que tipo de implementação BlogRepositoryImpl representa. Esse nome também causa um problema de colocar essa implementação como um padrão ou a principal implementação, sendo que se estamos separando interfaces e implementações, deveríamos pensar que serão definidas várias implementações, senão qual o motivo da separação de qualquer forma?

Minha sugestão para isso é definir um formato mais semântico:

Interface: BlogRepository - Implementação: SupabaseBlogRepository

Dessa forma sabemos que a implementação definida é para a plataforma Supabase. Assim é fácil estender esse conceito para outros bancos de dados como SQLiteBlogRepository, MySQLBlogRepository e assim por diante.

#### Princípio de Liskov para Entidades e Modelos

Quando ele está implementando a camada de dados ele utiliza o princípio de substituição de Liskov para movimentar dados de usuário entre as camadas de dados e de domínio, onde o modelo de dados utilizado na camada de dados é uma extensão da entidade de domínio, onde o modelo é responsável por garantir essa compatibilidade e nas camadas de domínio e apresentação são utilizadas apenas entidades.

Diferente do que ele faz no curso, a relação entre modelos e entidades deveria ser

Entidade: User - Modelo: SupabaseUser

Dessa forma poderíamos ter implementações de modelos diferentes como por exemplo, SQLiteUser, MySQLUser e outros bancos de dados.

O que vai definir o tipo de modelo é a implementação da camada de infraestrutura.

O método do autor do vídeo, fere o princípio do Aberto/Fechado já que para cada implementação da infraestrutura temos que ter o mesmo formato armazenado ou será necessário fazer modificações.