-- Create waitlist_submissions table
CREATE TABLE public.waitlist_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  team_size TEXT,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for inserting (anyone can submit to waitlist)
CREATE POLICY "Anyone can submit to waitlist" 
ON public.waitlist_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create unique index on email to prevent duplicates
CREATE UNIQUE INDEX idx_waitlist_email ON public.waitlist_submissions(email);