-- Add last_sign_in_at to profiles for re-engagement tracking
-- Synced from auth.users via handle_new_user trigger update

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS last_sign_in_at timestamptz;

-- Update existing profiles with last_sign_in_at from auth.users
UPDATE public.profiles p
SET last_sign_in_at = u.last_sign_in_at
FROM auth.users u
WHERE p.id = u.id
AND u.last_sign_in_at IS NOT NULL;
