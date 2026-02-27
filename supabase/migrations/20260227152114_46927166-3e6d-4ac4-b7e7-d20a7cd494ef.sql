
-- Create internal_marks table for performance risk tracking
CREATE TABLE public.internal_marks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES public.students(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  internal_1 NUMERIC DEFAULT 0,
  internal_2 NUMERIC DEFAULT 0,
  internal_3 NUMERIC DEFAULT 0,
  max_marks NUMERIC DEFAULT 20,
  semester INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.internal_marks ENABLE ROW LEVEL SECURITY;

-- Faculty can view all marks
CREATE POLICY "Faculty can view internal marks"
  ON public.internal_marks FOR SELECT
  USING (public.has_role(auth.uid(), 'faculty'));

-- Admins can manage marks
CREATE POLICY "Admins can manage internal marks"
  ON public.internal_marks FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Students can view own marks
CREATE POLICY "Students can view own marks"
  ON public.internal_marks FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.students s
      WHERE s.id = internal_marks.student_id AND s.user_id = auth.uid()
    )
  );

-- Create transport_routes table
CREATE TABLE public.transport_routes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  route_name TEXT NOT NULL,
  bus_number TEXT NOT NULL,
  stops JSONB NOT NULL DEFAULT '[]',
  departure_time TIME NOT NULL,
  estimated_arrival TIME NOT NULL,
  distance_km NUMERIC DEFAULT 0,
  fee_per_year NUMERIC DEFAULT 0,
  driver_name TEXT,
  driver_phone TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS - transport routes are public read
ALTER TABLE public.transport_routes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view transport routes"
  ON public.transport_routes FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage transport routes"
  ON public.transport_routes FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));
