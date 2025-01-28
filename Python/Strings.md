# Combinação de duas strings por cada caracter

Para fazer a combinação de duas strings caracter a caracter podemos fazer:

```py
def combine_str(str1, str2):
    return [a + b for a in str1 for b in str2]


str1 = "AB"
str2 = "12"

print(combine_str(str1, str2))
# Saída: ['A1', 'A2', 'B1', 'B2']
```

# Formatação espacial de strings

A formatação espacial de strings pode ser utilizado em vários aspectos como prints e como writelines de arquivos em texto.

```python
self.nova_linha(f"{'Informação':<25}{'Minerado':>10}{'Sucesso':>10}")
for i in info_mineradas:
	self.nova_linha(f"{f'{i[0]}:':<25}{f'{i[1]}%':>10}{f'{i[2]}%':>10}")
```

Tipos de alinhamento
- `<`   :    alinhamento à esquerda
- `^`   :    alinhamento ao centro
- `>`   :    alinhamento à direita

O número após o tipo de alinhamento determina a quantidade de espaços serão utilizados para esse campo.