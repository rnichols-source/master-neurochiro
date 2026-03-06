-- 1. COHORTS
create table public.cohorts (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  start_date date,
  end_date date,
  status text check (status in ('upcoming', 'active', 'completed')) default 'upcoming',
  created_at timestamptz default now()
);

-- Add cohort_id to profiles
alter table public.profiles add column cohort_id uuid references public.cohorts(id);

-- 2. LIVE CALLS
create table public.live_calls (
  id uuid default uuid_generate_v4() primary key,
  cohort_id uuid references public.cohorts(id),
  title text not null,
  description text,
  call_time timestamptz not null,
  zoom_url text,
  replay_url text,
  is_completed boolean default false,
  created_at timestamptz default now()
);

-- 3. ATTENDANCE
create table public.attendance (
  id uuid default uuid_generate_v4() primary key,
  call_id uuid references public.live_calls(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  status text check (status in ('present', 'absent', 'replay_watched')) default 'absent',
  created_at timestamptz default now(),
  unique(call_id, user_id)
);

-- 4. ANNOUNCEMENTS
create table public.announcements (
  id uuid default uuid_generate_v4() primary key,
  cohort_id uuid references public.cohorts(id), -- Null for all members
  title text not null,
  content text not null,
  created_by uuid references public.profiles(id),
  created_at timestamptz default now()
);

-- 5. MEMBER HEALTH CACHE (for performance)
create table public.member_health (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  health_score int default 100,
  last_activity timestamptz default now(),
  modules_completed int default 0,
  kpis_submitted int default 0,
  risk_level text check (health_level in ('low', 'medium', 'high')) default 'low',
  updated_at timestamptz default now()
);

-- -----------------------------------------------------------------------------
-- RLS
-- -----------------------------------------------------------------------------
alter table public.cohorts enable row level security;
alter table public.live_calls enable row level security;
alter table public.attendance enable row level security;
alter table public.announcements enable row level security;
alter table public.member_health enable row level security;

create policy "Admins can manage cohorts" on public.cohorts for all using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));
create policy "Admins can manage live_calls" on public.live_calls for all using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));
create policy "Admins can manage attendance" on public.attendance for all using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));
create policy "Admins can manage announcements" on public.announcements for all using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));
create policy "Admins can manage health" on public.member_health for all using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));

create policy "Members can view their cohort" on public.cohorts for select using (auth.role() = 'authenticated');
create policy "Members can view their calls" on public.live_calls for select using (auth.role() = 'authenticated');
create policy "Members can view their announcements" on public.announcements for select using (auth.role() = 'authenticated');
