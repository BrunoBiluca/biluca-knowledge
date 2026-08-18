# Toolbx

> [!info] Informações
> - [Documentação do Toolbox](https://docs.fedoraproject.org/pt_BR/fedora-silverblue/toolbox/)

#### Criar atalho para o VSCode

[[VSCode]]

Criar em `~/.local/share/applications` o arquivo `vscode-toolbox.desktop`.

```desktop
[Desktop Entry]
Name=VS Code (Toolbox)
Comment=Develop with VS Code inside Fedora Toolbox
Exec=toolbox run -c <your-toolbox-name> code %F
Icon=code
Terminal=false
Type=Application
Categories=Development;IDE;
```