def mat_key(row, column): 
    return f"{row}_{column}"


def get(mat, row, column):
    return mat.get(mat_key(row, column), 0)

m, n, p = [int(i) for i in input().split()]
count_a, count_b = [int(i) for i in input().split()]

a = {}
distinctARows = set()
distinctAColumns = set()

for i in range(count_a):
    inputs = input().split()
    row = int(inputs[0])
    column = int(inputs[1])
    value = float(inputs[2])
    a[mat_key(row, column)] = value
    distinctARows.add(row)
    distinctAColumns.add(column)

b = {}
distinctBRows = set()
distinctBColumns = set()

for i in range(count_b):
    inputs = input().split()
    row = int(inputs[0])
    column = int(inputs[1])
    value = float(inputs[2])
    b[mat_key(row, column)] = value
    distinctBRows.add(row)
    distinctBColumns.add(column)


# calcula apenas as posiçõoes das matrizes A e B que tem valores, em vez de sempre iterar sobre todas as posições.
# isso salva muito tempo em matrizes esparsas
position_with_values = list(filter(lambda i: i in distinctAColumns or i in distinctBRows, range(n)))

for row in sorted(distinctARows):
    for column in sorted(distinctBColumns):
        vc = 0
        for i in position_with_values:
            vc += get(a, row, i) * get(b, i, column)

        if vc != 0:
            print(row, column, vc)
