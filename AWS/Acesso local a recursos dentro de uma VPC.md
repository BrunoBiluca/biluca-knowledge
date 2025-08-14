---
tags:
  - aws
  - cloud
---
# Acesso local a recursos dentro de uma VPC

Para acessar vários recursos da AWS localmente que estão contidos em uma VPC é necessário criar um túnel entre uma máquina EC2 e o serviço de interesse.

```powershell
ssh -L <local-port>:<service-arn>:<service-port> ec2-user@<ec2-arn> -i <ec2-key>
```