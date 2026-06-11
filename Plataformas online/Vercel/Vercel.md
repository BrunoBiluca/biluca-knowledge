# Vercel

[Página da plataforma](https://vercel.com/)

Plataforma muito simples para publicação e hospedagem de web apps.

Integra facilmente com o [[Github]] e com poucos botões o repositório já está publicado.

Serviços:

- Hospedagem
	- CI/CD automático
	- Variáveis de ambiente
- Armazenamento
- Firewall
- Mitigação de DDoS
- Otimização de imagens
- Suporte a Microfrontends
- Computação em núvem
	- Vercel functions
	- Vercel Sandox

## Precificação

### Análise em 2026

As principais diferenças entre o plano Hobby e o plano Pro são relacionadas ao gerenciamento de colaboradores dos projetos.

**Rede:** limites de tráfego de dados
- Edge Requests até 1M / mês
- Fast Data Transfer até 100 GB por mês

**Armazenamento:** limites de espaço de armazenamento com imagens, arquivos e outros
- Tamanho: 1 GB por mês

> [!warning] No modo Hobby apenas um desenvolvedor por publicar, depurar ou configurar projetos
> Acredito que essa seja a principal limitação em relação ao modo Pro.
## Considerações

### Imagens

Quando fazemos a publicação de alguma aplicação de um framework como [[React]] é importante garantirmos que o caminho das imagens venham da pasta `public`, dessa forma o carregamento irá funcionar tanto localmente quanto publicado.

Isso ocorre porque quando o [[Vercel]] faz a construção do projeto ele compila todos os elementos da aplicação, removendo a pasta `src`.