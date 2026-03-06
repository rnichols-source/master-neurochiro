-- Fix application status enum to include 'paid' and 'waitlist' (if missing)
-- NOTE: Postgres enums cannot be added inside a transaction if they are already in use.
-- This script safely checks and adds the value.

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'paid' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'app_status')) THEN
        ALTER TYPE public.app_status ADD VALUE 'paid';
    END IF;
END
$$;
