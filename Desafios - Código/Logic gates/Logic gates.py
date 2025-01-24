def proc(input1, input2, comparer):
    output = []
    for inp in zip(input1, input2):
        output.append(comparer(inp[0], inp[1]))
    return output
        

n = int(input())
m = int(input())

input_signals = {}
for i in range(n):
    input_name, input_signal = input().split()
    input_signals[input_name] = [True if c == "-" else False for c in input_signal]

output_signals = []
for i in range(m):
    output_name, _type, input_name_1, input_name_2 = input().split()
    output_signals.append({
        "name": output_name,
        "type": _type,
        "input_1": input_name_1,
        "input_2": input_name_2
    })

avaiable_operators = {
    "AND":  lambda i1, i2: i1 and i2,
    "OR": lambda i1, i2: i1 or i2,
    "XOR":  lambda i1, i2: i1 != i2,
    "NAND": lambda i1, i2: not (i1 and i2),
    "NOR": lambda i1, i2: not (i1 or i2),
    "NXOR": lambda i1, i2: not (i1 != i2)
}

for i in range(m):
    port = output_signals[i]
    input1 = input_signals[port["input_1"]]
    input2 = input_signals[port["input_2"]]
    output = proc(input1, input2, avaiable_operators[port["type"]])
    print(port["name"], "".join(["-" if o else "_" for o in output]))
