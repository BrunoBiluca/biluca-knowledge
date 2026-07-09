# Publicação

A publicação de um app em flutter deve ser feito pelo comando:

```powershell
flutter build <plataforma>
```

Nesse processo o flutter busca todos os arquivos definido no `pubspec.yaml`.

> [!info]- Especificidades do windows
> - `*.dll(s)` específicas devem ser copiadas para a pasta de `./build\windows\x64\runner\Release`.

> [!tip] Logging
> Logging é uma funcionalidade crucial principalmente após a publicação já que perdemos a possibilidade de verificar o console para as mensagens da aplicação e é necessário exibir essas informações em um formato de texto.
> 
> Para isso podemos utilizar a implementação definida em [[Logging]]

