---
tags:
  - game_dev
---
# Aspectos gerais
São características gerais da engine.

- Estabilidade: suporte da engine, jogos lançados, comunidade ativa (criação de conteúdo, resolução de dúvidas, contribuição no projeto)
	- Ser open-source
- Curva de aprendizado: aspecto relacionado ao aprendizado de outros desenvolvedores.
	- Leva em consideração: recursos do editor, capacidade de testes, linguagens utilizadas, material disponível de documentação, comunidade ativa
- Portabilidade: suporte de criação a várias plataformas
- Promessa: suporte no futuro e evolução da engine em relação ao desenvolvimento de games
	- Melhor se for open-source
- Precificação: sistema de precificação da utilização da Engine
	- Ótimo: são de graça e sem obrigações legais
	- Aceitáveis: apresentam alguma taxa para quando o jogo faz uma quantidade razoável de receita.
	- Fraco: apresentam taxas altas ou os limites de receita não são razoáveis.

| Engine            | Estabilidade | Precificação | Curva de aprendizado | Portabilidade | Promessa     |
| ----------------- | ------------ | ------------ | -------------------- | ------------- | ------------ |
| [[Unity]]         | 🟩           | 🟨           | 🟩                   | 🟩            | 🟨           |
| [[Godot]]         | 🟩           | 🟩           | 🟩                   | 🟦            | 🟩           |
| [[Cocos]]         | 🟦           | 🟩           | 🟦                   | 🟦            | 🟦           |
| [[Flax]]          | 🟦           | 🟦           | 🟦                   | 🟦            | 🟦           |
| [[Bevy]]          | 🟨           | 🟩           | 🟨                   | 🟨            | 🟩           |
| [[Heaps]]         | 🟦           | 🟩           | 🟨                   | 🟦            | 🟦           |
| [[O3DE]]          | 🟦           | 🟩           | 🟦                   | 🟦            | 🟩           |
| [[Unreal Engine]] | 🟩           | 🟦           | 🟦                   | 🟦            | 🟦 (foco 3D) | 
Legenda
- 🟩 Ótimo ou Curto (curva de aprendizado)
- 🟦 Aceitável ou Médio (curva de aprendizado)
- 🟨 Fraco ou Longo (curva de aprendizado)

## Qualidade dos jogos
A engine também tem um grande impacto no resultado da qualidade final do jogo, aspectos como performance, tamanho dos pacote final, facilidade de utilização, podem impactar na execução do jogo pelos jogadores.

- Performance 2D: quantidade de elementos na tela interagindo no geral
- Performance 3D: quantidade de elementos na tela interagindo no geral
- Tamanho do pacote exportado: tamanho do pacote exportado de uma demonstração.
	- Exportação de recursos apenas utilizados no jogo


| Engine            | Performance 2D | Performance 3D                | Tamanho do pacote exportado |
| ----------------- | -------------- | ----------------------------- | --------------------------- |
| [[Unity]]         | 🟩             | 🟦 (MonoBehaviour) e 🟩 (ECS) | 🟦                          |
| [[Godot]]         | 🟩             | 🟨                            | 🟦                          |
| [[Cocos]]         | 🟦             |                               |                             |
| [[Flax]]          | ❓             | ❓                            |                             |
| [[Bevy]]          |                | 🟩                            |                             |
| [[Heaps]]         | 🟩             | 🟦 (possibilidade de ótimo)   | ❓                          |
| [[O3DE]]          | ❓             | 🟩 (ECS)                      |                             |
| [[Unreal Engine]] | 🟩             | 🟦 (C++) e  🟨(Blueprint)     |                             |
Legenda
- 🟩 Ótimo, melhor qualidade possível
- 🟦 Aceitável, qualidade aceitável para a maioria dos dispositivos
- 🟨 Fraco, qualidade fraca para muitos dispositivos mais fracos
- 🟥 Horrível, qualidade sofrível na maioria dos dispositivos mais fracos

# Recursos do Editor
O editor é um elemento importante do desenvolvimento de games, por meio dele é possível configurar vários aspectos do jogo, como configuração de cenas, visualização.

- Recursos: ferramentas do editor para ajudar no desenvolvimento de cenas e objetos
- Extensões e Plugins: capacidade de criar outras telas dentro do editor a fim de auxiliar no processo de desenvolvimento, principalmente em papéis não técnicos como Game Designers e Artistas.

| Engine            | Recursos                  | Extensões e Plugins |
| ----------------- | ------------------------- | ------------------- |
| [[Unity]]         | 🟦 (lento)                | 🟦 (Editor & Store) |
| [[Godot]]         | 🟩                        | 🟦 (GDNative)       |
| [[Cocos]]         | 🟦                        | ❓                  | 
| [[Flax]]          | 🟦                        | ❓                  |
| [[Bevy]]          | 🟥                        | 🟥                  |
| [[Heaps]]         | 🟨 (Editor da comunidade) | 🟨 (Comunidade)     |
| [[O3DE]]          | 🟩                        | 🟩 (Gems)           |
| [[Unreal Engine]] | 🟩                        | ❓                  |
Legenda
- 🟩 Ótimo
- 🟦 Aceitável
- 🟨 Fraco
- 🟥 Sem suporte
# Recursos de Desenvolvimento

- Linguagem: tipos de linguagem utilizada
- CLI: command-line interface, capacidade de automatização e agilizar o processo de desenvolvimento
- Pacotes: quantidade de pacotes disponíveis para auxiliar no desenvolvimento
- Versionamento: leva em consideração os tipos de arquivos persistidos, quanto mais os arquivos mais chances de conflitos
- Visual scripting: capacidade de utilização de linguagem visual para desenvolvimento

| Engine            | Linguagem                | CLI        | Testes | Pacotes | Versionamento           | Visual scripting |
| ----------------- | ------------------------ | ---------- | ------ | ------- | ----------------------- | ---------------- |
| [[Unity]]         | C#                       | 🟦         | 🟦     | 🟦      | 🟨 (arquivos aninhados) | 🟦               |
| [[Godot]]         | GDScript & C#            | 🟩         | 🟦     | 🟨      | 🟨 (arquivos aninhados) | 🟦               |
| [[Cocos]]         | Javascript               | ❓         | ❓     | ❓      | ❓                      | ❓               |
| [[Flax]]          | C++ e C#                 | ❓         | ❓     | ❓      | ❓                      | ❓               |
| [[Bevy]]          | Rust                     | 🟦         | ❓     | ❓      | 🟦                      | 🟥               |
| [[Heaps]]         | Haxe                     | 🟦         |        | 🟨      | 🟦                      | 🟥               |
| [[O3DE]]          | Script Canvas and Lua    | 🟦 (cmake) | ❓     | ❓      | ❓                      | 🟦               |
| [[Unreal Engine]] | Blueprint (Visual) e C++ | ❓         | ❓     | 🟦      | 🟩 (arquivos atômicos)  | 🟩               |
Legenda
- 🟩 Ótimo
- 🟦 Aceitável
- 🟨 Fraco
- 🟥 Sem suporte
# Recursos Gráficos

- Renderer: tipos de renderer disponíveis, APIs gráficos disponíveis
	- Ótimo, vários tipos de renderers e APIs gráficas
	- Aceitável, renderers mais focados para uma modelo 2D ou 3D e algumas APIs gráficas
	- Fraco, poucos renderers e APIs gráficas
- UI system: sistema de interface de usuário disponível
- Recursos 2D: aspectos de desenvolvimento 2D, como sistema de UI, renderização, física, algoritmos auxiliares (grid, pathfinding, shaders, sprite editor, etc)
- Recursos 3D: aspectos de desenvolvimento 3D, como tipos de renderização, física, algoritmos auxiliares (navMesh, Mesh builder, Splines, Shaders, VFX, etc)
- Shaders: recursos para a criação de shaders 2D e 3D

| Engine            | Renderer | UI System | 2D  | 3D  | Shaders |
| ----------------- | -------- | --------- | --- | --- | ------- |
| [[Unity]]         | 🟦       | 🟦        | 🟦  | 🟩  | 🟩      |
| [[Godot]]         | 🟦       | 🟩        | 🟩  | 🟦  | 🟦      |
| [[Cocos]]         | 🟦       | ❓        | 🟦  | ❓  | ❓      |
| [[Flax]]          | 🟩       | ❓        | ❓  | 🟦  | ❓      |
| [[Bevy]]          | 🟨       | 🟥        | 🟦  | 🟦  | 🟨      |
| [[Heaps]]         | 🟦       | 🟥        | 🟦  | 🟩  | 🟩      |
| [[O3DE]]          | 🟩       | ❓        | ❓  | 🟩  | ❓      |
| [[Unreal Engine]] | 🟩       | ❓        | ❓  | 🟩  | ❓      | 
Legenda
- 🟩 Ótimo, apresentam vários recursos gráficos, de física e ferramentas para utilização
- 🟦 Aceitável, apresentam recursos gráficos aceitáveis e ferramentas
- 🟨 Fraco, apresentam poucos recursos ou ferramentas
- 🟥 Sem suporte nem a recursos gráficos, física e ferramentas 

# Recursos de gerenciamento de conteúdo

- Gerenciamento de dados
	- Configuração de dados a fim de agilizar o processo de balanceamento do jogo
- Internacionalização: capacidade de criar jogos em várias línguas
- Timeline (cutscenes)

| Engine            | Gerenciamento de dados | Internacionalização | Timeline (cutscenes) |
| ----------------- | ---------------------- | ------------------- | -------------------- |
| [[Unity]]         | 🟦 (Inspector e SO)    | 🟦 (Unity store)    | 🟦                   |
| [[Godot]]         | 🟦 (Inspector)         | 🟩                  |                      |
| [[Cocos]]         | ❓                     | ❓                  | ❓                   |
| [[Flax]]          | ❓                     | ❓                  | ❓                   |
| [[Bevy]]          | ❓                     | ❓                  | 🟥                   |
| [[Heaps]]         | ❓                     | ❓                  | 🟥                   |
| [[O3DE]]          | ❓                     | ❓                  | ❓                   |
| [[Unreal Engine]] | 🟦 (Inspector)         | ❓                  | 🟦                   |
Legenda
- 🟩 Ótimo, total suporte e fácil de implementar
- 🟦 Aceitável, suporte aceitável e de fácil implementação
- 🟨 Fraco, falta de suporte e difícil de implementar
- 🟥 Sem suporte


