---
tags:
  - infraestrutura
---
> [!info] Definição
> Docker é uma plataforma open-source para desenvolvimento, publicação e execução de aplicações. Com o docker é possível separar a aplicação da sua infraestrutura.
> 
> [Documentação inicial](https://docs.docker.com/get-started/overview/)

### Principais vantagens

- Permite um uso mais eficiente dos recursos do sistema
- Publicação responsiva e escalonável
	- Permite ciclos mais curtos de publicação
- Execução de múltiplos fluxos de trabalho na mesma máquina
- Permite portabilidade de aplicações
	- Containers são imutáveis o que garante que a aplicação está sendo executada em um ambiente controlado

### Problemas que Docker não resolve

- Não resolve problemas de segurança
- Docker não substitui um ambiente de desenvolvimento configurado
	- Muitas vezes pela praticidade parece ser possível substituir o ambiente de desenvolvimento para utilizar apenas Docker, porém a utilização de Docker não substitui ferramentas de desenvolvimento como autoformaters, intelisense e outros recursos que precisam estar instalados na máquina do desenvolvedor para o desenvolvimento.

### Principais conceitos

- Imagens
	- São templates de leitura apenas com as instruções para criar um container Docker.
- Containers
	- São instâncias em execução de uma imagem.
- Redes
- Volumes
	- Volumes são localizações no sistema de arquivos local que é automaticamente gerenciada pelo Docker

# Melhores práticas

- Mantenha suas imagens pequenas
- Armazene os dados gerados pela aplicação em volumes ou bind mounts
- Em produção armazene dados sensíveis utilizando [alguma técnica](https://docs.docker.com/engine/swarm/secrets/)

Diferenças entre ambientes de desenvolvimento e produção

| Desenvolvimento                                                                                 | Produção                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Use [bind mounts](https://docs.docker.com/storage/bind-mounts/) para ter acesso ao código fonte | Use volumes para armazenas dados do container.                                                                                                                   |
| Utilize Docker desktop                                                                          | Utilize Docker Engine, quando possível com [userns mappings](https://docs.docker.com/engine/security/userns-remap/) para maior isolamento dos processos do host. |

### Melhores práticas para a escrita de Dockerfiles

> [!info] Documentação
> 
> https://docs.docker.com/develop/develop-images/dockerfile_best-practices/



