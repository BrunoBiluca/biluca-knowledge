# Fim dos Merge commits

Merge commits são commit feitos automaticamente quando a máquina local tem um commit feito e precisa fazer um pull da branch remota que está a sua frente.

Esse commits criam deformações no repositório dificultando a sua leitura por conseguinte o rastreamento das mudanças.

Uma solução para isso é não utilizar mais o git pull para atualizar a branch local.

Passo a passo:

1. Sempre `git pull --rebase`
	- Se isso funciona tudo certo

2. Caso tenha conflitos, pode fazer `git rebase --abort`

3. Nesse casos, `git pull` ou faça um rebase interativo