
# Encoding e Decoding

Strings em python são manipuladas no formato de Unicode. O Unicode define mais de 1 milhão de tipos diferentes de caracteres no formato `\\uXXXX` onde `XXXX` é o código do caractere

Existem vários tipos de formatos como ASCII que tem origem em falantes de inglês e outros como Latin-2 com caracteres para falantes de línguas provenientes do Latim. Esses formatos podem armazenar cada caractere como um ou múltiplos bytes como é o caso do UTF-8.

Quando escrevemos essas strings em arquivos é necessário fazer o processo de encoding dessas strings em algum formato.

```mermaid
flowchart LR

subgraph "Arquivos de texto"
f1[GB2313]
f2[Latin-2]
f3[UTF-8]
end

subgraph Python
Unicode
end

subgraph "Arquivos de texto"
d1[GB2313]
d2[Latin-2]
d3[UTF-8]
end

f1 -- Decode --> Unicode -- Encode --> d1
f2 -- Decode --> Unicode -- Encode --> d2
f3 -- Decode --> Unicode -- Encode --> d3
```

