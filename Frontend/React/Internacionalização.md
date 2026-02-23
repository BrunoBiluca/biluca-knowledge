# Internacionalização

O processo de [[Frontend/Internacionalização/Internacionalização|Internacionalização]] é de suma importância para melhorar a experiência dos usuários.

Em [[React]] podemos fazer a implementação de internacionalização de uma forma bem simples.

Funcionalidades:

- Dicionário de palavras
- Interpolação de mensagens

### i18n

```ts
import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type Locale = "pt" | "en";

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (translations: Record<Locale, string>) => string;
}

const I18nContext = createContext<I18nContextType | null>(null);

const DEFAULT_LOCALE: Locale = "pt";
const STORAGE_KEY = "app_locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [localeState, setLocaleState] = useState<Locale>(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, DEFAULT_LOCALE);
      return DEFAULT_LOCALE;
    }
    return stored;
  });

  function setLocale(newLocale: Locale) {
    localStorage.setItem(STORAGE_KEY, newLocale);
    setLocaleState(newLocale);
  }

  // Função de tradução: recebe um objeto com as strings e retorna a do idioma atual
  function t(translations: Record<Locale, string>): string {
    return translations[localeState] ?? translations[DEFAULT_LOCALE];
  }

  const localeObject = useMemo(
    () => ({ locale: localeState, setLocale, t }),
    [localeState],
  );

  return (
    <I18nContext.Provider value={localeObject}>{children}</I18nContext.Provider>
  );
}

// Uso:
// translations.ts → greeting: { pt: "Olá, {name}!", en: "Hello, {name}!" }
// componente → interpolate(t(tx.greeting), { name: "João" })
export function interpolate(template: string, vars: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? key);
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
```

### Utilização

Para utilizar o sistema de internacionalização chamamos o hook `useI18n`() que retorna a função de tradução.

```ts
import { useI18n } from "@app/common/i18n/i18n-context";

// Arquivo com todas as traduções
import { tx } from "./component.translations";

// Definição do component
export function Component(){
	const { t } = useI18n();
	
	return <div>{t(tx.title)}</div>
}
```

```ts
// component.translations.ts
import type { Locale } from "@app/common/i18n/i18n-context";

export const tx = {
  validationDate: {
    pt: "Data inválida",
    en: "Invalid date",
  },
  validationGuests: {
    pt: "Adicione pelo menos um convidado",
    en: "Add at least one guest",
  },
  title: {
    pt: "Agendar visita à",
    en: "Schedule visit to",
  },
  visitDate: {
    pt: "Data da visita",
    en: "Visit date",
  },
  guests: {
    pt: "Convidados",
    en: "Guests",
  },
  guestsDescription: {
    pt: "Digite e pressione Enter para adicionar um convidado",
    en: "Press Enter to add a guest",
  },
  observations: {
    pt: "Observações",
    en: "Observations",
  },
  observationsPlaceholder: {
    pt: "Ex: alguma restrição alimentar, etc.",
    en: "Ex: any dietary restrictions, etc.",
  },
  confirm: {
    pt: "Confirmar agendamento",
    en: "Confirm booking",
  },
  back: {
    pt: "Voltar",
    en: "Back",
  },
} satisfies Record<string, Record<Locale, string>>;

```

Colocando todas as traduções em um arquivo específico do componente ajuda a configurar a localização de forma independente.