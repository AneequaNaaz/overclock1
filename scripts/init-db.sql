-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create financial profile table
CREATE TABLE IF NOT EXISTS financial_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  monthly_income DECIMAL(12, 2) DEFAULT 0,
  total_savings DECIMAL(12, 2) DEFAULT 0,
  total_debt DECIMAL(12, 2) DEFAULT 0,
  total_assets DECIMAL(12, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id)
);

-- Create goals table
CREATE TABLE IF NOT EXISTS financial_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  target_amount DECIMAL(12, 2) NOT NULL,
  current_amount DECIMAL(12, 2) DEFAULT 0,
  type TEXT NOT NULL, -- 'short-term' or 'long-term'
  deadline DATE,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'abandoned'
  created_at TIMESTAMP DEFAULT now(),
  completed_at TIMESTAMP
);

-- Create expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category TEXT NOT NULL, -- 'mandatory' or 'optional'
  name TEXT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  frequency TEXT NOT NULL, -- 'monthly', 'weekly', 'one-time'
  due_date DATE,
  paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT now(),
  due_at TIMESTAMP
);

-- Create gamification table
CREATE TABLE IF NOT EXISTS user_gamification (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  level INT DEFAULT 1,
  total_xp INT DEFAULT 0,
  current_xp INT DEFAULT 0,
  streak_days INT DEFAULT 0,
  last_activity_date DATE,
  created_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id)
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon_url TEXT,
  criteria TEXT, -- JSON description of how to earn
  created_at TIMESTAMP DEFAULT now()
);

-- Create user badges earned table
CREATE TABLE IF NOT EXISTS user_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  badge_id UUID NOT NULL REFERENCES badges(id),
  earned_at TIMESTAMP DEFAULT now(),
  UNIQUE(user_id, badge_id)
);

-- Create challenges table
CREATE TABLE IF NOT EXISTS challenges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'daily', 'weekly', 'monthly'
  target_amount DECIMAL(10, 2),
  reward_xp INT,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'failed'
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'reminder', 'achievement', 'warning', 'motivational'
  title TEXT NOT NULL,
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  related_entity_id UUID,
  created_at TIMESTAMP DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_financial_profiles_user_id ON financial_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_goals_user_id ON financial_goals(user_id);
CREATE INDEX IF NOT EXISTS idx_expenses_user_id ON expenses(user_id);
CREATE INDEX IF NOT EXISTS idx_gamification_user_id ON user_gamification(user_id);
CREATE INDEX IF NOT EXISTS idx_challenges_user_id ON challenges(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_user_badges_user_id ON user_badges(user_id);

-- Insert sample badges
INSERT INTO badges (name, description, criteria) VALUES
  ('First Saver', 'Set your first financial goal', '{"type": "create_goal"}'),
  ('Income Tracker', 'Enter your monthly income', '{"type": "set_income"}'),
  ('Spender', 'Log your first expense', '{"type": "log_expense"}'),
  ('Budget Master', 'Complete a budget challenge', '{"type": "complete_challenge"}'),
  ('Streak Master', 'Maintain a 7-day savings streak', '{"type": "streak", "days": 7}'),
  ('Goal Achiever', 'Complete your first financial goal', '{"type": "complete_goal"}'),
  ('Savings Champion', 'Reach 10k in savings', '{"type": "savings_amount", "amount": 10000}')
ON CONFLICT DO NOTHING;
