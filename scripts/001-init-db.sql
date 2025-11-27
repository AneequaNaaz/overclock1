-- Create users table (extends Supabase auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  avatar_emoji text default '🎮',
  level integer default 1,
  xp integer default 0,
  total_saved decimal(15,2) default 0,
  savings_rate decimal(5,2) default 0,
  created_at timestamp with time zone default now()
);

-- Financial data table
create table if not exists public.financial_data (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  monthly_income decimal(15,2) not null,
  mandatory_expenses decimal(15,2) default 0,
  optional_expenses decimal(15,2) default 0,
  savings_goal decimal(15,2),
  month text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Goals table
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  target_amount decimal(15,2) not null,
  current_amount decimal(15,2) default 0,
  deadline date,
  category text,
  priority integer default 1,
  achieved boolean default false,
  created_at timestamp with time zone default now()
);

-- Expenses table
create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  category text not null,
  amount decimal(15,2) not null,
  is_mandatory boolean default false,
  date timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Badges table
create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  emoji text,
  requirement_type text,
  requirement_value integer
);

-- User badges (junction table)
create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  earned_at timestamp with time zone default now(),
  unique(user_id, badge_id)
);

-- Challenges table
create table if not exists public.challenges (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  xp_reward integer default 10,
  duration text,
  frequency text
);

-- User challenges (completion tracking)
create table if not exists public.user_challenges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  challenge_id uuid not null references public.challenges(id) on delete cascade,
  completed boolean default false,
  completed_at timestamp with time zone,
  current_progress integer default 0
);

-- Notifications table
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  type text,
  message text,
  read boolean default false,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.financial_data enable row level security;
alter table public.goals enable row level security;
alter table public.expenses enable row level security;
alter table public.user_badges enable row level security;
alter table public.user_challenges enable row level security;
alter table public.notifications enable row level security;

-- Profiles policies
create policy "Users can view their own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);

-- Financial data policies
create policy "Users can view their financial data" on public.financial_data for select using (auth.uid() = user_id);
create policy "Users can insert their financial data" on public.financial_data for insert with check (auth.uid() = user_id);
create policy "Users can update their financial data" on public.financial_data for update using (auth.uid() = user_id);

-- Goals policies
create policy "Users can view their goals" on public.goals for select using (auth.uid() = user_id);
create policy "Users can insert goals" on public.goals for insert with check (auth.uid() = user_id);
create policy "Users can update their goals" on public.goals for update using (auth.uid() = user_id);
create policy "Users can delete their goals" on public.goals for delete using (auth.uid() = user_id);

-- Expenses policies
create policy "Users can view their expenses" on public.expenses for select using (auth.uid() = user_id);
create policy "Users can insert expenses" on public.expenses for insert with check (auth.uid() = user_id);
create policy "Users can update their expenses" on public.expenses for update using (auth.uid() = user_id);
create policy "Users can delete their expenses" on public.expenses for delete using (auth.uid() = user_id);

-- User badges policies
create policy "Users can view their badges" on public.user_badges for select using (auth.uid() = user_id);
create policy "Users can view earned badges" on public.user_badges for insert with check (auth.uid() = user_id);

-- User challenges policies
create policy "Users can view their challenges" on public.user_challenges for select using (auth.uid() = user_id);
create policy "Users can insert challenges" on public.user_challenges for insert with check (auth.uid() = user_id);
create policy "Users can update challenges" on public.user_challenges for update using (auth.uid() = user_id);

-- Notifications policies
create policy "Users can view their notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can insert notifications" on public.notifications for insert with check (auth.uid() = user_id);
create policy "Users can update notifications" on public.notifications for update using (auth.uid() = user_id);

-- Trigger to auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, 'Player_' || substr(new.id::text, 1, 8))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Insert seed badges
insert into public.badges (name, description, emoji, requirement_type, requirement_value) values
  ('First Step', 'Complete your first expense entry', '👣', 'expenses', 1),
  ('Savings Champion', 'Achieve 50% savings rate', '🏆', 'savings_rate', 50),
  ('Goal Getter', 'Complete your first goal', '🎯', 'goals', 1),
  ('Streak Master', 'Maintain a 7-day tracking streak', '🔥', 'streak', 7),
  ('Budget Baron', 'Reach level 10', '👑', 'level', 10);

-- Insert seed challenges
insert into public.challenges (name, description, xp_reward, duration, frequency) values
  ('Daily Tracker', 'Log all your expenses today', 10, '1 day', 'daily'),
  ('Savings Sprint', 'Save 10% of your income this week', 50, '7 days', 'weekly'),
  ('Goal Rush', 'Contribute to a goal this month', 100, '30 days', 'monthly');
