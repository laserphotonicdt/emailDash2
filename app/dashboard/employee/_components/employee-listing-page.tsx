"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus } from "lucide-react";
import Link from "next/link";

interface Employee {
  id: string;
  name: string;
  position: string;
  created_at: string;
}

interface EmployeeListingPageProps {
  employees: Employee[];
}

export default function EmployeeListingPage({
  employees: initialEmployees,
}: EmployeeListingPageProps) {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const supabase = createClient();

  useEffect(() => {
    const fetchEmployees = async () => {
      const { data, error } = await supabase
        .from("employees")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching employees:", error);
      } else {
        setEmployees(data);
      }
    };
    fetchEmployees();
  }, []);

  if (!employees) return <div>Loading employees...</div>;

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Employees</h1>
        <Link
          href={"/dashboard/employee/new"}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
        >
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Link>
      </div>
      <div className="grid gap-4">
        {employees.map((employee) => (
          <div key={employee.id} className="p-4 border rounded-lg">
            <h2 className="font-semibold">{employee.name}</h2>
            <p className="text-sm text-gray-600">{employee.position}</p>
            <div className="mt-2 text-xs text-gray-500">
              Created: {new Date(employee.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
