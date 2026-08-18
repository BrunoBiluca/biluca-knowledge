# Carregamento sob demanda

Carregamento sob demanda também chamado de **Lazy Loading** define uma prática de organização de uma aplicação de [[Frontend]] onde os módulos e recursos dessa aplicação são requisitados a medida que o usuário necessita.

O mais comum no desenvolvimento de [[Frontend]] é fazer importações estáticas dos módulos da aplicação. Isso pode funcionar muito bem para projeto pequenos, porém a medida que esses projetos crescem o tempo necessário para baixar todos esses módulos pode levar a uma experiência de usuário ruim.

Os principais problemas de uma aplicação em relação ao carregamento são:

- **Tempo de download de cada módulo** - módulos grandes demoram para ser baixados
- **Volume de módulos** - módulos que importam outros módulos
- **Processamento** - atualmente técnicas de compactação são empregadas para reduzir a quantidade de dados trafegada pela rede, porém isso tem um custo de descompactação no cliente.

Esses problemas sob condições de conexão de rede lenta, podem causar um grave problema na experiência de usuário de uma aplicação web.

Uma possível solução para esse problema é carregar a aplicação sob demanda.