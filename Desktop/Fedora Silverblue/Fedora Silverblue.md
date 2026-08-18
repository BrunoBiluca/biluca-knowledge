# Fedora Silverblue

## Programação

Pelo Fedora Silverblue ser um sistema atômico programação dentro da distro precisa ser feita a partir dos containers.

Fluxo de trabalho para projetos de programação:

- Criar o container (recomendado Fedora ou Ubuntu)
- Instalar o pacotes necessários para o desenvolvimento
- Instalar a IDE (atualmente utilizo [[VSCode]])
	- Por algum motivo a mesma instalação do VSCode é compartilhada entre os ambientes.

Essa configuração permite que a IDE tenha acesso diretamente ao ambiente utilizado na programação.

## Instalação de softwares

Fedora Silverblue é um sistema atômico, nesse sentido existem duas formas de instalar aplicações:

- rpm-ostree: cria uma nova camada a cada instalação para o sistema

- containerização: utiliza algum sistema de containerização (podman ou toolbox) para instalar as aplicações que ficam restritas ao ambiente containerizado. Mesmo containerizado as aplicações acessam nativamente o host e é possível utilizar aplicações com GUI

Tutoriais para a instalação de algumas aplicações:

- [Chromium e Chrome](https://docs.fedoraproject.org/en-US/quick-docs/installing-chromium-or-google-chrome-browsers/)
