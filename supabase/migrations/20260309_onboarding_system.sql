-- 1. INVITATIONS table for secure activation
create table if not exists public.invitations (
  id uuid default uuid_generate_v4() primary key,
  email text unique not null,
  full_name text,
  token text unique not null,
  status text check (status in ('pending', 'accepted')) default 'pending',
  expires_at timestamptz not null,
  created_at timestamptz default now()
);

-- 2. Add first_login and practice details to profiles
alter table public.profiles 
  add column if not exists is_first_login boolean default true,
  add column if not exists practice_name text,
  add column if not exists practice_city text,
  add column if not exists practice_state text,
  add column if not exists years_in_practice int;

-- RLS
alter table public.invitations enable row level security;
create policy "Admins can manage invitations" on public.invitations for all 
  using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));
create policy "Public can view invitation by token" on public.invitations for select 
  using (true);
