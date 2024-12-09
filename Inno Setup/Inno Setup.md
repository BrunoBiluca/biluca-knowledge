---
categoria: biblioteca
---
# Inno Setup

--- start-multi-column: ExampleRegion1  
```column-settings  
number of columns: 2
Column Size: [59%, 40%]
Border: disabled
Shadow: off
```

**Inno Setup** é uma das ferramentas mais antigas e robustas para construção de instaladores de programas no Windows.

Ela vem com um gerenciador com interface gráfica que já permite criar scripts de empacotamento de forma simples e rápida.

--- end-column ---

> [!info] Principais referências
> - [Site oficial](https://jrsoftware.org/)
> - [Documentação](https://jrsoftware.org/ishelp.php)
>- [Github](https://github.com/jrsoftware/issrc)

--- end-multi-column
Para utilizar o Inno Setup é necessário criar um arquivo de definição dos scripts de compilação do pacote. Esse arquivo tem uma formatação própria que pode ser verificada na documentação.

![[exemplo de arquivo de configuração.iss]]
### Utilizando programaticamente

Cada ferramenta disponibilizada pelo Inno Setup também é possui acesso de forma programática pela linha de comando.

Para compilar um pacote podemos fazer:

```ps1
# iscc é o compilador do Inno Setup
iscc setup.iss
```