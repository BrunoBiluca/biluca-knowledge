# Exemplo - Uso do Database

Para o projeto [[Projeto - Agenda da Breja - React]] foi utilizado como armazenamento de dados o [[Supabase]].

Esse exemplo irá descrever o processo para criar um serviço que busca, insere e cancela agendamentos usando a funcionalidade de Bancos de dados do Supabase.

Junto a isso, também irá descrever uma modelo de implementação dessas funções que pode ser utilizado em futuros projetos.

## Criação da tabela

Como o [[Supabase]] já disponibiliza uma solução de Autenticação em conjunto com um banco de dados é muito simples de integrar as duas.

Assim para a tabela de *Agendamentos*  podemos definir com o seguinte comando:

```sql
CREATE TABLE public.brewery_schedules (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  brewery_id text NOT NULL,
  brewery_name text NOT NULL,
  visit_date date NOT NULL,
  party text,
  notes text,
  user_id uuid NOT NULL,
  CONSTRAINT brewery_schedules_pkey PRIMARY KEY (id),
  
  -- referência a tabela de autenticação de usuários
  CONSTRAINT brewery_schedules_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
```

## Políticas de segurança

O Supabase usa para o seu motor de banco de dados o Postgres e por padrão utiliza o [Row level security](https://supabase.com/docs/guides/database/postgres/row-level-security) para o controle das linhas em uma tabela.

Dessa forma, antes de conseguir consultar qualquer informação de uma tabela criada é necessário definir quais são as políticas de seguranças para linhas dessa tabela.

Para esse projeto foram definidas 3 políticas:

- Usuários podem ver apenas os seus agendamentos
- Usuários podem cancelar apenas os seus agendamentos
- Qualquer usuário pode criar agendamentos para si

```sql
alter policy "All users can schedule visits"
on "public"."brewery_schedules"
to authenticated
with check (true);
```

```sql
alter policy "User can see their own schedules"
on "public"."brewery_schedules"
to authenticated
using (
  (( SELECT auth.uid() AS uid) = user_id)
);
```

```sql
alter policy "Users can cancel their own schedules"
on "public"."brewery_schedules"
to authenticated
using (
  (( SELECT auth.uid() AS uid) = user_id)
);
```

> [!tip] Papeís em definições de políticas
> É possível definir os papéis para cada política de segurança, assim, podemos fazer que apenas usuários autenticados (`to authenticated`) possam completar essas operações.
> Isso ajuda muito a gerenciar o estado do usuário, já que unifica em volta de todo o ecossistema do [[Supabase]]

## Serviço de busca de dados

Para a implementação do serviços de dados .

- Classe `Database` é gerada pelo próprio [[Supabase]] com o esquema das tabelas

 - `client.ts`

```ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./supabase";

export const database = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY,
);
```

- `brewery-schedule-data.abstract.ts`

```ts
export abstract class BreweryScheduleData {
  onDataChanged: Observable = new Observable();

  abstract getAll(): Promise<BrewerySchedule[]>;
  abstract create(request: BreweryScheduleRequest): Promise<BrewerySchedule>;
  abstract cancel(schedule: BrewerySchedule): Promise<void>;
}
```

- `supabase-brewery-schedule-data.ts`

```ts
import type { BreweryScheduleRequest } from "@app/schedule/models/brewery-schedule-request.model";
import type { BrewerySchedule } from "@app/schedule/models/brewery-schedule.model";
import { BreweryScheduleData } from "@app/schedule/services/brewery-schedule-data";
import { database } from "./client";

export class SupabaseBreweryScheduleData extends BreweryScheduleData {
  async getAll(): Promise<BrewerySchedule[]> {
    const allSchedules = await database.from("brewery_schedules").select("*");

    if (allSchedules.error) {
      throw new Error(allSchedules.error.message);
    }

    return allSchedules.data?.map((item) =>
      this.mapSchedule(item),
    ) as BrewerySchedule[];
  }

  async create(request: BreweryScheduleRequest): Promise<BrewerySchedule> {
    const { data, error } = await database
      .from("brewery_schedules")
      .insert(request)
      .select();

    if (error) {
      throw new Error(error.message);
    }

    const allSchedules = await this.getAll();
    
    // Atualiza para clientes desse serviço o estado atual da lista de agendamentos
    this.onDataChanged.notify(allSchedules);
    return this.mapSchedule(data![0]);
  }

  async cancel(schedule: BrewerySchedule): Promise<void> {
    const { error } = await database
      .from("brewery_schedules")
      .delete()
      .eq("id", schedule.id);

    if (error) {
      throw new Error(error.message);
    }

    const allSchedules = await this.getAll();
    
    // Atualiza para clientes desse serviço o estado atual da lista de agendamentos
    this.onDataChanged.notify(allSchedules);
  }

  private mapSchedule(item: any): BrewerySchedule {
    return {
      id: item.id,
      breweryId: item.brewery_id,
      breweryName: item.brewery_name,
      visitDate: new Date(item.visit_date),
      party: item.party ? item.party.split(",") : [],
      notes: item.notes,
    };
  }
}

```