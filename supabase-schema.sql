-- Enable Row Level Security on auth.users (if not already enabled)
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles table
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create function to handle user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to handle user updates
CREATE OR REPLACE FUNCTION public.handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.profiles
  SET 
    name = NEW.raw_user_meta_data->>'name',
    avatar_url = NEW.raw_user_meta_data->>'avatar_url',
    updated_at = NOW()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for user updates
CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_user_update();

-- Create reading_history table
CREATE TABLE public.reading_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  selected_cards JSONB NOT NULL,
  interpretation TEXT NOT NULL,
  reading_type TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create follow_up_readings table
CREATE TABLE public.follow_up_readings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  parent_reading_id UUID REFERENCES public.reading_history(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  selected_cards JSONB NOT NULL,
  interpretation TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on reading_history table
ALTER TABLE public.reading_history ENABLE ROW LEVEL SECURITY;

-- Enable RLS on follow_up_readings table
ALTER TABLE public.follow_up_readings ENABLE ROW LEVEL SECURITY;

-- Create policies for reading_history table
CREATE POLICY "Users can view own reading history" ON public.reading_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reading history" ON public.reading_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reading history" ON public.reading_history
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own reading history" ON public.reading_history
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for follow_up_readings table
CREATE POLICY "Users can view own follow up readings" ON public.follow_up_readings
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.reading_history 
      WHERE id = parent_reading_id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own follow up readings" ON public.follow_up_readings
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reading_history 
      WHERE id = parent_reading_id AND user_id = auth.uid()
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_reading_history_user_id ON public.reading_history(user_id);
CREATE INDEX idx_reading_history_created_at ON public.reading_history(created_at DESC);
CREATE INDEX idx_follow_up_readings_parent_id ON public.follow_up_readings(parent_reading_id);
CREATE INDEX idx_follow_up_readings_created_at ON public.follow_up_readings(created_at DESC);

-- Create subscriptions table for premium users
CREATE TABLE public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  subscription_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL,
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment_history table
CREATE TABLE public.payment_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  payment_intent_id TEXT UNIQUE NOT NULL,
  subscription_id TEXT,
  amount INTEGER NOT NULL,
  currency TEXT NOT NULL DEFAULT 'usd',
  status TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on subscriptions table
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Enable RLS on payment_history table
ALTER TABLE public.payment_history ENABLE ROW LEVEL SECURITY;

-- Create policies for subscriptions table
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON public.subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policies for payment_history table
CREATE POLICY "Users can view own payment history" ON public.payment_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payment history" ON public.payment_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_payment_history_user_id ON public.payment_history(user_id);
CREATE INDEX idx_payment_history_created_at ON public.payment_history(created_at DESC);