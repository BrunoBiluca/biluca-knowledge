
- [[Large Language Models]]
- **Modelos de difusão:** modelos que começam com um ruído aleatório e adicionam informação até obterem uma saída clara e coerente
- **Redes adversárias generativas (GANs):** duas redes neurais competem entre si uma sendo a geradora e a outra sendo a discriminadora, até a geradora produzir dados indistinguíveis dos dados reais.
	- geradora: gera novos dados a partir dos ruídos aleatórios e os transformam em dados que se assemelham à distribuição de dados de treinamento
	- discriminadora: seu objetivo é distinguir entre os dados reais (providos no treinamento) e os dados sintéticos da geradora
- **Codificadores automáticos variacionais (VAEs):** combina codificadores automáticos e inferência variacional (técnica de estatística bayesiana).
	- Codificadora: captura as características essenciais dos dados de treinamento
	- Decodificadora: reconstrói a representação criada pela codificadora para gerar os dados reais
