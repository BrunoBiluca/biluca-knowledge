# 📕 Documentação de sistemas de software

A documentação é um componente de um projeto de software que provê informações sobre o software e seus comportamentos. 

A documentação não é uma coisa única e amorfa, é importante entender os diversos tipos de documentações e a audiência que as irá consumir para direcionar melhor os esforços e o tipo de informação necessária.

> [!info] Principais referências
>- 

---

> [!quote]- Outras referências
> - [Artigo - Software Documentation Best Practices [With Examples]](https://helpjuice.com/blog/software-documentation)
> 	- Apresenta vários aspectos de documentação de software com exemplos de melhores práticas
> - [Artigo - Technical documentation in software development types best practices and tools](https://www.altexsoft.com/blog/technical-documentation-in-software-development-types-best-practices-and-tools/)
> 	- Ótimo resumo dos principais aspectos sobre documentação em projetos de software

> [!important]- Toda comunicação deve ser claramente comunicada em vez de ser deixada no ar.
> A documentação é o local onde a comunicação deve ser mais clara e objetiva. Qualquer informação que seja implícita, ou seja, está na cabeça de alguém deve ser adicionada na documentação.

Alguns tipos comuns de documentação são:

- **Manuais de uso** que permite prover informações relevantes aos usuários para a utilização correta de algum produto
- **Documentação técnica** que permite aos desenvolvedores terem mais informações sobre o software
- **Documentação procedural** que descreve passo a passo processos de configuração ou publicação do produto

# Por que documentação é importante?

A documentação é uma entidade controversa dentro do desenvolvimento de software. 

Várias pessoas acham que ela é desnecessária e que o código deve ser documentado por si só.

Essas pessoas não estão erradas, o código deve ser responsável por explicar para o desenvolvedor de forma clara **o que está sendo feito e como está sendo feito**. Porém uma documentação bem feita, pode dar uma visibilidade maior ao que está sendo feito pelo código e possibilitar até pessoas que não são desenvolvedores a entender as regras que estão implementadas e como elas se comunicam.

# Onde a documentação do projeto deve ser escrita?

Um dos maiores contras da documentação de código é que várias vezes ela é escrita separada do código. Isso é uma desvantagem por ser necessário alterar a documentação sempre que alguma alteração no código seja adicionado. Nesse ponto **vários defeitos** podem ocorrer, como: esquecimento dos integrantes do time na atualização da documentação, documentação equivocada do código (documentação fala uma coisa e o código diz outra), até a falta de documentação. Além de todos esses problemas a documentação vira um esforço a mais no desenvolvimento que pode ser ignorado pelo time.

Levando em consideração o **princípio DRY** a documentação do projeto deve estar relacionada ao código de forma que qualquer alteração no código seja uma alteração na documentação, já que eles fazem parte do mesmo conceito.

A utilização do princípio DRY nesse caso resolve a maioria dos defeitos causados pela documentação separada.

Vantagens:

- Documentação gerada automaticamente
- Consistência entre documentação e código
- Visibilidade do código

# Tipos de documentações

Um aspecto importante da documentação é pensar que ela não é algo único e sem forma, uma boa documentação é dividida dependendo de vários aspectos como:

- o leitor alvo
- o tipo de informação a ser destacada
- o tipo de linguagem adotada
- onde essa informação deve estar disponibilizada

Pensando nisso **separar os tipos de documentações em nossos projetos nos ajuda a direcionar melhor os esforços** para o que queremos fazer. É muito normal começarmos uma documentação e ao longo do desenvolvimento acabarmos abandonando-a, já que ela vira um amontoado de ideias sem muito coesão. Assim, uma boa documentação deve ser pensada junto com o processo e não como um elemento separado, ela deve ser mantida, revisada e reescrita igual o código.

Os tipos de documentações mais comuns são

- [[Documentação do projeto]]
- [[Documentação de produto]]
- [[Documentação do sistema]]
- [[Documentação do usuário]]
- [[Documentação da gestão (ou de processo)]]

Utilizando esses tipos já conseguimos ter um domínio enorme do projeto, permitindo uma maior previsibilidade e fluidez no desenvolvimento.

![[Relação das documentações|Diagrama de relação entre os diversos tipos de documentações e documentos]]