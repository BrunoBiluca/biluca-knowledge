---
tags:
  - game_dev
---
> [!info] Descrição
> O jogador pode mover um jogador em terceira pessoa e coletar itens. Quando o jogador morre uma bolsa com os itens coletados é deixada no local.
> O jogador pode recuperar a bolsa, porém caso morra novamente, todos os itens voltam ao seu local de partida.

Esse exemplo visa utilizar os recursos mais básicos da Unreal Engine 5 e serve como consulta rápida a esses recursos.

# Raycast pela câmera

Para utilizar o Raycast para verificar se um objeto foi tocado por um raio a partir da câmera fazemos:

![[Exemplo - Raycast para buscar um item com Blueprint Structure específica.png|Raycast para buscar um item com Blueprint Structure específica|center|500]]

Os principais pontos que precisamos levantar desse exemplo são o cast feito após o cast para o tipo específico da estrutura.

A partir daí podemos utilizar esse objeto recuperado para qualquer ação.