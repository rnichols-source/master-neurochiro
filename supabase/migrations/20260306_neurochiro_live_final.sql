-- 1. EVENTS
create table if not exists public.events (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  description text,
  location text,
  start_date timestamptz not null,
  end_date timestamptz not null,
  is_published boolean default false,
  max_capacity int,
  created_at timestamptz default now()
);

-- 2. TICKET TYPES
do $$ 
begin
  if not exists (select 1 from pg_type where typname = 'ticket_category') then
    create type ticket_category as enum ('student', 'new_grad', 'practitioner');
  end if;
  if not exists (select 1 from pg_type where typname = 'ticket_tier') then
    create type ticket_tier as enum ('standard', 'inner_circle');
  end if;
end $$;

create table if not exists public.ticket_types (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.events(id) on delete cascade,
  category ticket_category not null,
  tier ticket_tier not null,
  price numeric not null,
  currency text default 'AUD',
  stripe_price_id text,
  stock_limit int,
  sold_count int default 0,
  description text,
  created_at timestamptz default now(),
  unique(event_id, category, tier)
);

-- 3. ATTENDEES
create table if not exists public.event_attendees (
  id uuid default uuid_generate_v4() primary key,
  event_id uuid references public.events(id),
  ticket_type_id uuid references public.ticket_types(id),
  full_name text not null,
  email text not null,
  phone text,
  stripe_session_id text,
  stripe_customer_id text,
  payment_status text default 'pending',
  created_at timestamptz default now()
);

-- 4. RLS & SEEDING
alter table public.events enable row level security;
alter table public.ticket_types enable row level security;
alter table public.event_attendees enable row level security;

-- Drop existing policies if they exist before recreating
do $$
begin
  drop policy if exists "Public can view published events" on public.events;
  drop policy if exists "Admins can manage events" on public.events;
  drop policy if exists "Public can view ticket types" on public.ticket_types;
  drop policy if exists "Admins can manage ticket types" on public.ticket_types;
  drop policy if exists "Admins can manage attendees" on public.event_attendees;
end $$;

create policy "Public can view published events" on public.events for select using (is_published = true);
create policy "Admins can manage events" on public.events for all using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));
create policy "Public can view ticket types" on public.ticket_types for select using (true);
create policy "Admins can manage ticket types" on public.ticket_types for all using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));
create policy "Admins can manage attendees" on public.event_attendees for all using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));

-- Initial Data
insert into public.events (title, slug, description, location, start_date, end_date, is_published, max_capacity)
values (
  'NeuroChiro Live Adelaide', 
  'adelaide-2026', 
  'A 2-Day Immersion into Nervous System Chiropractic', 
  'Adelaide, Australia', 
  '2026-05-29 09:00:00+00', 
  '2026-05-30 17:00:00+00', 
  true, 
  50
) on conflict (slug) do nothing;

with event_id as (select id from public.events where slug = 'adelaide-2026' limit 1)
insert into public.ticket_types (event_id, category, tier, price, description)
select id, 'student', 'standard', 395, 'Standard entry for current students.' from event_id
union all
select id, 'student', 'inner_circle', 595, 'Priority seating + Small group Q&A.' from event_id
union all
select id, 'new_grad', 'standard', 595, 'Standard entry for grads (≤ 2 years).' from event_id
union all
select id, 'new_grad', 'inner_circle', 895, 'Priority seating + Small group Q&A.' from event_id
union all
select id, 'practitioner', 'standard', 895, 'Standard entry for practicing doctors.' from event_id
union all
select id, 'practitioner', 'inner_circle', 1295, 'Priority seating + Small group Q&A.' from event_id
on conflict do nothing;
