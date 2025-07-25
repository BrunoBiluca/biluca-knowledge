---
tags:
  - programação/padrões
---
# Separação de interfaces

> [!info] Onde utilizar?
> Em geral, você não precisa criar um pacote separado apenas para as interfaces, mas isso dependerá do contexto do seu projeto e dos requisitos de distribuição. 
> 
> A separação de interfaces por exemplo é muito utilizada em projetos web, onde a API de back-end disponibiliza a sua interface a priori enquanto o front-end desenvolve a aplicação, consumindo dados fictícios

O conceito principal de separar interfaces em um pacote separado é conhecido como "contratos" ou "interfaces compartilhadas". Isso é comum em cenários onde você tem várias implementações diferentes que desejam aderir ao mesmo conjunto de interfaces.

Se você estiver construindo um sistema modular onde diferentes partes (módulos) podem ser **atualizadas independentemente umas das outras, ter um pacote separado para interfaces pode ser uma abordagem útil**. Os módulos podem depender apenas do pacote de interfaces, garantindo que as alterações nas implementações concretas não afetem os consumidores, desde que as interfaces permaneçam inalteradas.

Vamos expandir o exemplo para incluir um projeto de interface:
### Projeto `Interfaces`:

- **Projeto**: `IMathOperations.csproj`
- **Arquivo DLL Gerado**: `IMathOperations.dll`

### Projeto `Lib`:

- **Projeto**: `MathLibrary.csproj` (Depende do projeto `Interfaces`)
- **Arquivo DLL Gerado**: `MathLibrary.dll`

### Projeto `App`:

- **Projeto**: `MyApp.csproj` (Depende do projeto `Interfaces` e da `MathLibrary.dll`)
- **Arquivo DLL Gerado**: `MyApp.dll`

```csharp
// Program.cs
using Microsoft.Extensions.DependencyInjection;
using System;

class Program
{
    static void Main()
    {
        var serviceProvider = new ServiceCollection()
            .AddTransient<IMathOperations, MathLibrary>() // Registrar a implementação concreta
            .AddTransient<MyApp>()
            .BuildServiceProvider();
        var myApp = serviceProvider.GetRequiredService<MyApp>();
        myApp.PerformOperation();
    }
}

// MyApp.cs
using System;

public class MyApp
{
    private IMathOperations mathOperations;

    // Modificado para receber IMathOperations no construtor
    public MyApp(IMathOperations mathOperations)
    {
        this.mathOperations = mathOperations;
    }

    public void PerformOperation()
    {
        int result = mathOperations.Add(5, 7);
        Console.WriteLine("Result: " + result);
    }
}

```

Ao criar um sistema modular, os consumidores podem depender apenas do pacote de interfaces (`IMathOperations.dll`). Se uma nova implementação de `IMathOperations` for introduzida (talvez em um novo projeto `AdvancedMathLibrary`), os consumidores só precisarão atualizar sua dependência do pacote de interfaces, mantendo a flexibilidade e isolamento entre as partes do sistema.