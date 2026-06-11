import sys

n = input()
k = int(input())
size = len(n)


def potencia(tamanho_numero, posição_dígito):
    return int(10 ** (tamanho_numero - posição_dígito - 1))


def repetições_do_dígito_atual(d, pd, i):
    if int(d) > k:
        return pd
    elif int(d) == k:
        next_digits = n[i+1:]
        return int(next_digits) + 1 if next_digits != "" else 1
    return 0


def repetições_em_relação_aos_dígitos_anteriores(i, pd):
    ra = 0
    prior_digits = n[0:i]
    size_prior_digits = len(prior_digits)
    for j, o in enumerate(prior_digits):
        v = int(o) * potencia(size_prior_digits, j)
        ra += v * pd
        print("prior digits:", o, "valor", v, file=sys.stderr, flush=True)

    return ra


count = 0
for i, d in enumerate(n):
    print("dígito:", d, file=sys.stderr, flush=True)
    
    pd = potencia(size, i)
    print("pd:", pd, file=sys.stderr, flush=True)
    
    rd = repetições_do_dígito_atual(d, pd, i)
    print("rd:", rd, file=sys.stderr, flush=True)

    ra = repetições_em_relação_aos_dígitos_anteriores(i, pd)
    print("ra:", ra, file=sys.stderr, flush=True)

    count += rd + ra


print(int(count))