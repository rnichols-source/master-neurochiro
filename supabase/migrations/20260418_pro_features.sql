CREATE TABLE public.coaching_notes (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_by uuid REFERENCES public.profiles(id),
  created_at timestamptz DEFAULT now()
);
ALTER TABLE public.coaching_notes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members read own notes" ON public.coaching_notes FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all notes" ON public.coaching_notes FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND tier = 'admin'));

CREATE TABLE public.direct_messages (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  sender_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  recipient_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
CREATE INDEX idx_dm_conversation ON public.direct_messages(sender_id, recipient_id, created_at);
ALTER TABLE public.direct_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own messages" ON public.direct_messages FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);
CREATE POLICY "Users send messages" ON public.direct_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Admins manage all" ON public.direct_messages FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND tier = 'admin'));

CREATE TABLE public.script_reviews (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  script_type text DEFAULT 'other',
  content text NOT NULL,
  feedback text,
  status text DEFAULT 'pending',
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz
);
ALTER TABLE public.script_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members manage own reviews" ON public.script_reviews FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admins manage all reviews" ON public.script_reviews FOR ALL USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND tier = 'admin'));
