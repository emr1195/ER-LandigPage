create table if not exists public.activity_events (
  id bigserial primary key,
  actor_id text not null,
  actor_email text not null,
  actor_name text not null,
  created_at timestamptz not null default now(),
  action text not null check (action in ('publication','upload')),
  section_key text,
  before_revision bigint,
  after_revision bigint,
  before_data jsonb,
  after_data jsonb
);
create index if not exists activity_events_newest_idx on public.activity_events (id desc);
create or replace function public.protect_activity_history() returns trigger language plpgsql as $$
begin raise exception 'El historial de actividad es de solo lectura.'; end;
$$;
create trigger activity_events_readonly before update or delete on public.activity_events for each row execute function public.protect_activity_history();

