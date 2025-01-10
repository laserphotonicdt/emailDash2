import { z } from "zod";
import { ColumnDef, Row } from "@tanstack/react-table";

export const EmployeeSchema = z.object({
  id: z.number(),
  name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  department: z.string(),
  location: z.string(),
  position: z.string(),
  cell_phone: z.string().nullable(),
  extension: z.string().nullable(),
  photo_url: z.string().url().nullable(),
  pet_type: z.string().nullable(),
  pet_name: z.string().nullable(),
  manager_email: z.string().email().nullable(),
  linkedin_profile: z.string().url().nullable(),
  password: z.string(),
  dob: z.coerce.date(),
  is_admin: z.boolean(),
  created_at: z.coerce.date(),
});

export type Employee = z.infer<typeof EmployeeSchema>;

export function exportToCSV<T>(
  data: Row<T>[],
  columns: ColumnDef<T>[],
  filename: string,
) {
  const headers = columns
    .filter((col) => col.id !== "actions")
    .map((col) => col.header?.toString() || col.id);

  const rows = data.map((row) =>
    columns
      .filter((col) => col.id !== "actions")
      .map((col) => {
        const value = row.getValue(col.id!);
        return typeof value === "number" ? value.toString() : value;
      })
      .join(","),
  );

  const csvContent = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
}

export function parseEmployeeData(data: unknown) {
  try {
    // Handle single employee or array of employees
    if (Array.isArray(data)) {
      return z.array(EmployeeSchema).parse(data);
    }
    return EmployeeSchema.parse(data);
  } catch (error) {
    console.error("Employee data validation failed:", error);
    throw new Error("Invalid employee data structure");
  }
}
