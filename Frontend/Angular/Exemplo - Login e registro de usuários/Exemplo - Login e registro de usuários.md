# Exemplo - Login e registro de usuários


> [!quote]- (Artigo) - [Angular user login and registration guide cookies and JWT](https://dev-academy.com/angular-user-login-and-registration-guide-cookies-and-jwt/)
> Artigo bem completo sobre sistema de autenticação em Angular, também trás questões pertinentes a arquitetura e boas práticas no desenvolvimento de aplicações web em [[Angular]]

![[large_auth_strategy.webp|Diagrama de classes da implementação de login no projeto]]

### Componente de Login

```ts
// Login.ts - Componente responsável pelo visual do Login
Component({  
  selector: 'app-login',  
  templateUrl: './login.component.html'  
})  
export class LoginComponent implements OnInit {  
  
  loginForm: FormGroup;  
  get f() { return this.loginForm.controls; }  

  
  constructor(private authService: AuthService,  
    private formBuilder: FormBuilder,  
    private router: Router) { }  
  
  ngOnInit() {  
    this.loginForm = this.formBuilder.group({  
      email: ['', Validators.email],  
      password: ['']  
    });  
  }    
  
  login() {  
    const loginRequest: LoginRequest = {  
      email: this.f.email.value,  
      password: this.f.password.value  
    };  
  
    this.authService.login(loginRequest)  
      .subscribe((user) => this.router.navigate([this.authService.INITIAL_PATH]));  
  }   
}
```

### Serviço de autenticação

```ts
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  public readonly LOGIN_PATH = '/login';
  public readonly CONFIRM_PATH = '/confirm';
  public readonly INITIAL_PATH = '/app/dashboard';

  constructor(
    private router: Router,
    private http: HttpClient,
    @Inject(AUTH_STRATEGY) private auth: AuthStrategy<any>
  ) { }

  signup(user: User): Observable<void> {
    return this.http.post<any>(`${config.authUrl}/signup`, user);
  }

  confirm(email: string, code: string): Observable<void> {
    return this.http.post<any>(`${config.authUrl}/confirm?`, {email, code});
  }

  login(loginRequest: LoginRequest): Observable<User> {
    return this.http.post<any>(`${config.authUrl}/login`, loginRequest)
      .pipe(tap(data => this.auth.doLoginUser(data)));
  }

  logout() {
    return this.http.get<any>(`${config.authUrl}/logout`)
      .pipe(tap(() => this.doLogoutUser()));
  }

  isLoggedIn$(): Observable<boolean> {
    return this.auth.getCurrentUser().pipe(
      map(user => !!user),
      catchError(() => of(false))
    );
  }

  getCurrentUser$(): Observable<User> {
    return this.auth.getCurrentUser();
  }

  private doLogoutUser() {
    this.auth.doLogoutUser();
  }
}
```

### Interface - Estratégia de autenticação

```ts
// auth-stragegy.ts - interface para as diferentes estratégias de autenticação (sessão ou JWT ou SSO) no projeto
export interface AuthStrategy<T> {  
  
  doLoginUser(data: T): void;  
  
  doLogoutUser(): void;  
  
  getCurrentUser(): Observable<User>;  
  
}  
  
export const AUTH_STRATEGY = new InjectionToken<AuthStrategy<any>>('AuthStrategy');  
  
export const authStrategyProvider = {  
  provide: AUTH_STRATEGY,  
  deps: [HttpClient],  
  useFactory: (http: HttpClient) => {  
    switch (config.auth) {  
        case 'session':  
          return new SessionAuthStrategy(http);  
        case 'token':  
          return new JwtAuthStrategy();  
      }  
  }  
};
```

### Implementação - Estratégia de JWT

[[JWT - JSON Web Token]]

```ts
// jwt-auth-strategy.ts - Implementação da estratégia de autenticação JWT
export class JwtAuthStrategy implements AuthStrategy<Token> {  
  
  private readonly JWT_TOKEN = 'JWT_TOKEN';  
  
  doLoginUser(token: Token): void {  
    localStorage.setItem(this.JWT_TOKEN, token.jwt);  
  }  
  
  doLogoutUser(): void {  
    localStorage.removeItem(this.JWT_TOKEN);  
  }  
  
  getCurrentUser(): Observable<User> {  
    const token = this.getToken();  
    if (token) {  
      const encodedPayload = token.split('.')[1];  
      const payload = window.atob(encodedPayload);  
      return of(JSON.parse(payload));  
    } else {  
      return of(undefined);  
    }  
  }  
  
  getToken() {  
    return localStorage.getItem(this.JWT_TOKEN);  
  }  
}
```

## Adaptando a UI

Se o seu sistema tem uma divisão de usuários pelos seus papéis é necessário que os componentes se adaptem de acordo com essas regras.

Uma forma de resolver essa questão em [[Angular]] é utilizar do conceitos de [[Diretivas]] e implementar uma diretiva que defina quais papéis esse cada componente está habilitado ou não. Essa é uma forma mais robusta em resposta a utilizar o `ngIf` espalhado pelo código inteiro.

```html
<div class="add">  
  <!-- Habilitado apenas para proprietário -->
  <button 
    color="primary" 
    (click)="openExpenseDialog()" 
    *forRoles="['owner']"
  >+</button>  
</div>
```

```ts
// for-roles-directive.ts
@Directive({  
  selector: '[forRoles]'  
})  
export class ForRolesDirective {  
  
  roles: string[];  
  
  @Input()  
  set forRoles(roles: string[]|string) {  
    if (roles != null) {  
      this.roles = Array.isArray(roles) ? roles : [roles];  
      this.roles = this.roles.map(r => r.toUpperCase());  
    } else {  
      this.roles = [];  
    }  
  
    this.authService.getUserRole$().subscribe(  
      role => {  
        if (role && !this.roles.includes(role.toUpperCase())) {  
          // apaga o componente da visualização 
          this.viewContainer.clear();
        } else {  
          // renderiza normalmente o elemento
          this.viewContainer.createEmbeddedView(this.templateRef);  
        }  
      }  
    );  
  }  
  
  constructor(  
    private viewContainer: ViewContainerRef,  
    private templateRef: TemplateRef<any>,  
    private authService: AuthService) { }    
}
```

## Guardando rotas

Além de adaptar a UI de acordo com os papéis do usuário, é importante também definir elementos que são totalmente restritos, principalmente quando usuário não está autenticados.

Para isso podemos utilizar o conceitos de Guardas ([[Roteamento]]) do [[Angular]]. Assim, sempre que uma rota for requisitada, antes de exibir qualquer coisa é verificar o estado da autenticação do usuário.

### Guarda da aplicação

```ts
// app.guard.ts
// Verifica se o usuário está logado, caso contrário o redireciona para a tela de login
@Injectable({  
  providedIn: 'root'  
})  
export class AppGuard implements CanActivate {  
  
  constructor(private authService: AuthService, private router: Router) { }  
  
  canActivate(): Observable<boolean> {  
    return this.authService.isLoggedIn$().pipe(  
      tap(isLoggedIn => {  
        if (!isLoggedIn) { this.router.navigate(['/login']); }  
      })  
    );  
  }  
}
```

### Guarda da autenticação

```ts
// auth.guard.ts
// Verifica se o usuário já está logado e o redirecionado para o caminho inicial da aplicação
@Injectable({  
  providedIn: 'root'  
})  
export class AuthGuard implements CanActivate {  
  
  constructor(private authService: AuthService, private router: Router) { }  
  
  canActivate(): Observable<boolean> {  
    return this.authService.isLoggedIn$().pipe(  
      tap(isLoggedIn => {  
        if (isLoggedIn) {  
          this.router.navigate([this.authService.INITIAL_PATH]);  
        }  
      }),  
      map(isLoggedIn => !isLoggedIn)  // quando usuário está logado não ativa (vice-versa)
    );  
  }  
}
```

### Rotas

```ts
const routes: Routes = [  
  { path: '', redirectTo: '/login', pathMatch: 'full' },  
  // para o caminhos relacionados a aplicação
  // guardamos para verificar se o usuário está logado
  {  
    path: 'app',  
    canActivate: [AppGuard],  
    component: LayoutComponent,  
    children: [  
      { path: 'dashboard', component: DashboardComponent },  
      { path: 'expenses', component: ExpensesComponent },  
      { path: 'settings', component: SettingsComponent) }  
    ]  
  },
  // para os caminhos relacionados a autenticação
  // guardamos para verificar se o usuário está logado e não os mostrar essas telas
  {  
    path: 'login', component: LoginComponent,  
    canActivate: [AuthGuard]  
  },  
  {  
    path: 'signup', component: SignupComponent,  
    canActivate: [AuthGuard]  
  },  
  {  
    path: 'confirm', component: ConfirmComponent,  
    canActivate: [AuthGuard]  
  }  
];  
  
@NgModule({  
  imports: [RouterModule.forChild(routes)],  
  exports: [RouterModule]  
})  
export class AuthRoutingModule { }
```

## Requisições externas

No caso de Cookies não tem necessidade de fazer nenhum tipo de passagem de informações entre o cliente e o backend, já no caso de JWT é necessário enviar no cabeçalho da requisição o token do usuário.

Isso pode ser feito uitlizando o conceito de `HttpIntercptor`, assim não é necessário manualmente adicionar esse cabeçalho a todas as requisições, isso é feito automaticamente pelo interceptor, além disso aumentamos a segurança que o nosso sistema envia o token correto em todas as situações.

```ts
@Injectable()  
export class AuthInterceptor implements HttpInterceptor {  
  
  constructor(
    private authService: AuthService, 
    // nesse caso podemos garantir que a estratégia injetada será do tipo JWT
    @Inject(AUTH_STRATEGY) private jwt: JwtAuthStrategy 
  ) { }  
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {  
    
    // altera a requisição apenas para a estratégia JWT
    if (config.auth === 'token' && this.jwt && this.jwt.getToken()) {  
      request = this.addToken(request, this.jwt.getToken());  
    }  
  
    return next.handle(request).pipe(catchError(error => {  
      if (error.status === 401) {  
        this.authService.doLogoutAndRedirectToLogin();  
      }  
      return throwError(error);  
    }));  
  
  }  
  
  private addToken(request: HttpRequest<any>, token: string) {  
    return request.clone({  
      setHeaders: { 'Authorization': `Bearer ${token}` }  
    });  
  }  
  
}
```

Fazemos então o registro do Interceptor na declaração do módulo de Autenticação.

```ts
// auth.module.ts
NgModule({  
  declarations: [ ... ],  
  exports: [ ... ],  
  imports: [ ... ],  
  providers: [  
    {  
      provide: HTTP_INTERCEPTORS,  
      useClass: AuthInterceptor,  
      multi: true  
    },  
    ...  
  ]  
})  
export class AuthModule { }
```

