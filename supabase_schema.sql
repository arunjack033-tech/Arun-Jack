-- Create the appointments table
create table public.appointments (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  user_id uuid references auth.users(id) not null,
  user_name text,
  user_email text,
  
  provider_id text, -- storing as text for now since we use "provider-1", etc.
  provider_name text,
  
  service_name text not null,
  date date not null,
  status text default 'PENDING'
);

-- Enable RLS
alter table public.appointments enable row level security;

-- Policies
create policy "Users can view their own appointments"
on public.appointments for select
using ( auth.uid() = user_id );

create policy "Users can insert their own appointments"
on public.appointments for insert
with check ( auth.uid() = user_id );

-- Optional: Allow users to update/cancel their own appointments
create policy "Users can update their own appointments"
on public.appointments for update
using ( auth.uid() = user_id );
