# Math functions

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