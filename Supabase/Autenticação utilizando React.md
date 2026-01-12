# Autenticação utilizando React

A autenticação do [[Supabase]] é bem abrangente e pode ser facilmente integrado ao [[React]].

> [!info] [[Projeto - Agenda da Breja - React]]
> Esse projeto implementa uma versão bem completa da utilização do Supabase para gerenciar autenticação do usuário.

```ts
// Abstração do serviço de autenticação
export abstract class AuthService {
  abstract getLoggedUser(): string | null;
  abstract isEmailTaken(value: string): Promise<boolean>;
  abstract signup(email: string, password: string, name: string): Promise<void>;
  abstract login(email: string, password: string): Promise<void>;
  abstract logout(): Promise<void>;
}


```