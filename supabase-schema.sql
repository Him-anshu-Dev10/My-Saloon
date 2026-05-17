-- bookings table schema
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  mobile TEXT NOT NULL,
  country_code TEXT NOT NULL,
  hairstyle TEXT NOT NULL,
  stylist TEXT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  notes TEXT,
  total_price NUMERIC NOT NULL,
  booking_status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Optional: Add policies or indexes if required
-- Create an index on booking_date and booking_time to quickly check available slots
CREATE INDEX IF NOT EXISTS idx_bookings_date_time ON public.bookings (booking_date, booking_time);
