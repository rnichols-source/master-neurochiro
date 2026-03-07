create table if not exists public.push_subscriptions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  subscription jsonb not null,
  created_at timestamptz default now(),
  unique(user_id, subscription)
);

-- RLS
alter table public.push_subscriptions enable row level security;

create policy "Users can manage their own subscriptions"
  on public.push_subscriptions for all
  using (auth.uid() = user_id);

create policy "Admins can view all subscriptions"
  on public.push_subscriptions for select
  using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));
