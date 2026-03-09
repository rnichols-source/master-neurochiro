-- VAULT INTELLIGENCE SYSTEM
create table if not exists public.vault_resources (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  category text not null, -- communication, rof, care_plan, objections, marketing, staff, clinic_os, patient_edu, leadership, masterclass
  tier text check (tier in ('standard', 'pro')) default 'pro',
  resource_type text check (resource_type in ('pdf', 'video', 'script', 'template')) default 'pdf',
  content text, -- For scripts or long-form text
  url text, -- For PDFs or Video links
  thumbnail_url text,
  is_featured boolean default false,
  download_count int default 0,
  created_at timestamptz default now()
);

-- User Bookmarks/Favorites
create table if not exists public.vault_bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  resource_id uuid references public.vault_resources(id) on delete cascade,
  created_at timestamptz default now(),
  unique(user_id, resource_id)
);

-- RLS
alter table public.vault_resources enable row level security;
alter table public.vault_bookmarks enable row level security;

create policy "Users can view unlocked resources" on public.vault_resources
  for select using (true); -- Content filtering handled in app logic for blurred previews

create policy "Users can manage their own bookmarks" on public.vault_bookmarks
  for all using (auth.uid() = user_id);
