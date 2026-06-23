-- ============================================================
-- Inner Circle Infrastructure
-- ============================================================

-- Inner Circle membership tracking
create table if not exists inner_circle_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null unique,
  membership_type text not null default 'founding' check (membership_type in ('founding', 'standard')),
  stripe_subscription_id text,
  stripe_customer_id text,
  mastermind_cohort text,
  joined_at timestamptz default now(),
  status text not null default 'active' check (status in ('active', 'paused', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Pre-call KPI submissions (simple 3-number form before each bi-weekly call)
create table if not exists pre_call_kpis (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  call_id uuid references live_calls(id),
  care_plan_acceptance_pct numeric,
  new_patients integer,
  collections_per_visit numeric,
  notes text,
  submitted_at timestamptz default now()
);

-- AI coaching recaps (generated after each call)
create table if not exists coaching_recaps (
  id uuid primary key default gen_random_uuid(),
  call_id uuid references live_calls(id),
  user_id uuid references auth.users(id) not null,
  raw_notes text,
  ai_recap text,
  action_items jsonb,
  created_at timestamptz default now()
);

-- ── RLS ──
alter table inner_circle_members enable row level security;
alter table pre_call_kpis enable row level security;
alter table coaching_recaps enable row level security;

-- inner_circle_members: users read own, admin reads all
create policy "Users read own IC membership"
  on inner_circle_members for select
  using (auth.uid() = user_id);

create policy "Admin full access IC members"
  on inner_circle_members for all
  using (
    exists (select 1 from profiles where id = auth.uid() and tier = 'admin')
  );

-- pre_call_kpis: users read/insert own, admin reads all
create policy "Users read own pre-call KPIs"
  on pre_call_kpis for select
  using (auth.uid() = user_id);

create policy "Users insert own pre-call KPIs"
  on pre_call_kpis for insert
  with check (auth.uid() = user_id);

create policy "Admin full access pre-call KPIs"
  on pre_call_kpis for all
  using (
    exists (select 1 from profiles where id = auth.uid() and tier = 'admin')
  );

-- coaching_recaps: users read own, admin full access
create policy "Users read own coaching recaps"
  on coaching_recaps for select
  using (auth.uid() = user_id);

create policy "Admin full access coaching recaps"
  on coaching_recaps for all
  using (
    exists (select 1 from profiles where id = auth.uid() and tier = 'admin')
  );

-- ── Seed Inner Circle cohort ──
insert into cohorts (name, start_date, status)
values ('Inner Circle', now(), 'active')
on conflict do nothing;
