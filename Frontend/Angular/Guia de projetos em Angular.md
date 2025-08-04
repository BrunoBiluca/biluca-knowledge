# Guia de projetos em Angular

Esse guia tem como objetivo tratar sobre melhores práticas no desenvolvimento de aplicações com [[Angular]].

Ele é inspirado em:

- [[Princípios de código]]
- [[Código limpo]]

## Estrutura de pastas e arquivos

- Agrupar por funcionalidade em vez de por tipo
- Mover serviços/pipes/diretivas relevantes umas próximas das outras
- Armazenar tudo em uma entidade
- [Guia oficial do Angular](https://angular.dev/style-guide)

## Auxílios

- **Utilizar um Linter**

## Responsabilidade única

Cada componente deve fazer apenas uma única coisa. Com isso em mente:

### Extrair componentes apenas de visualização
 
 Extrair componentes apenas de visualização (presentational-only components) é uma forma de garantir que as regras de negócio não estão vinculadas as regras de apresentação

### Extrair métodos/classes estáticas

**Extrair métodos/classes estáticas** podem ser separados em seus próprios arquivos de forma que possam ser acessados pela aplicação inteira.

Essa separação também facilita criar testes

### Extrair serviços

**Extrair serviços** quando o código não tem nada relacionado ao template

### Extrair uma classe pai

**Extrair uma classe pai** quando componentes apresentam a mesma interface programática, porém seu comportamento é diferente. 

> [!warning] **Tomar cuidado** com esse tipo de implementação, pois pode aninhar várias classes que ficam acopladas entre si, o que dificulta na testabilidade.

### Extrair um Mixin Typescript

**Extrair um Mixin Typescript**

### Extrair uma diretiva estrutural

**Extrair uma diretiva estrutural** quando seu código está utilizando algum injetável e alterando algo no HTML (geralmente `*ngIF`)

```ts
// Before
@Component({  
  template: `<div *ngIf="hasPermission">Content</div>`,  
})  
export class MyComponent {  
  hasPermission = this.permissionService.hasPermission();  
  constructor(private permissionService: PermissionService) {}  
}

// After
@Component({  
  template: `<div *hasPermission>Content</div>`,  
})  
export class MyComponent {}
```

### Extrair uma diretiva de atributo

**Extrair uma diretiva** quando alguns métodos e propriedades que não estão relacionadas ao componente e apenas modificam o conteúdo no template

```ts
@Component({  
  template: `<input (keyDown)="onInputKeyDown()" />`,  
})  
export class MyComponent {  
  // duplicate detected  
  onInputKeyDown() {  
    this.convertPersianNumbersToEnglish();  
  }  
  convertPersianNumbersToEnglish() {}  
}

// After
@Component({  
  template: `<input [convertPersianNumbersToEnglish] />`,  
})  
export class MyComponent {}
```

### Extrair um InjectionToken

Extrair um InjectionToken quando variáveis, classes e funções variam entre os módulos.

```ts
// Before
@Component({
  template: `<chart
    [chartColors]="specialColors"
    [tooltipFormatter]="specialTooltips"
    [options]="specialChartOptions"
  ></chart>`,
})
export class MyComponent {
  specialColors = ChartUtils.specialColors;
  specialTooltips = ChartUtils.specialTooltips;
  specialChartOptions = ChartUtils.getSpecialChartOptions();
}

// After
@Component({
  template: `<chart></chart>`,
  providers: [
    { provide: CHART_OPTIONS, useValue: specialChartOptions as ChartOptions },
  ],
})
export class MyComponent {}

// Then use the CHART_OPTIONS in your chart component
@Component()
export class ChartComponent {
  constructor(@Inject(CHART_OPTIONS) chartOptions: ChartOptions) {}
}
```

### Extrair ng-content

Quando vários componentes tem templates similares, é possível extrair um componente que será utilizado para envelopar (wrapper) todos eles.

## Templates

### ngClass

A diretiva `ngClass` deve ser utilizada para definir classes de acordo com as propriedades dos componentes.

Essa é uma forma de reduzir a quantidade de métodos na classe do componente e mover a responsabilidade de visualização para o template.