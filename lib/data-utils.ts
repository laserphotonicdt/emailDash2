import { z } from "zod";

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
