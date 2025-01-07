"use client";

import { useEffect, useState } from "react";
import { createClient } from "@utils/supabase/client";
import { DataTable } from "./data-table";
import { columns } from "./employee-tables/columns";

interface Employee {
  id: string;
  name: string;
  position: string;
  created_at: string;
}

export default function EmployeeListingPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error: supabaseError } = await supabase
          .from("employees")
          .select("*")
          .order("created_at", { ascending: false });

        if (supabaseError) {
          throw new Error(supabaseError.message);
        }

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format from Supabase");
        }

        const validatedData = data.map((item: any) => ({
          id: item.id || "",
          name: item.name || "",
          position: item.position || "",
          created_at: item.created_at || new Date().toISOString(),
        }));

        setEmployees(validatedData);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) {
    return <div className="p-4">Loading employees...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">Error loading employees: {error}</div>
    );
  }

  return (
    <div className="p-4">
      <DataTable columns={columns} data={employees} />
    </div>
  );
}
