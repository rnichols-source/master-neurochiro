-- Community Wall: posts, replies, and file uploads
-- Keep it simple — one feed, everyone sees everything

CREATE TABLE public.community_posts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  file_url text,
  file_name text,
  file_type text,
  pinned boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.community_replies (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id uuid REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX idx_community_posts_created ON public.community_posts(created_at DESC);
CREATE INDEX idx_community_replies_post ON public.community_replies(post_id, created_at ASC);

-- RLS
ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_replies ENABLE ROW LEVEL SECURITY;

-- All authenticated members can view posts and replies
CREATE POLICY "Members can view posts" ON public.community_posts FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Members can create posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Authors and admins can delete posts" ON public.community_posts FOR DELETE USING (
  auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND tier = 'admin')
);
-- Admins can pin
CREATE POLICY "Admins can update posts" ON public.community_posts FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND tier = 'admin')
);

CREATE POLICY "Members can view replies" ON public.community_replies FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Members can create replies" ON public.community_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Authors and admins can delete replies" ON public.community_replies FOR DELETE USING (
  auth.uid() = user_id OR EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND tier = 'admin')
);

-- Storage bucket for community uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('community', 'community', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Members can upload to community" ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'community' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view community files" ON storage.objects FOR SELECT
USING (bucket_id = 'community');
