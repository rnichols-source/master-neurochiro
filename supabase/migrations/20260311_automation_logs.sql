-- Migration: Add Automation Logging System
-- Path: supabase/migrations/20260311_automation_logs.sql

CREATE TYPE automation_status AS ENUM ('sent', 'failed', 'pending');
CREATE TYPE automation_type AS ENUM ('email', 'notification', 'sms', 'webhook');

CREATE TABLE IF NOT EXISTS automation_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    user_email TEXT,
    event_type TEXT NOT NULL, -- e.g., 'call_reminder', 'payment_failed', 'reengagement'
    automation_type automation_type DEFAULT 'email',
    status automation_status DEFAULT 'sent',
    metadata JSONB DEFAULT '{}', -- Store subject lines, links sent, or error messages
    error_message TEXT
);

-- Index for fast lookup in Admin Dashboard
CREATE INDEX idx_automation_logs_user_id ON automation_logs(user_id);
CREATE INDEX idx_automation_logs_created_at ON automation_logs(created_at);
CREATE INDEX idx_automation_logs_event_type ON automation_logs(event_type);

-- Enable RLS (Admin Only)
ALTER TABLE automation_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all logs" 
ON automation_logs FOR SELECT 
TO authenticated 
USING (
    EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() AND tier = 'admin'
    )
);
