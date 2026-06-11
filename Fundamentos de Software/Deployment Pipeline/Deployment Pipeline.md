# Deployment Pipeline

> [!quote]- Para mais informações a respeito de esteiras de publicação e práticas de desenvolvimento de software de qualidade
> - [[Mordern Software Engineering]]
> - Livro Dave Farley - Software Developer's Guide - 2025
> - Livro Dave Farley - Continuous Delivery Pipeline

O deployment pipeline (esteira de publicação) é um mecanismo de falseamento, onde nos permite aprender mais, corrigir erros de falhas de testes rápidos.É uma plataforma que nos permite testar ideias rapidamente e muda-las na mesma velocidade. Esse mecanismos no provê informações sobre o ciclo da aplicação, estabilidade e vazão de novas funcionalidades, permitindo assim tomar decisões baseados em métricas claras. 

O que a esteira de publicação não é:

- Apenas um fluxo automático de construção, teste e publicação
- Uma coleção de ferramentas
- Prova que novo software está bom

A versão mais simples inclui:

- **Estágio de commit:** desenvolvedores realizam suas alterações junto ao repositório.
	- **Pré-push (hook):** execução de testes antes mesmo do commit ser mesclado no repositório.
	- Permite ao desenvolver pegar as falhas mais imediatas

- **Repositório de artefatos:** tudo certo após o estágio de commit um candidato a publicação é persistindo no repositório de artefatos

- **Estágio de testes de aceitação:** testes centrados no usuário aplicados a um ambiente de produção a fim de avaliar o código do ponto de vista do usuário final.

- **Habilitação para publicação em Produção:** assim que o candidato a publicação passa por todos os passos ele é então definido como a versão atual.

