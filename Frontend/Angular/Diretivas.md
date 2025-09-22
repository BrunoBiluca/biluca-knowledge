# Diretivas

Diretivas são instruções no [[Angular]] que estendem o comportamento ou a aparência de elementos HTML, componentes ou outras diretivas. Elas permitem manipular o DOM, adicionar lógica personalizada ou modificar estilos dinamicamente. Existem três tipos de diretivas no Angular:

1. [[Frontend/Angular/Componentes|Componentes]]: Diretivas com template (um tipo especializado de diretiva).
    
2. **Diretivas Estruturais**: Alteram a estrutura do DOM (ex: `*ngIf`, `*ngFor`).
    
3. **Diretivas de Atributo**: Modificam o comportamento ou aparência de um elemento (ex: `ngStyle`, `ngClass`).

## Diretivas estruturais

Diretivas estruturas são aplicadas a qualquer elementos de template.

```html
<!-- Shorthand syntax: -->
<p class="data-view" *select="let data from source">The data is: {{data}}</p>

<!-- Long-form syntax: -->
<ng-template select let-data [selectFrom]="source">
  <p class="data-view">The data is: {{data}}</p>
</ng-template>
```

> [!tip] Só é possível aplicar uma única diretiva estrutural no modelo atalhado por elemento.
> Múltiplas diretivas precisam de múltiplos elementos `<ng-template>`.

### Diretivas estruturais prontas

#### [ngClass](https://angular.dev/api/common/NgClass)

Adiciona e remove classes CSS no HTML:

```html
<!-- adiciona as classes 'first second' -->
<some-element [class]="'first second'">...</some-element>
<!-- adiciona a classes 'expanded' quando isExpanded é verdade e remove quando é falso -->
<some-element [class.expanded]="isExpanded">...</some-element>
<!-- adiciona as classes 'first second' -->
<some-element [class]="['first', 'second']">...</some-element>
<!-- adiciona as classes 'first second' por serem verdadeiras -->
<some-element [class]="{'first': true, 'second': true, 'third': false}">...</some-element>
```

#### ng-container

`ng_container` é um elemento especial que segura diretivas estruturais sem adicionar nenhum elemento no DOM.

Pode ser utilizado para permitir usar diretivas estruturais sem quebrar a estilização como uso de container Flex, margens...

Pode ser utilizado em combinação com outras diretivas estruturais como `ngIf` ou `ggCompomentOutlet`.

```ts
// Uso com ngComponentOutlet 
// para renderizar um compomente no lugar do ng-container de forma dinâmica
@Component({
  template: `
    <h2>Your profile</h2>
    <ng-container [ngComponentOutlet]="profileComponent()" />
  `
})
export class UserProfile {
  isAdmin = input(false);
  profileComponent = computed(() => this.isAdmin() ? AdminProfile : BasicUserProfile);
}
```

### ng-template

`ng-template` é utilizado para definir um componente sem a necessidade de criar um novo módulo. Cada módulo adicionar complexidade a aplicação, assim, deixar tudo no mesmo componente pode ser uma forma de reduzir essa complexidade além de isolar melhor as visualizações relacionadas.

```html
@for (n of otherNotes; track n.id) {
    <ng-container
      *ngTemplateOutlet="note; context: { $implicit: n, $index: n.id }"
    ></ng-container>
}

<ng-template #note let-note let-index="index">
...
<ng-template>
```

Também pode ser utilizado para chavear vários tipos de templates.

```html
<ng-container
  *ngTemplateOutlet="isLoading() ? loading : note"
></ng-container>

<ng-template #loading>
...
</ng-template>

<ng-template #note>
...
<ng-template>
```

## Diretivas de Atributo

- [[Exemplo - Destaque de elementos]]
- [[Exemplo - Login e registro de usuários]]
	- Nesse exemplo é implementado uma diretiva para verificar os papéis do usuário autenticado