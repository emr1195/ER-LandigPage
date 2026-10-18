create table if not exists public.admin_preferences (
  user_id text primary key references public."user"(id) on delete cascade,
  appearance text not null check (appearance in ('carbon-azure','petrol-apricot')),
  updated_at timestamptz not null default now()
);

