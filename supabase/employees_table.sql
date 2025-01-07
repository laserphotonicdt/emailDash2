-- Create employees table
CREATE TABLE employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX idx_employees_created_at ON employees(created_at);

-- Insert sample data
INSERT INTO employees (name, position) VALUES
('John Doe', 'Software Engineer'),
('Jane Smith', 'Product Manager'),
('Bob Johnson', 'UX Designer');

-- Grant permissions
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON employees
FOR SELECT USING (true);
