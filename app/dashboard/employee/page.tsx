import { searchParamsCache } from '@/lib/searchparams';
import { SearchParams } from 'nuqs/parsers';
import React from 'react';
import db from '../../../constants/database';
import { Employee } from '@/constants/data';
import EmployeeListingPage from './_components/employee-listing-page';

type pageProps = {
  searchParams: SearchParams;
};

export const metadata = {
  title: 'Dashboard : Employees'
};

// export default async function Page({ searchParams }: pageProps) {
//   // Allow nested RSCs to access the search params (in a type-safe way)
//   searchParamsCache.parse(searchParams);

//   return <EmployeeListingPage />;
// }

export default async function EmployeePage() {
  let employees: Employee[] = [];

  try {
    const [rows] = await db.query('SELECT * FROM employees');
    employees = rows;
  } catch (error) {
    console.error('Database query failed:', error);
    // Handle the error appropriately, e.g., return a fallback UI or message
    return <div>Error fetching employee data.</div>;
  }

  return <EmployeeListingPage employees={employees} />;
}