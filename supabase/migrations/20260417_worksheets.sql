-- Worksheets table for storing member worksheet responses
CREATE TABLE IF NOT EXISTS public.worksheets (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  worksheet_type text NOT NULL,
  responses jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, worksheet_type)
);

ALTER TABLE public.worksheets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own worksheets"
  ON public.worksheets FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all worksheets"
  ON public.worksheets FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND tier = 'admin'));
