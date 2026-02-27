# Modo Standalone

O modo Standalone é uma versão da aplicação que funciona de forma totalmente independente.

Sua ideia é permitir que os desenvolvedores possam definir o comportamento da aplicação e demonstrar funcionalidades visualmente para os [[Stakeholders]] e Usuários.

Nesse modo a aplicação podem ser configurada para comportar de acordo com o que se deseja demonstrar.

Para conseguirmos definir um modo standalone é necessário utilizarmos práticas para desacoplar implementação de interfaces ([[Princípio Inversão de dependências]] e [[Exemplo - Serviços com múltiplas implementações]]), permitindo assim que a configuração defina qual modo está funcionando.

## Modo configurado em LocalStorage

Como o principal objetivo do modo Standalone é demonstrar as funcionalidades da aplicação é importante também flexibilizarmos sua configuração para permitir que todos os fluxos sejam demonstráveis.

Por exemplo, podemos querer demonstrar como o carregamento de uma lista funciona, apenas essa funcionalidade tem várias possibilidades, como listar imediatamente, demorar X segundos para carregar e até não carregar a lista (simulando uma falha do serviço externos ou até uma falha catastrófica).

Cada classe que contém uma implementação Standalone deve ser responsável por persistir e ativar as configurações relacionadas ao seu comportamento.

### Implementação a partir do LocalStorage

```ts
// standalone-mode.ts

export function isStandalone() {
  return import.meta.env.VITE_STANDALONE === "true";
}

// define um valor padrão para uma chave
export function defaultSetting(key: string, value: any) {
  if (getSetting(key)) return;
  storeSetting(key, value);
}

// armazena um valor toda vez
export function storeSetting(key: string, value: any) {
  key = formatStandaloneKey(key);
  localStorage.setItem(key, value);
}

// recupera um valor dada uma chave
export function getSetting<T>(key: string) {
  key = formatStandaloneKey(key);
  return localStorage.getItem(key) as T;
}

// recupera um valor numérico dada uma chave
export function getSettingNumber(key: string): number {
  key = formatStandaloneKey(key);

  let value = localStorage.getItem(key);

  if (value === "inf") {
    return 2147483647;
  }

  return parseInt(value as string);
}

// limpa todas as chaves do modo standalone
export function clear() {
  for (const key in localStorage) {
    if (key.startsWith(standalone_settings_prefix)) {
      localStorage.removeItem(key);
    }
  }
}

const standalone_settings_prefix = "standalone";

function formatStandaloneKey(key: string) {
  return `${standalone_settings_prefix}.${key}`;
}
```