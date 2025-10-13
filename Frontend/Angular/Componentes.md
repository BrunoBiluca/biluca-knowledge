# Componentes

Componentes são a principal estrutura de UI do Angular.

Cada componente consiste em:

- `@Component` decorator
- HTML template
- CSS selector
- Classe [[TypeScript]] com o componento definido

Também é possível separar o HTML, CSS da classe Typescript definida.

Importação de componentes é feita a partir do campo `imports`.

#### Demonstração de funcionalidades de componentes

- Definição de variáveis definidas na classe e utilizadas no template (`{{ nome }}`)
- Eventos, clique do botão chama o método definido em UserProfile
- Vinculação de propriedades do HTML com variáveis da classe,  `[contentEditable]="isEditable"`

```typescript
// user-profile.ts
@Component({
  selector: 'user-profile', // define a tag <user-profile /> utilizada em outros templates
  template: `
    <h1>{{ nome }} profile</h1>
    <p>This is the user profile page</p>
    <div [contentEditable]="isEditable">
      <button (click)="onChangeName()"
    </div>
  `,  
  styles: `h1 { font-size: 3em; } `,
  imports: [],
})
export class UserProfile { 
  nome = "Brunin maneiro demais";
  isEditable = true; // propriedade associada [contentEditable]
  onChangeName(){} 
}
```

[[Sinais]]