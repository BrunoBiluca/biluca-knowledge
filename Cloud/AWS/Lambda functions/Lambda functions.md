---
tags:
  - cloud
  - aws
---
- Catalogar a criação de um lambda com layers

# Criação de lambda com Layers

Camadas são uma forma de adicionar dependências as Lambda functions.

- [Como criar camadas para python](https://aws.plainenglish.io/lambda-layer-how-to-create-them-python-version-bc1e027c5fea)

é necessário ter uma pasta chamada `python` contendo todas as dependências no seguinte padrão:

```
dependencies.zip 
└ python
    | ... outros pacotes
	│ PIL 
	└ Pillow-5.3.0.dist-info
```

Geramos o `requirements.txt` a partir de todas as dependências utilizadas no ambiente virtual e então instalamos na pasta python criada

```powershell
cd python
pip install -r ..\requirements.txt -t .
```


# Criação de Lambda com acesso a internet

**Se seus lambdas estiverem em uma VPC, eles precisarão passar por um gateway NAT para acessar serviços externos.**

Uma maneira de conseguir isso é:

1. Configure seu lambda para usar uma (ou várias) sub-redes específicas (o console do Lambda sugerirá que você associe pelo menos 2 sub-redes em diferentes zonas de disponibilidade ao seu lambda para garantir a disponibilidade)
2. Crie um gateway NAT em uma sub-rede _diferente_ 
3. Faça com que a tabela de rotas associada às sub-redes do seu lambda envie todo o tráfego de saída (0.0.0.0/0) para o gateway NAT que você criou (faça isso escolhendo o NAT no campo `destino` )
4. Fazer com que a tabela de rotas na sub-rede do NAT envie todo o tráfego de saída para um gateway da Internet

![[Exemplo de vpc com acesso externo a internet.png|Exemplo de VPC configurada para liberar o acesso externo a internet|center]]

- As sub-redes públicas são conectas a partir da tabela de rotas a um Internet Gateway.
- As sub-redes privadas são conectas a um NAT Público liberando o acesso a internet a partir das lambdas internas.