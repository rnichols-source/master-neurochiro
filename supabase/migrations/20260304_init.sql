-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. PROFILES (Extends Auth)
-- -----------------------------------------------------------------------------
create type user_tier as enum ('standard', 'pro', 'admin');

create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text,
  tier user_tier default 'standard'::user_tier,
  stripe_customer_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: Profiles
alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and tier = 'admin'
    )
  );

-- -----------------------------------------------------------------------------
-- 2. CURRICULUM (Weeks & Modules)
-- -----------------------------------------------------------------------------
create table public.weeks (
  id serial primary key,
  title text not null,
  theme text,
  slug text unique not null,
  description text,
  week_number int not null unique,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table public.modules (
  id uuid default uuid_generate_v4() primary key,
  week_id int references public.weeks(id) on delete cascade,
  title text not null,
  slug text not null,
  video_url text, -- Mux or Vimeo ID
  content text, -- Markdown or HTML
  order_index int not null,
  is_published boolean default true,
  created_at timestamptz default now(),
  unique(week_id, slug)
);

-- RLS: Curriculum
alter table public.weeks enable row level security;
alter table public.modules enable row level security;

create policy "Members can view published weeks"
  on public.weeks for select
  using (is_published = true and auth.role() = 'authenticated');

create policy "Members can view published modules"
  on public.modules for select
  using (is_published = true and auth.role() = 'authenticated');

create policy "Admins can manage weeks"
  on public.weeks for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin')
  );

create policy "Admins can manage modules"
  on public.modules for all
  using (
    exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin')
  );

-- -----------------------------------------------------------------------------
-- 3. RESOURCES
-- -----------------------------------------------------------------------------
create table public.resources (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  url text not null,
  type text check (type in ('pdf', 'video', 'link', 'audio')),
  week_id int references public.weeks(id), -- Optional: associated with a week
  module_id uuid references public.modules(id), -- Optional: associated with a module
  is_pro_only boolean default false,
  created_at timestamptz default now()
);

-- RLS: Resources
alter table public.resources enable row level security;

create policy "Members can view resources"
  on public.resources for select
  using (
    auth.role() = 'authenticated' and
    (
      is_pro_only = false or
      exists (select 1 from public.profiles where id = auth.uid() and (tier = 'pro' or tier = 'admin'))
    )
  );

create policy "Admins can manage resources"
  on public.resources for all
  using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));

-- -----------------------------------------------------------------------------
-- 4. KPI TRACKER
-- -----------------------------------------------------------------------------
create table public.kpi_entries (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  week_start_date date not null,
  collections numeric default 0,
  new_patients int default 0,
  patient_visits int default 0,
  care_plans_accepted int default 0,
  marketing_spend numeric default 0,
  wins text,
  bottlenecks text,
  created_at timestamptz default now(),
  unique(user_id, week_start_date)
);

-- RLS: KPI
alter table public.kpi_entries enable row level security;

create policy "Users can manage their own KPIs"
  on public.kpi_entries for all
  using (auth.uid() = user_id);

create policy "Admins can view all KPIs"
  on public.kpi_entries for select
  using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));

-- -----------------------------------------------------------------------------
-- 5. PROGRESS & REFLECTIONS
-- -----------------------------------------------------------------------------
create table public.progress (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  module_id uuid references public.modules(id) on delete cascade,
  completed_at timestamptz default now(),
  reflection text,
  unique(user_id, module_id)
);

-- RLS: Progress
alter table public.progress enable row level security;

create policy "Users can manage their own progress"
  on public.progress for all
  using (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 6. APPLICATIONS (Funnel)
-- -----------------------------------------------------------------------------
create type app_status as enum ('pending', 'approved', 'rejected', 'waitlist');

create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  email text not null,
  full_name text not null,
  phone text,
  responses jsonb not null default '{}'::jsonb,
  status app_status default 'pending'::app_status,
  score int default 0,
  admin_notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- RLS: Applications
alter table public.applications enable row level security;

create policy "Public can submit applications"
  on public.applications for insert
  with check (true);

create policy "Admins can manage applications"
  on public.applications for all
  using (exists (select 1 from public.profiles where id = auth.uid() and tier = 'admin'));

-- -----------------------------------------------------------------------------
-- 7. TRIGGER: Handle New User -> Profile
-- -----------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 8. SEED DATA (Curriculum Structure)
-- -----------------------------------------------------------------------------
insert into public.weeks (week_number, title, theme, slug, description) values
(1, 'Identity of a Nervous System Doctor', 'Who you are determines how you practice.', 'week-1-identity', 'Doctor identity reconstruction, Certainty vs insecurity.'),
(2, 'Chiropractic Neurology for REAL Practice', 'Not theory. Application.', 'week-2-neuro-real', 'Functional nervous system explanation, HRV, tone, adaptability.'),
(3, 'Communication Mastery', 'Recommend with certainty. No chasing yes.', 'week-3-communication', 'ROF mastery, Tone calibration, Removing persuasion energy.'),
(4, 'Philosophy (Modern + Powerful)', 'Make it make sense in today’s world.', 'week-4-philosophy', 'Subluxation without sounding outdated, Science + philosophy integration.'),
(5, 'Business: What School NEVER Taught You', 'Money, structure, sustainability.', 'week-5-business', 'Revenue structure, Case value clarity, Systems vs chaos.'),
(6, 'Care Plans, Day 1 / Day 2 Mastery', 'Clarity removes pressure.', 'week-6-care-plans', 'Day 1 consultation structure, Day 2 report of findings.'),
(7, 'Emotional Intelligence + Psychosomatic Patterns', 'Because patients are human, not just spines.', 'week-7-eq', 'Reading patient emotional states, Trauma + stress overlays.'),
(8, 'Career Strategy + Becoming a NeuroChiro Doctor', 'Build something bigger than a job.', 'week-8-strategy', 'Long-term positioning, Practice model clarity, Brand authority.');
