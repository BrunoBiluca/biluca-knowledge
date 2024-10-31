#matemática 

# Dot Product


```python
def dot_product(vec1, vec2):
    if len(vec1) != len(vec2):
        raise ValueError

    c = 0
    # cosine formula 
    for i in range(len(vec)):
        c += list1[i] * list2[i]
    return c
```

# Vector magnitude

```python
def magnitude(vec):
    m = 0
    for i in range(len(vec)):
        m += vec[i] ** 2
    return m ** 0.5
```

# Gauss Sum

```c#
public int GaussSum(int min, int max){
    if(max % 2 == 0){
        return GaussSumEven(min, max);
    }

    return GaussSumEven(min, max - 1) + max;
}

public int GaussSumEven(int min, int evenMax){
    return (min + evenMax) * (evenMax / 2);
}
```